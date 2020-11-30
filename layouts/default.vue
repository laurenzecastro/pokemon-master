<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Layout",

  data() {
    return {
      searchKeyword: "",

      // search
      timeOut: "",
      timeInterval: 1000,
      searchResult: []
    };
  },

  methods: {
    async searchPokemon() {
      this.searchResult = await this.$axios.$get(
        `http://localhost:3000/api/fetch_pkmn_details/${this.searchKeyword}`
      );

      let { status } = this.searchResult;

      if (status == "SUCCESS") {
        console.log(this.searchResult.pokemon.name);
      } else if (status == "FAILED") {
        console.log("FAILED");
      }
    },

    debounceSearch(keyword) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }

      //After the timer, call the function
      this.timeOut = setTimeout(() => {
        this.searchPokemon();
      }, this.timeInterval);
      // }
    }
  },

  components: {
    Header
  },

  created() {
    this.$nuxt.$on("searchKeyword", event => {
      this.searchKeyword = event.target.value;
      this.debounceSearch();
    });
  }
};
</script>
