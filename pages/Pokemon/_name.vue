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
        <h5>{{ parsedAbout }}</h5>
        <select v-model="selected" class="select">
          <option
            v-for="option in about"
            :key="option.flavor_text"
            :value="option.flavor_text"
          >
            Pokemon {{ option.version.name }}
          </option>
        </select>
      </div>

      <div id="stats-details">
        <h1>Stats</h1>
        <!-- :class="`metrics type ${stats.type.name}`" -->
        <div id="stats-container">
          <div
            :class="`stats-card ${stats.stat.name}`"
            v-for="(stats, i) in stats"
            :key="i"
          >
            <h3>
              {{ stats.base_stat }}
            </h3>
            <span>
              {{ stats.stat.name.toUpperCase() }}
            </span>
          </div>
        </div>
      </div>

      <div id="moves-details">
        <h1>Moves</h1>
        <span class="moves" v-for="(move, i) in moves" :key="i">
          {{ move.move.name }}
        </span>
      </div>
    </div>

    <div id="right-div">
      <div id="strengths-details">
        <h1>Strengths</h1>
        <div class="listings-container">
          <div v-for="(item, i) in pkmnStrengthWeakness" :key="i" class="card">
            <span :class="`element-name type ${item.name}`">{{
              item.name
            }}</span>

            <span class="damage-indicator">2x damage to:</span>
            <Listings :pokemonData="item.double_damage_to" />

            <span class="damage-indicator">1/2 damage from:</span>
            <Listings :pokemonData="item.half_damage_from" />

            <span class="damage-indicator">No damage from:</span>
            <Listings :pokemonData="item.no_damage_from" />
          </div>
        </div>
      </div>
      <div id="weakness-details">
        <h1>Weakness</h1>
        <div class="listings-container">
          <div v-for="(item, i) in pkmnStrengthWeakness" :key="i" class="card">
            <span :class="`element-name type ${item.name}`">{{
              item.name
            }}</span>

            <span class="damage-indicator">2x damage from:</span>
            <Listings :pokemonData="item.double_damage_from" />

            <span class="damage-indicator">1/2 damage to:</span>
            <Listings :pokemonData="item.half_damage_to" />

            <span class="damage-indicator">No damage to:</span>
            <Listings :pokemonData="item.no_damage_to" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "@/components/reusable/Listings";
export default {
  name: `Pokemon`,

  data() {
    return {
      selected: "Select the pokemon version"
    };
  },

  async asyncData({ params, $axios }) {
    let url =
      process.env.NUXT_ENV_ENVIRONMENT == "dev"
        ? "http://localhost:3000/"
        : "http://lau-pokemon-master.herokuapp.com/";

    return await $axios.$get(`${url}api/fetch_pkmn_details/${params.name}`);
  },

  computed: {
    parsedAbout() {
      return this.selected.replace(/\f/g, " ");
    }
  }
};
</script>

<style></style>
