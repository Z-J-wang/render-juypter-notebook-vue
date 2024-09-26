<template>
  <DefaultLayout>
    <template #header-right>
      <TheUploader v-model:notebook="notebook" />
      <a href="/render-juypter-notebook-vue/OutputExamples.ipynb" target="_blank">
        <el-button plain class="example-button">
          <el-icon size="20" class="mr-1"><Download /></el-icon> Example
        </el-button>
      </a>
    </template>
    <RenderJupyterNotebook :notebook="notebook" />
  </DefaultLayout>
</template>

<script>
import RenderJupyterNotebook from '../components/RenderJupyterNotebook';
import example from '../assets/OutputExamples';
import TheUploader from '../components/TheUploader.vue';
import DefaultLayout from '..//layout/DefaultLayout.vue';
import { Download } from '@element-plus/icons-vue';

export default {
  name: 'HomeView',
  components: { RenderJupyterNotebook, TheUploader, DefaultLayout, Download },
  data() {
    return {
      notebook: example
    };
  }
};
</script>

<style lang="less" scoped>
.example-button {
  &.el-button.is-plain:hover {
    border-color: #f37726;
    color: #f37726;
    outline: none;
  }
}
</style>
