import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// Схема валидации (остаётся без изменений)
const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 🔥 БЕРЁМ API КЛЮЧ ИЗ ПЕРЕМЕННЫХ ОКРУЖЕНИЯ
    const apiKey = import.meta.env.VITE_NOTISEND_API_KEY;

    try {
      // ➡️ ОТПРАВЛЯЕМ ЗАПРОС В NOTISEND
      const response = await fetch('/send-message.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        message: data.message,
              }),
                });

      if (response.ok) {
        setSubmitStatus('success');
        reset(); // очищаем форму
      } else {
        // Пытаемся получить детали ошибки от NotiSend
        const errorData = await response.json();
        console.error('Ошибка NotiSend:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (разметка формы остаётся без изменений)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      {/* Поля формы — те же, что были */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Имя *</label>
        <input
          {...register('name')}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Ваше имя"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Телефон</label>
        <input
          {...register('phone')}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="+7 (999) 123-45-67"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Сообщение *</label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Ваше сообщение..."
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>

      {submitStatus === 'success' && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          ✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          ❌ Ошибка при отправке. Попробуйте позже или свяжитесь с нами по телефону.
        </div>
      )}
    </form>
  );
}