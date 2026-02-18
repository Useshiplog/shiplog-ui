import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/system2': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/system2/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Transform cookie name from access_token to token for System 2 backend
            if (req.headers.cookie) {
              let cookieHeader = req.headers.cookie;
              // Replace access_token= with token= in the cookie string
              cookieHeader = cookieHeader.replace(/access_token=/g, 'token=');
              proxyReq.setHeader('Cookie', cookieHeader);
            }
          });
        },
      },
    },
  },
})
