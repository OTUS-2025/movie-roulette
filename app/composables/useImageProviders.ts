import type { ImageProvider, ImageProviders, MatchedProvider } from '~/types/image-providers'

export const useImageProviders = () => {
  const img = useImage()
  
  // Получаем все провайдеры как массив объектов с именем
  const getProviders = computed((): Array<ImageProvider & { providerName: string }> => {
    if (!img?.options?.providers) return []
    
    const providers = img.options.providers as unknown as ImageProviders
    return Object.entries(providers).map(([name, provider]) => ({
      providerName: name,
      ...provider
    }))
  })
  
  // Функция для определения провайдера по URL
  const matchProviderByUrl = (url: string): MatchedProvider | null => {
    if (!url) return null
    
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      const pathname = urlObj.pathname
      
      // Ищем провайдера по домену или другому признаку
      const matched = getProviders.value.find(provider => {
        // Вариант 1: Проверка по домену из конфигурации
        if (provider.options?.domains?.includes(hostname)) {
          return true
        }
        
        // Вариант 2: Проверка по паттерну в baseURL
        if (provider.options?.baseURL && url.includes(provider.options.baseURL)) {
          return true
        }
        
        // Вариант 3: Проверка по имени провайдера в URL (если это часть пути)
        if (url.includes(`/${provider.providerName}/`)) {
          return true
        }
        
        return false
      })
      
      if (matched) {
        return {
          name: matched.providerName,
          provider: matched,
          src: transformSrcForProvider(matched, url)
        }
      }
      
      // Дефолтный провайдер, если не нашли
      return getDefaultProvider(url)
    } catch (error) {
      console.error('Invalid URL:', url, error)
      return getDefaultProvider(url)
    }
  }
  
  // Преобразование URL для конкретного провайдера (если нужно)
  const transformSrcForProvider = (provider: ImageProvider, originalUrl: string): string => {
    const { providerName } = provider as any
    
    // Для других провайдеров своя логика
    return originalUrl
  }
  
  // Получаем дефолтный провайдер
  const getDefaultProvider = (url: string): MatchedProvider => {
    const defaultProvider = getProviders.value.find(p => 
      p.providerName === 'ipx' || p.providerName === 'default'
    ) || getProviders.value[0]
    
    return {
      name: defaultProvider?.providerName || 'ipx',
      provider: defaultProvider as ImageProvider,
      src: url
    }
  }
  
  return {
    providers: getProviders,
    matchProviderByUrl,
    getDefaultProvider
  }
}