import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';
    const API_URL = process.env.API_URL || 'http://localhost:8080';
    
    return [
      {
        source: '/api/:path*',
        destination: isProduction ? `${API_URL}/api/:path*` : 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;