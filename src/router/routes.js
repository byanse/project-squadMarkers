const routes = [
  {
    path: "/",
    component: () => import("pages/HomePage.vue"),
  },
  {
    path: "/pokemon/:pokemonName",
    name: "PokemonPage",
    component: () => import("pages/PokemonPage.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFoundPage.vue"),
  },
];

export default routes;
