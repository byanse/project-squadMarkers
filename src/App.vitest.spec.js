import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { Loading } from "quasar";
import App from "./App.vue";
import route from "./router";

installQuasar({
  plugins: [Loading],
});

const router = route();

describe("Test 'App' component", () => {
  it("should be marked as 'initialized' after fetch all pokemons successfully", async () => {
    expect(App).toBeTruthy();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.vm.initialized).toBe(false);

    await wrapper.vm.initialize();

    expect(wrapper.vm.initialized).toBe(true);
  });

  it("should show 'ErrorComponent' if fetch request to load all pokemons fail", async () => {
    expect(App).toBeTruthy();

    const initialPromise = () => {
      return new Promise((_, reject) => setTimeout(reject, 100));
    };

    const wrapper = mount(App, {
      props: {
        initialPromise,
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find("#app-error").exists()).toBe(false);

    await wrapper.vm.initialize();

    expect(wrapper.find("#app-error").exists()).toBe(true);
  });

  it("should show 'router-link' after fetch all pokemons successfully", async () => {
    expect(App).toBeTruthy();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find("#app-router-link").exists()).toBe(false);

    await wrapper.vm.initialize();

    expect(wrapper.find("#app-router-link").exists()).toBe(true);
  });
});
