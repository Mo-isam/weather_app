import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // تجاهل أخطاء ESLint أثناء البناء (الحل المؤقت)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // تجاهل أخطاء TypeScript أثناء البناء (غير موصى به للانتاج)
    ignoreBuildErrors: true,
  },
  // إعدادات أخرى...
};

export default nextConfig;
