/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly SECRET_KEY: string
  readonly ID: string
  readonly TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
