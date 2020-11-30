<template>
  <header>
    <h1 class="title">
      <nuxt-link to="/">
        My Pokedex
      </nuxt-link>
    </h1>

    <div class="search">
      <input
        type="text"
        class="search-box"
        placeholder="Search pokemon"
        @input="debounceSearch($event)"
      />

      <div class="search-results" :class="{ active: !isHidden }">
        <h5 v-if="!isSuccess">{{ loadingMessage }}</h5>
        <nuxt-link v-else :to="`/pokemon/${pokemonName.toLowerCase()}`">
          <h5>
            {{ pokemonName }}
          </h5>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      pokemonName: "",
      isHidden: true,
      isSuccess: false,
      loadingMessage: "Searching..",

      // search
      timeOut: "",
      timeInterval: 500,
      searchResult: [],
      searchKeyword: ""
    };
  },

  methods: {
    async searchPokemon(keyword) {
      this.searchResult = await this.$axios.$get(
        `api/fetch_pkmn_details/${keyword}`
      );

      let { status } = this.searchResult;

      if (status == "SUCCESS") {
        this.isSuccess = true;
        this.pokemonName = this.searchResult.pokemon.name;
      } else if (status == "FAILED") {
        this.loadingMessage = "No Pokemon Found.";
      }
    },

    debounceSearch($event) {
      this.isHidden = false;
      this.isSuccess = false;
      this.loadingMessage = "Searching...";

      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }

      //After the timer, call the function
      this.timeOut = setTimeout(() => {
        this.searchPokemon($event.target.value);
      }, this.timeInterval);
      // }
    }
  },

  created() {
    this.isHidden = true;
  },

  watch: {
    $route: {
      handler() {
        this.isHidden = true;
        this.loadingMessage = "Searching...";
      },
      immediate: true
    }
  }
};
</script>

<style></style>
