<template>
  <div class="home">
    <el-container>
      <el-header class="bg-white shadow sticky top-0 z-10">
        <div class="bg-white flex flex-nowrap justify-between items-center" style="height: 60px">
          <h2 class="text-3xl font-bold">render-jupyter-notebook-vue</h2>
          <el-upload
            ref="uploadRef"
            class="flex flex-row-reverse"
            :auto-upload="false"
            accept=".ipynb"
            @change="onChange"
          >
            <template #trigger>
              <el-button type="primary">Select file</el-button>
            </template>
          </el-upload>
        </div>
      </el-header>
      <el-main>
        <RenderJupyterNotebook :notebook="notebook" />
      </el-main>
    </el-container>
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
  },
  methods: {
    onChange(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.notebook = JSON.parse(e.target.result);
      };
      reader.readAsText(file.raw);
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  & > div {
    margin: 0 auto;
    width: 1200px;
  }
}

.el-main {
  margin: 0 auto;
  width: 1200px;
  background-color: white;
}
</style>
