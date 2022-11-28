import { describe, expect, it } from "vitest";
import { usePokemons } from "./usePokemons";

const _mock_pokemons = require("../../test/__mocks__/pokemons");
const _mock_pokemonExperienceOptions = require("../../test/__mocks__/pokemonExperienceOptions");
const _mock_pokemonMovesOptions = require("../../test/__mocks__/pokemonMovesOptions");
const _mock_uniquePokemonTypes = require("../../test/__mocks__/uniquePokemonTypes");
const _mock_filteredPokemons = require("../../test/__mocks__/filteredPokemons");

describe("Test usePokemons composable", () => {
  it("should fetch all pokemons when call 'initialize'", async () => {
    const {
      pokemons,
      uniquePokemonTypes,
      pokemonExperienceOptions,
      pokemonMovesOptions,
      initialize,
    } = usePokemons();

    expect(pokemons).toHaveLength(0);

    await initialize();

    expect(pokemons).toHaveLength(8);
    expect(uniquePokemonTypes).toHaveLength(5);
    expect(pokemonExperienceOptions).toHaveLength(6);
    expect(pokemonMovesOptions).toHaveLength(8);
    expect(pokemons).toMatchObject(_mock_pokemons);
    expect(uniquePokemonTypes).toMatchObject(_mock_uniquePokemonTypes);
    expect(pokemonExperienceOptions).toMatchObject(
      _mock_pokemonExperienceOptions
    );
    expect(pokemonMovesOptions).toMatchObject(_mock_pokemonMovesOptions);
  });

  it("should fetch pokemon details by name calling 'fetchByName'", async () => {
    const { fetchByName } = usePokemons();

    const pokemonName = "bulbasaur";
    const pokemon = await fetchByName(pokemonName);

    expect(pokemon).toStrictEqual(
      _mock_pokemons.find((e) => e.name === pokemonName)
    );
  });

  it("'getUniquePokemonTypes' method should return a list with the unique pokemon types", async () => {
    const { getUniquePokemonTypes } = usePokemons();

    const types = getUniquePokemonTypes();

    expect(types).toMatchObject(_mock_uniquePokemonTypes);
  });

  it("'getPokemonExperienceOptions' method should return a list with all the pokemon 'base_experience' options", async () => {
    const { getPokemonExperienceOptions } = usePokemons();

    const baseExperiences = getPokemonExperienceOptions();

    expect(baseExperiences).toMatchObject(_mock_pokemonExperienceOptions);
  });

  it("'getPokemonMovesOptions' method should return a list with all the pokemon 'moves' count(length) options", async () => {
    const { getPokemonMovesOptions } = usePokemons();

    const movesCounts = getPokemonMovesOptions();

    expect(movesCounts).toMatchObject(_mock_pokemonMovesOptions);
  });

  it("'getFilteredPokemons' method should return a list with all the pokemon filtered by 'moves (length)', 'base_experience' and 'types'", async () => {
    const { getFilteredPokemons } = usePokemons();

    const filteredPokemonsByMoves = getFilteredPokemons([
      {
        key: "moves",
        value: 85,
      },
    ]);

    expect(filteredPokemonsByMoves).toMatchObject(
      _mock_filteredPokemons.byMoves
    );

    const filteredPokemonsByExperience = getFilteredPokemons([
      {
        key: "base_experience",
        value: 142,
      },
    ]);

    expect(filteredPokemonsByExperience).toMatchObject(
      _mock_filteredPokemons.byExperience
    );

    const filteredPokemonsByType = getFilteredPokemons([
      {
        key: "types",
        value: "flying",
      },
    ]);

    expect(filteredPokemonsByType).toMatchObject(_mock_filteredPokemons.byType);

    const filteredPokemonsByAll = getFilteredPokemons([
      {
        key: "moves",
        value: 77,
      },
      {
        key: "base_experience",
        value: 142,
      },
      {
        key: "types",
        value: "poison",
      },
    ]);

    expect(filteredPokemonsByAll).toMatchObject(_mock_filteredPokemons.byAll);
  });
});
