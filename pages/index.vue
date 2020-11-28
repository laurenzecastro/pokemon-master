<template>
  <div class="container">
    <Pagination :pokemonData="pokemonData" @emit-page-data="emitFetch" />
    <div v-for="(pokemon, i) in pokemonData.results" :key="i">
      <span>{{ pokemon.name }}</span>
      <img :src="pokemon.url" style="height:150px" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

import axios from "axios";

export default {
  name: "index",

  data() {
    return {
      page: 1,
      pokemonData: []
    };
  },

  watch: { page: "$fetch" },

  async fetch() {
    this.pokemonData = await fetch(
      `http://localhost:3000/api/pagination/${this.page}`
    ).then(res => res.json());
  },

  methods: {
    emitFetch({ page, reset }) {
      this.page = page;
      console.log(page, reset);
    }
  },

  components: {
    Pagination
  }
};
</script>

<style></style>
