// Базовый тип провайдера (можно уточнить по документации @nuxt/image)
export interface ImageProvider {
  name: string
  default?: boolean
  provider?: string
  options?: Record<string, any>
  // Дополнительные поля из конфигурации
  [key: string]: any
}

export interface ImageProviders {
  [key: string]: ImageProvider
}

// Тип для результата match провайдера
export interface MatchedProvider {
  name: string
  provider: ImageProvider
  src: string
}