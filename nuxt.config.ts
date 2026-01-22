// https://nuxt.com/docs/api/configuration/nuxt-config

import Material from '@primeuix/themes/material';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css:['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss','@primevue/nuxt-module','@nuxt/image'],
  primevue: {
    options: {
        theme: {
            preset: Material
        }
    },
    components: {
      include: ['Button','Card']
    }
  },
  image: {
    providers:{
      yandexAvatars:{
        name:'yandexAvatars',
        default: false,
        provider: '~/providers/CustomImageProvider.ts',
        options: {
          baseURL: 'https://avatars.mds.yandex.net'
        }
      },
      picsum:{
        name:'picsum',
        default: true,
        provider: '~/providers/CustomImageProvider.ts',
        options: {
          baseURL: 'https://picsum.photos'
        }
      },
      // Дефолтный провайдер
      ipx: {
        name: 'ipx',
        provider: 'ipx',
        options: {
          maxAge: 60 * 60 * 24 * 7 // 1 неделя
        }
      }
    }
  }
})