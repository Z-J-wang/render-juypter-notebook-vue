<template>
  <div class="home">
    <RenderJupyterNotebook :notebook="notebook" />
  </div>
</template>

<script>
import RenderJupyterNotebook from '../components/RenderJupyterNotebook';
import example from '../assets/OutputExamples';

export default {
  name: 'HomeView',
  components: { RenderJupyterNotebook },
  data() {
    return {
      notebook: example
    };
  }
};
</script>

<style lang="less" scoped>
.home {
  margin: 0 auto;
  width: 1200px;
  background-color: white;
}
</style>
