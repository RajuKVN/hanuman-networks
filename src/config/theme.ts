import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: '#f0f3ff' },
          100: { value: '#dce5ff' },
          200: { value: '#b8c9ff' },
          300: { value: '#b18cff' },
          400: { value: '#91a7ff' },
          500: { value: '#6585ff' },
          600: { value: '#4568ee' },
          700: { value: '#3554ce' },
          800: { value: '#293f9f' },
          900: { value: '#1a2b70' },
          950: { value: '#151d35' },
        },
        dark: {
          base:     { value: '#0b1020' },
          surface:  { value: '#151d35' },
          card:     { value: '#151d35' },
          elevated: { value: '#1c2642' },
        },
      },
      fonts: {
        body:    { value: "'Inter', system-ui, sans-serif" },
        heading: { value: "'Inter', system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        'brand.primary': { value: '{colors.brand.500}' },
        'brand.accent':  { value: '{colors.brand.400}' },
        /* More transparent so the background aurora bleeds through */
        'glass.surface': { value: 'rgba(21, 29, 53, 0.78)' },
        'glass.border':  { value: 'rgba(168, 178, 204, 0.16)' },
        'glass.glow':    { value: 'rgba(101, 133, 255, 0.22)' },
        'text.muted':    { value: '#a8b2cc' },
        'text.subtle':   { value: '#c4cbe0' },
      },
    },
  },
  globalCss: {
    body: {
      bg: '#0b1020',
      color: 'white',
      fontFamily: "'Inter', system-ui, sans-serif",
      minH: '100vh',
    },
    '*': { boxSizing: 'border-box' },
    '::selection': { bg: 'brand.600', color: 'white' },
    /* Smooth scrollbar in webkit */
    '::-webkit-scrollbar':       { width: '5px', height: '5px' },
    '::-webkit-scrollbar-track': { background: 'transparent' },
    '::-webkit-scrollbar-thumb': { background: 'rgba(101,133,255,0.42)', borderRadius: '9999px' },
    'html': { scrollBehavior: 'smooth', scrollPaddingTop: '100px' },
    'a:focus-visible, button:focus-visible, input:focus-visible': { outline: '2px solid #b18cff', outlineOffset: '3px' },
  },
});

export const system = createSystem(defaultConfig, config);
