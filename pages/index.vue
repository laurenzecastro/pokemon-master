<template>
  <div class="container">
    <div class="pokemon-list">
      <Pokemon
        v-for="(pokemon, i) in pokemonData.results"
        class="pokemon-div"
        :key="i"
        :pokemonData="pokemon"
      >
      </Pokemon>
    </div>
    <Pagination :pokemonData="pokemonData" @emit-page-data="emitFetch" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Pokemon from "@/components/Pokemon";

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
    this.loading = true;
    this.pokemonData = await fetch(`api/pagination/${this.page}`).then(res =>
      res.json()
    );
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
