import markdown from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default markdown({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight: function (str, lang) {
    return hljs.highlight(str, { language: lang }).value;
  }
});
