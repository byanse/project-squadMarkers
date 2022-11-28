import { api } from "boot/axios";

const pokemons = [];
const uniquePokemonTypes = [];
const pokemonExperienceOptions = [];
const pokemonMovesOptions = [];
const BASE_PATH = "/pokemon";

export function usePokemons() {
  const initialize = async () => {
    pokemons.length = 0;
    uniquePokemonTypes.length = 0;

    const data = await fetchPokemonsList(null, 100000);

    pokemons.push(...data.results);

    uniquePokemonTypes.push(...getUniquePokemonTypes());
    pokemonExperienceOptions.push(...getPokemonExperienceOptions());
    pokemonMovesOptions.push(...getPokemonMovesOptions());
  };

  const fetchPokemonByName = async (name) => {
    return api.get(`${BASE_PATH}/${name}`).then(({ data }) => data);
  };

  const fetchPokemonsList = async (filters, limit = 5, offset = 0) => {
    if (filters && filters.length) {
      const filteredList = getFilteredPokemons(filters);

      return {
        results: filteredList.slice(offset, offset + limit),
        count: filteredList.length,
      };
    } else {
      const { data } = await api.get(BASE_PATH, { params: { limit, offset } });

      data.results = await Promise.all(
        data.results.map((pokemon) => fetchPokemonByName(pokemon.name))
      );

      return data;
    }
  };

  const getUniquePokemonTypes = () => {
    const uniquePokemonTypesMap = {};

    for (const pokemon of pokemons) {
      for (const type of pokemon.types) {
        const typeName = type.type.name;

        if (!uniquePokemonTypesMap[typeName]) {
          uniquePokemonTypesMap[typeName] = typeName;
        }
      }
    }

    return Object.keys(uniquePokemonTypesMap);
  };

  const getPokemonExperienceOptions = () => {
    return [...new Set(pokemons.map((e) => e.base_experience))]
      .filter((e) => e !== null)
      .sort((a, b) => a - b);
  };

  const getPokemonMovesOptions = () => {
    return [...new Set(pokemons.map((e) => e.moves.length))].sort(
      (a, b) => a - b
    );
  };

  const getFilteredPokemons = (filters = []) => {
    const pokemonsDetails = [];

    for (const pokemon of pokemons) {
      let matchedFilters = 0;

      for (const filter of filters) {
        const { key, value } = filter;

        if (key === "types") {
          const pokemonHasType = pokemon.types.find(
            (e) => e.type.name === value
          );

          if (pokemonHasType) {
            matchedFilters += 1;
          }
        } else if (
          (key === "moves" && pokemon.moves.length === value) ||
          pokemon[key] === value
        ) {
          matchedFilters += 1;
        }
      }

      if (matchedFilters === filters.length) {
        pokemonsDetails.push(pokemon);
      }
    }

    return pokemonsDetails;
  };

  return {
    pokemons,
    uniquePokemonTypes,
    pokemonExperienceOptions,
    pokemonMovesOptions,
    initialize: initialize,
    fetchByName: fetchPokemonByName,
    fetchList: fetchPokemonsList,
    // only export for testing purposes
    getUniquePokemonTypes,
    getPokemonExperienceOptions,
    getPokemonMovesOptions,
    getFilteredPokemons,
  };
}
