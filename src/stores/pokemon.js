import axios from "axios";
import { defineStore } from "pinia";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    loadingAll: true,
    loadingOne: true,
    pokemons: [],
    pokemon: null,
    error: null,
    maxPages: null,
  }),

  getters: {},

  actions: {
    async getPage(page = 1) {
      this.loadingAll = true;
      this.pokemons = [];
      this.error = null;
      this.currentPage = page;
      const limit = 5;
      const offset = limit * page - limit;

      try {
        const { data } = await axios.get(
          `${BASE_URL}?limit=${limit}&offset=${offset}`
        );

        const pokemons = await Promise.all(
          data.results.map((pokemon) =>
            axios.get(pokemon.url).then((res) => res.data)
          )
        );

        this.pokemons = pokemons;
        this.maxPages = data.count / limit;
      } catch (error) {
        this.error = error;
      } finally {
        this.loadingAll = false;
        this.loadingOne = false;
      }
    },

    async getByName(name) {
      if (!name) return;
      this.loadingOne = true;
      this.pokemon = null;
      this.error = null;

      try {
        const { data } = await axios.get(
          `${BASE_URL}/${name.trim().toLowerCase()}`
        );

        this.pokemon = data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loadingAll = false;
        this.loadingOne = false;
      }
    },
  },
});
