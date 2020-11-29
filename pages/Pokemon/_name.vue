<template>
  <div>
    <h1>{{ $route.params.name }}</h1>
    <img :src="pokemon.front_default" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  async asyncData({ params, $axios }) {
    return await $axios.$get(
      `http://localhost:3000/api/fetch_pkmn_details/${params.name}`
    );
  }
};
</script>

<style></style>
