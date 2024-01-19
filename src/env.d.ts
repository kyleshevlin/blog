/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BUTTONDOWN_EMAIL_API_KEY: string

  readonly PUBLIC_FIREBASE_API_KEY: string
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string
  readonly PUBLIC_FIREBASE_DATABASE_URL: string
  readonly PUBLIC_FIREBASE_PROJECT_ID: string
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string

  readonly GITHUB_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
