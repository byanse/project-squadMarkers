// This file will be run before each test file

import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";

const pokemons = require("../__mocks__/pokemons");

export const restHandlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get("limit"));
    const offset = Number(req.url.searchParams.get("offset"));
    const results = pokemons.slice(offset, offset + limit);

    return res(
      ctx.status(200),
      ctx.json({
        count: 8,
        results: results,
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/:name", (req, res, ctx) => {
    const name = req.params.name;
    const pokemon = pokemons.find((e) => e.name === name);

    return res(ctx.status(200), ctx.json(pokemon));
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
