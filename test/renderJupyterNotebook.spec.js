import { expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import RenderJupyterNotebook from "@/components/RenderJupyterNotebook.vue";
import example from "@/assets/OutputExamples";

it("Class Notebook Render", async () => {
  const wrapper = mount(RenderJupyterNotebook, {
    props: {
      notebook: example,
    },
  });
  expect(wrapper.classes()).toContain("notebook-fragment");
});
