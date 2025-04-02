/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_VERSION: string
  readonly VITE_AUTH_ENABLED: string
  readonly VITE_AUTH_TOKEN_KEY: string
  readonly VITE_ENABLE_PROXY_ROTATION: string
  readonly VITE_ENABLE_AUTO_PURCHASE: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_TELEGRAM_BOT_TOKEN?: string
  readonly VITE_TELEGRAM_CHAT_ID?: string
  readonly VITE_EMAIL_SERVICE_ENABLED: string
  readonly VITE_EMAIL_SERVICE_ADDRESS?: string
  readonly VITE_PROXY_LIST?: string
  readonly VITE_PROXY_ROTATION_INTERVAL: string
  readonly VITE_DB_TYPE: 'sqlite' | 'postgres' | 'mysql'
  readonly VITE_DB_PATH: string
  readonly VITE_ENCRYPTION_KEY: string
  readonly VITE_SESSION_TIMEOUT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 