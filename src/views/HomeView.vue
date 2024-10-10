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
    <div>
      <el-skeleton :rows="5" animated :count="4" :loading="loading">
        <template #template>
          <el-skeleton-item variant="h1" class="my-4 w-60" />
          <el-skeleton-item variant="p" />
          <el-skeleton-item variant="p" />
          <el-skeleton-item variant="p" />
          <el-skeleton-item variant="p" />
        </template>
        <template #default>
          <RenderJupyterNotebook :notebook="notebook" />
        </template>
      </el-skeleton>
    </div>
  </DefaultLayout>
</template>

<script>
import RenderJupyterNotebook from '../components/RenderJupyterNotebook';
import TheUploader from '../components/TheUploader.vue';
import DefaultLayout from '..//layout/DefaultLayout.vue';
import { Download } from '@element-plus/icons-vue';
import { fetchNotebookData } from '../utils/index';

export default {
  name: 'HomeView',
  components: { RenderJupyterNotebook, TheUploader, DefaultLayout, Download },
  data() {
    return {
      notebook: {},
      loading: true
    };
  },
  created() {
    fetchNotebookData('/render-juypter-notebook-vue/OutputExamples.ipynb').then(data => {
      this.notebook = data;
      this.loading = false;
    });
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
