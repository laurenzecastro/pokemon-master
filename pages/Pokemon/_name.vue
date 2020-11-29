<template>
  <div class="single-pokemon-container">
    <div id="left-div">
      <div class="image-container">
        <img :src="pokemon.front_default" style="height:300px" /> <br />
      </div>
      <div id="pokemon-details">
        <h1 class="pokemon-name">{{ $route.params.name.toUpperCase() }}</h1>
        <span class="block metrics"
          >Weight: <span class="value">{{ pokemon.weight }} kg</span></span
        >
        <span class="block metrics"
          >Height:
          <span class="value"> {{ pokemon.height }} m</span>
        </span>
        <span class="block metrics"
          >Type:
          <span
            :class="`metrics type ${type.type.name}`"
            v-for="(type, i) in types"
            :key="i"
          >
            {{ type.type.name }}
          </span>
        </span>
        <span class="block metrics"
          >Abilities:
          <span class="type ability" v-for="(ability, i) in abilities" :key="i">
            {{ ability.ability.name }}
          </span>
        </span>
      </div>

      <div id="evolution-details">
        <h3>Evolution Cycle</h3>

        <ul>
          <li v-for="(pokemon, i) in pokemonEvolution.chain" :key="i">
            <nuxt-link
              class="pokemon-link"
              :to="`/pokemon/${pokemon.species_name}`"
            >
              {{ pokemon.species_name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div id="middle-div">
      <div id="about-details">
        <h1>About</h1>
      </div>

      <div id="stats-details">
        <h1>Stats</h1>
        <!-- :class="`metrics type ${stats.type.name}`" -->
        <h5 v-for="(stats, i) in stats" :key="i">
          {{ stats.stat.name }} - {{ stats.base_stat }}
        </h5>
      </div>
    </div>

    <div id="right-div">
      <div id="strengths-details">
        <h1>Strengths</h1>
      </div>
      <div id="weakness-details">
        <h1>Weakness</h1>
      </div>
      <div id="moves-details">
        <h1>Moves</h1>
        <span class="moves" v-for="(move, i) in moves" :key="i">
          {{ move.move.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `Pokemon`,

  async asyncData({ params, $axios }) {
    return await $axios.$get(
      `http://localhost:3000/api/fetch_pkmn_details/${params.name}`
    );
  }
};
</script>

<style></style>
