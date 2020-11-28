<template>
  <div class="container">
    <div v-for="(pokemon, i) in pokemonData.results" :key="i">
      <span>{{ pokemon.name }}</span>
      <img :src="pokemon.url" style="height:150px" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",

  async asyncData({ $axios }) {
    const pokemonData = await $axios.$get(
      `http://localhost:3000/api/pagination/1`
    );
    return { pokemonData };
  },

  mounted() {
    console.log(this.pokemonData);
  }
};
</script>

<style></style>
