<script setup lang="ts">
import type { RandomMovie, RandomMovieResponse } from '~/types/movie'
    const props = defineProps({
        movieType:{
            type: String,
            default(rawProps: string) {
                if (['movie', 'tv-series', 'cartoon', 'animated-series', 'anime'].includes(rawProps)){
                        return rawProps
                    }else{
                        return "movie"
                    }
            }
        }
    })

    const api = useApi()
    const getRandomMovieURL = `${api.url}movie/random`
    const { data, status, error } = await useFetch(getRandomMovieURL, {
        method: 'GET',
        headers: {
            'X-API-KEY': api.key
        },
        query:{
            notNullFields: ['name','description','countries.name','alternativeName'],
            type : props.movieType,
            status : 'completed',
        },
        onResponse ({ request, response, options }) {
            const movie  = reactive({} as RandomMovie)
            if (response.ok && response._data !== null) {
                // console.log(JSON.stringify(response._data))

                const data = response._data as RandomMovieResponse
                movie.poster = data?.poster.url && data?.poster.url !=='' ? data?.poster.url : ''
                movie.name = data?.name ? data.name : ''
                movie.alternativeName = data?.alternativeName ? data.alternativeName : ''
                movie.countries = data?.countries && data.countries.length > 0 && data.countries[0] !== undefined ? data.countries[0].name : '' 
                movie.description = data?.description ? data.description : ''
                movie.id = data?.id

                response._data = movie
            }
        }
    })
    const randomMovie = data as unknown as RandomMovie
</script>
<template>
    <Card v-if="status && status === 'success'" class="w-2xs">
    <template #header>
      <Poster4Film :url="randomMovie.poster"></Poster4Film>
    </template>
    <template #title>{{ randomMovie.name }}</template>
    <template #subtitle>
        <div class="">
          {{ randomMovie.alternativeName }}
        </div>
        <div class="">{{ randomMovie.countries }}</div>
    </template>
    <template #content>
      <div class="">{{ randomMovie.description }}</div>
    </template>
     <template #footer>
        <div class="flex gap-4 mt-1">
            <Button asChild v-slot="slotProps">
                <NuxtLink :to="{name: 'detailed-id', params: { id: randomMovie.id } }" :class="slotProps.class">More info</NuxtLink>
            </Button>
        </div>
    </template>
  </Card>
  <Card v-else class="">
    <template #title><h2>Somethings wrong...</h2></template>
    <template #content>{{ error }}</template>
  </Card>
</template>