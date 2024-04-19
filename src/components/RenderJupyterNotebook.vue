<template>
  <div ref="NotebookFragment" class="notebook-fragment" />
</template>

<script>
import { Notebook } from '../utils/index';

export default {
  name: 'RenderJupyterNotebook',
  props: {
    notebook: { required: true, type: Object }
  },
  watch: {
    notebook: function (newVal) {
      if (newVal?.cells) this.render();
    }
  },
  methods: {
    async render() {
      this.$refs.NotebookFragment.innerHTML = ''; // Clear the previous content
      const notebook = new Notebook(this.notebook, false);
      const fragment = await notebook.render();
      this.$refs.NotebookFragment.appendChild(fragment);
    }
  },
  async mounted() {
    if (this.notebook?.cells) this.render();
  }
};
</script>
