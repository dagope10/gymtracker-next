// src/lib/api.ts
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    // Solo verificar el localStorage, sin hacer peticiones
    if (!auth.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);
  
  return <>{children}</>;
}