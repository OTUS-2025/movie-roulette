<script setup lang="ts">
    const route = useRoute()
    console.log(route.params.id)
</script>

<template>
    <h2 class="bg-primary">Detailed info about movie</h2>
    <MovieDetails :id="route.params.id as string" />
</template>