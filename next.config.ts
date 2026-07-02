import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '192.168.0.112', '192.168.0.115', '192.168.0.104', '192.168.29.61',
    'http://192.168.0.112:3000', 'http://192.168.0.115:3000', 'http://192.168.0.104:3000', 'http://192.168.29.61:3000'
  ],
};

export default nextConfig;
