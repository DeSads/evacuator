import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1>Мой эвакуатор</h1>
      </header>
      <main>
        <Outlet />  {/* здесь будет отображаться ServicesPage или другие страницы */}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2026
      </footer>
    </div>
  );
}

export default App;