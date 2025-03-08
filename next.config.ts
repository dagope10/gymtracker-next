// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Obtener la URL API desde variables de entorno
    const apiUrl = process.env.API_URL || 'http://localhost:8080';
    console.log('Using API URL:', apiUrl); // Para debug en los logs de construcción

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;