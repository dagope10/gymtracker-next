"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export default function LandingPage() {
  const router = useRouter();
  
  // Si el usuario ya está autenticado, redirigir a /home
  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push('/home');
    }
  }, [router]);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Rastrea tu progreso en el gimnasio
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              GymTracker te ayuda a planificar tus rutinas de entrenamiento, registrar tu progreso
              y alcanzar tus objetivos fitness.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Comenzar ahora
              </Link>
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Iniciar sesión <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Más efectivo</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Todo lo que necesitas para tu entrenamiento
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              GymTracker facilita la organización y seguimiento de tus rutinas de ejercicio.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {[
                {
                  name: 'Crea rutinas personalizadas',
                  description: 'Diseña tu propio plan de entrenamiento según tus objetivos y disponibilidad.',
                },
                {
                  name: 'Organiza tus ejercicios',
                  description: 'Agrupa tus ejercicios por día y grupo muscular para maximizar resultados.',
                },
                {
                  name: 'Registra tu progreso',
                  description: 'Lleva un registro de tu desempeño en cada sesión para visualizar tu mejora.',
                },
                {
                  name: 'Accede desde cualquier lugar',
                  description: 'Tu plan de entrenamiento siempre contigo, en cualquier dispositivo.',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}