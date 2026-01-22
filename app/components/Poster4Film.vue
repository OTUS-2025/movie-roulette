<script setup lang="ts">
import type { MatchedProvider } from '~/types/image-providers'

interface Props {
    url: string,
    width?: number | string
    height?: number | string
    quality?: number
    modifiers?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
    url: '',
    width: 600,
    height: 800,
    quality: 80,
    modifiers: () => ({})
})

const { matchProviderByUrl } = useImageProviders()

// Определяем провайдер по URL
const matchedProvider = computed((): MatchedProvider => {
  const result = matchProviderByUrl(props.url)
  if (!result) {
    console.warn(`No provider found for URL: ${props.url}`)
    return {
      name: 'ipx',
      provider: {} as any,
      src: props.url
    }
  }
  return result
})

// Логируем для отладки
onMounted(() => {
  console.log('Matched provider:', matchedProvider.value)
})

</script>
<template>
    <NuxtImg v-if="props.url !== ''" :provider="matchedProvider.name" :src="matchedProvider.src" :modifiers="props.modifiers" :width="props.width" :height="props.height" :quality="props.quality" />
    <NuxtImg v-else src="/posters/noPoster.jpg"  :width="props.width" :height="props.height"/>
  <div>
  </div>
</template>