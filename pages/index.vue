<template>
  <div class="container">
    <div class="pokemon-list">
      <div
        v-for="(pokemon, i) in pokemonData.results"
        :key="i"
        class="pokemon-div"
      >
        <div class="image-container">
          <img :src="pokemon.url" />
        </div>
        <span class="pokemon-name">{{ pokemon.name }}</span>
      </div>
    </div>
    <Pagination :pokemonData="pokemonData" @emit-page-data="emitFetch" />
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
    }
  },

  components: {
    Pagination
  }
};
</script>

<style></style>
