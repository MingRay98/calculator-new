import { defineConfig, transformWithOxc } from 'vite';

export default defineConfig({
  base: '/calculator-new/',
  plugins: [{
    name: 'legacy-react-jsx',
    enforce: 'pre',
    transform(code, id) {
      if (/\/src\/.*\.js$/.test(id)) {
        return transformWithOxc(code, id, { lang: 'jsx', jsx: { runtime: 'classic' } });
      }
    },
  }],
  define: { 'process.env.PUBLIC_URL': JSON.stringify('/calculator-new') },
  build: { outDir: 'build' },
  test: { environment: 'jsdom', globals: true },
});
