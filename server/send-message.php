<?php
// send-message.php

// 👇 ВСЕГДА отправляем CORS-заголовки, даже при ошибках
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Если это preflight-запрос (OPTIONS), завершаем сразу
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Теперь обрабатываем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не разрешён']);
    exit;
}

function loadEnv($path) {
    $env = [];
    if (!file_exists($path)) return $env;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (strpos($line, '=') === false || strpos($line, '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value, " \t\n\r\0\x0B\"'"); // Удаляем пробелы и кавычки
        $env[$name] = $value;
    }
    return $env;
}

$env = loadEnv(__DIR__ . '/../VITE_keys.env');

// Получаем данные
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Проверка наличия обязательных полей
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Заполните все обязательные поля']);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'] ?? 'Не указан';
$message = $data['message'];

$apiKey = $env['NOTISEND_API_KEY'] ?? '';
$from   = $env['FROM_EMAIL'] ?? '';
$to     = $env['TO_EMAIL'] ?? '';

$postData = [
    'from_email'    => $from ,
    "from_name" => $name,
    'to'      => $to,
    'subject' => "Новое сообщение от $name",
    'text'    => "Имя: $name\nEmail: $email\nТелефон: $phone\n\nСообщение:\n$message"
];

// Логируем данные перед отправкой
error_log("Sending to NotiSend: " . json_encode($postData));

// Отправка в NotiSend
$ch = curl_init('https://api.notisend.ru/v1/email/messages');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Ответ клиенту (CORS-заголовки уже отправлены)
if ($httpCode === 200) {
    echo json_encode(['success' => true, 'data' => json_decode($response)]);
} else {
    http_response_code($httpCode);
    echo json_encode(['error' => 'Ошибка отправки через NotiSend', 'details' => $response]);
}

