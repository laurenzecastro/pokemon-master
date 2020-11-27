const app = require("express")();

// Pokedex API
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

app.get("/fetch_pkmn_details/:name", async (req, res) => {
  let pokemon_name = req.params.name;

  let pkmn_endpoints = [
    `/api/v2/pokemon/${pokemon_name}`,
    `/api/v2/pokemon-species/${pokemon_name}`
  ];

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
      sprites: { front_default }
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
      abilities,
      pokemon: { name, id, weight, height, front_default },
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
    .catch();

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
});

module.exports = { path: "/api", handler: app };
