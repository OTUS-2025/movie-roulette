<script setup lang="ts">
  import type { DetailedMovie, DetailedMovieResponse } from '~/types/movie'
    const props = defineProps({
        id:{
            type: String,
            default: '779'
        }
      })

    const api = useApi()
    const getRandomMovieURL = `${api.url}movie`
    const { data, status, error } = await useFetch(getRandomMovieURL, {
          method: 'GET',
          headers: { 'X-API-KEY': api.key },
          query: {
              id: props.id
          },
        async onResponse ({ request, response, options }) {
          const detailed  = reactive({} as DetailedMovie)
          if (response.ok && response._data !== null) {
            // console.log(JSON.stringify(response._data))
            const data = response._data as DetailedMovieResponse
            if (data.docs.length > 0) {
              detailed.id = data.docs[0]?.id ? data.docs[0].id : ''
              detailed.name = data.docs[0]?.name ? data.docs[0].name : ''
              detailed.alternativeName = data.docs[0]?.alternativeName ? data.docs[0].alternativeName : ''
              // detailed.poster.url = data.docs[0]?.poster.url ? data.docs[0].poster.url : ''
              detailed.posterUrl = data.docs[0]?.poster.url ? data.docs[0].poster.url : ''
              detailed.description = data.docs[0]?.description ? data.docs[0].description : ''  
              response._data = detailed
            }
          }
        }
    })
    const movie = data as unknown as DetailedMovie
</script>

<template>
  <Card v-if="status && status === 'success'">
    <template #header>
      <Poster4Film :url="movie.posterUrl"></Poster4Film>
    </template>
    <template #title>
      {{ movie.name }} ({{ movie.id }})
    </template>
    <template #subtitle>
          {{ movie.alternativeName }}
    </template>
    <template #content>
      {{ movie.description }}
      <!-- <pre>{{ movie }}</pre> -->
    </template>
    <template #footer>
        <div class="flex gap-4 mt-1">
            <Button asChild v-slot="slotProps">
                <NuxtLink :to="{name: 'index' }" :class="slotProps.class">Home</NuxtLink>
            </Button>
        </div>
    </template>
  </Card>
  <Card v-else class="">
    <template #title><h2>Somethings wrong...</h2></template>
    <template #subtitle><h6>Status is {{ status }}</h6></template>
    <template #content>{{ error }}</template>
  </Card>
</template>