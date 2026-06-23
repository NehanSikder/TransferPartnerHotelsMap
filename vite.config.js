import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites under /<repo>/. If you later move to a
// custom domain (CNAME), change base to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/TransferPartnerHotelsMap/',
})
