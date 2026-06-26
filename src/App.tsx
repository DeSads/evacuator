//import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Мой эвакуатор</Link>
          <nav>
            <Link to="/" className="mr-4 hover:underline">Главная</Link>
            <Link to="/services" className="hover:underline">Услуги</Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2026
      </footer>
    </div>
  );
}

export default App;