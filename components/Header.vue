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
        @input="$nuxt.$emit('searchKeyword', $event)"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      searchKeyword: ""
    };
  }
};
</script>

<style></style>
