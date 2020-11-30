const app = require("express")();
const axios = require("axios");
// Pokedex API
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

app.get("/fetch_pkmn_details/:name", async (req, res) => {
  let pokemon_name = req.params.name;

  // Initial check if pokemon exists

  P.getPokemonByName(pokemon_name)
    .then(async resp => {
      // If Pokemon is found, proceed
      let pkmn_endpoints = [
        `/api/v2/pokemon/${pokemon_name}`,
        `/api/v2/pokemon-species/${pokemon_name}`
      ];

      // Fetch Pokemon Details
      let pokemonDetails = await P.resource(pkmn_endpoints).then(function(
        response
      ) {
        // Prune all unnecessary data
        let {
          abilities,
          name,
          id,
          weight,
          height,
          stats,
          types,
          moves,
          sprites: {
            other: { "official-artwork": officialArtwork }
          }
        } = response[0];

        let {
          flavor_text_entries,
          evolution_chain: { url }
        } = response[1];

        // While accessing the bulbapedia, their weight and height stated by the api should be
        // divided by 10

        weight /= 10; // kg
        height /= 10; // m

        return {
          status: "SUCCESS",
          abilities,
          pokemon: {
            name,
            id,
            weight,
            height,
            front_default: officialArtwork.front_default
          },
          stats,
          types,
          moves,
          about: flavor_text_entries,
          url // evolution url
        };
      });
      //  Get the pokemon evolution url
      let { url } = pokemonDetails;
      let pokemonEvolution = await P.resource(url)
        .then(response => {
          // Transform data so that the pokemon name is only returned
          let chain = [];
          let evoData = response.chain;
          do {
            let numberOfEvolutions = evoData["evolves_to"].length;

            chain.push({
              species_name: evoData.species.name
            });

            if (numberOfEvolutions > 1) {
              for (let i = 1; i < numberOfEvolutions; i++) {
                chain.push({
                  species_name: evoData.evolves_to[i].species.name.toLowerCase()
                });
              }
            }

            evoData = evoData["evolves_to"][0];
          } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

          return { chain };
        })
        .catch(err => {
          throw err;
        });

      // Get the pokemon type
      let { types } = pokemonDetails;

      // Fetch all pkmn type and find the strengths and weaknesses
      let typeStrengthsWeaknesses = types.map(el => {
        return P.getTypeByName([el.type.name])
          .then(response => {
            return { name: response[0].name, ...response[0].damage_relations };
          })
          .catch(err => {
            throw err;
          });
      });

      Promise.all(typeStrengthsWeaknesses).then(pkmnStrengthWeakness => {
        // Combine all responses to one single response
        res.json({ ...pokemonDetails, pokemonEvolution, pkmnStrengthWeakness });
      });
    })
    .catch(err => {
      res.json({
        status: "FAILED",
        message: "No pokemon found"
      });
    });
});

// Orig
app.get("/pagination/:page/", async (req, res) => {
  let { page } = req.params;
  let limit = parseInt(req.query.limit) || 20; // default limit will be 10
  let offset = 0 + (page - 1) * limit;

  axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(function(response) {
      let resultsPkmn = response.data.results;
      let { count } = response.data;

      // to get the total pages, divide the total count by the limit
      let totalPage = count / parseInt(limit);
      response.data.totalPages = parseInt(totalPage) + 1;
      response.data.currPage = parseInt(page);

      resultsPkmn.map(el => {
        let urlArray = el.url.split("/");
        let pokemonId = urlArray.splice(urlArray.length - 2, 1);

        // Add pokemon avatar and api endpoint for single pokemon detail
        el.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        el.pokemon_details = `localhost:3000/api/fetch_pkmn_details/${el.name}`;
      });

      res.json(response.data);
    });
});

module.exports = { path: "/api", handler: app };
