<template>
  <div class="listing-data">
    <span
      :class="`type ${data.name}`"
      v-for="(data, i) in pokemonData"
      :key="i"
    >
      {{ data.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Listings",

  props: ["pokemonData"]
};
</script>

<style></style>
