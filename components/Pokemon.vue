<template>
  <nuxt-link :to="`pokemon/${pokemonData.name}`">
    <div class="image-container">
      <img :src="pokemonData.url" />
    </div>
    <span class="pokemon-name">{{ pokemonData.name }}</span>
  </nuxt-link>
</template>

<script>
let name, url;
export default {
  props: ["pokemonData"]
};
</script>

<style></style>
