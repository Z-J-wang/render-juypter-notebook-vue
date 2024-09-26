<template>
  <el-upload
    ref="UploadRef"
    class="flex flex-row-reverse custom-upload"
    v-model:file-list="fileList"
    :auto-upload="false"
    accept=".ipynb"
    @change="onChange"
    @remove="onRemove"
    @exceed="onExceed"
  >
    <template #trigger>
      <el-button color="#f37726" plain>
        Select an .ipynb file
        <template #icon>
          <Document />
        </template>
      </el-button>
    </template>
  </el-upload>
</template>

<script>
import { Document } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';

export default {
  name: 'TheUploader',
  components: { Document },
  props: {
    notebook: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    onChange(file) {
      if (!this.isIpynb(file)) return (this.fileList = [file]);
      this.fileList = [file]; // clear the file list after selecting a new file
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const notebook = JSON.parse(e.target.result);
          // trigger a view transition when the notebook is updated
          document.startViewTransition(() => {
            this.$emit('update:notebook', notebook);
          });
        } catch (error) {
          console.error(error);
          ElNotification({ title: 'Error', message: 'The .ipynb file is not valid!', type: 'error' });
        }
      };
      reader.readAsText(file.raw);
    },
    onRemove() {
      // clear the notebook when the file is removed
      this.$emit('update:notebook', {});
    },
    isIpynb(file) {
      const regExp = /\.ipynb$/;
      const isIpynb = regExp.test(file.name);
      if (!isIpynb)
        ElNotification({ title: 'Warning', message: 'You can only upload one .ipynb file!', type: 'warning' });

      return isIpynb;
    },
    onExceed(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="less">
.custom-upload {
  .el-upload-list {
    margin-right: 8px;
  }

  .el-upload-list__item:hover {
    background-color: #fef1e9;
  }

  .el-upload-list__item .el-icon--close:hover {
    color: #f37726 !important;
  }
}
</style>
