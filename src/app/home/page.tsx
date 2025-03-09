"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import { auth } from '@/lib/auth';

export default function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = auth.getUsername();
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="max-w-6xl mx-auto mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Hola, {username}</h1>
          <p className="text-gray-500 mt-1">Panel de control</p>
        </header>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna de navegación */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Acciones rápidas</h2>
            <div className="space-y-2">
              <Link href="/rutinas/nueva" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200 transition-colors">
                Nueva rutina
              </Link>
              <Link href="/rutinas/rutina-completa" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200 transition-colors">
                Nueva rutina completa
              </Link>
              <Link href="/rutinas" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200 transition-colors">
                Ver rutinas
              </Link>
            </div>
          </div>
          
          {/* Espacio para el siguiente día */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Próximo entrenamiento</h2>
            <div className="bg-gray-50 border border-gray-100 rounded-md p-4 h-48 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Aquí se mostrará la información de tu próximo día de entrenamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}