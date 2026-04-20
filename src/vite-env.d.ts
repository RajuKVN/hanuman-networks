/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GIST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
