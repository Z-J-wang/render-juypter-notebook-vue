<template>
  <div class="about">
    <article class="markdown-body" v-html="markdownHtml" />
  </div>
</template>

<script>
import { fetchMarkdownData } from '../utils/index';
import Markdown from '../utils/notebook/markdown.it';

export default {
  data() {
    return {
      markdownHtml: ''
    };
  },
  mounted() {
    fetchMarkdownData('/Introduction.md').then(res => {
      this.markdownHtml = Markdown.render(res);
    });
  }
};
</script>
