import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: '#f3eeff' },
          100: { value: '#e4d4ff' },
          200: { value: '#cdb0ff' },
          300: { value: '#b28aff' },
          400: { value: '#a78bfa' },
          500: { value: '#8b5cf6' },
          600: { value: '#7c3aed' },
          700: { value: '#6d2ddb' },
          800: { value: '#5b21b6' },
          900: { value: '#3d1391' },
          950: { value: '#1e0a5c' },
        },
        dark: {
          base:     { value: '#05000f' },
          surface:  { value: '#0a0225' },
          card:     { value: '#0f0432' },
          elevated: { value: '#180845' },
        },
      },
      fonts: {
        body:    { value: "'Inter', system-ui, sans-serif" },
        heading: { value: "'Inter', system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        'brand.primary': { value: '{colors.brand.600}' },
        'brand.accent':  { value: '{colors.brand.400}' },
        /* More transparent so the background aurora bleeds through */
        'glass.surface': { value: 'rgba(10, 2, 28, 0.52)' },
        'glass.border':  { value: 'rgba(167, 139, 250, 0.28)' },
        'glass.glow':    { value: 'rgba(139, 92, 246, 0.55)' },
        'text.muted':    { value: 'rgba(255, 255, 255, 0.50)' },
        'text.subtle':   { value: 'rgba(255, 255, 255, 0.78)' },
      },
    },
  },
  globalCss: {
    body: {
      bg: '#05000f',
      color: 'white',
      fontFamily: "'Inter', system-ui, sans-serif",
      minH: '100vh',
    },
    '*': { boxSizing: 'border-box' },
    '::selection': { bg: 'brand.600', color: 'white' },
    /* Smooth scrollbar in webkit */
    '::-webkit-scrollbar':       { width: '5px', height: '5px' },
    '::-webkit-scrollbar-track': { background: 'transparent' },
    '::-webkit-scrollbar-thumb': { background: 'rgba(139,92,246,0.35)', borderRadius: '9999px' },
  },
});

export const system = createSystem(defaultConfig, config);
