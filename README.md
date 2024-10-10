# render-jupyter-notebook-vue

## 介绍

RenderJupyterNotebook 是一个 vue 3.x 组件，**通过 JavaScript 实现 jupyter notebook 文件的还原渲染**。渲染效果基本和[JupyterLab](https://github.com/jupyterlab/jupyterlab)的保持一致。这是因为最底层的渲染逻辑是直接引用于 JupyterLab 并进行了抽离组装。其中核心代码在[src/utils/notebook](https://github.com/Z-J-wang/render-juypter-notebook-vue/tree/master/src/utils/notebook)中的`Class Notebook`。

点击链接查看效果：<a href="https://z-j-wang.github.io/render-juypter-notebook-vue/#/" target="_blank">render-jupyter-notebook-vue (z-j-wang.github.io)</a>

## 使用

> RenderJupyterNotebook 组件已经发布到 npm。链接：[render-jupyter-notebook-vue - npm (npmjs.com)](https://www.npmjs.com/package/render-jupyter-notebook-vue)

### 安装 render-jupyter-notebook-vue 插件

```bash
npm i render-jupyter-notebook-vue
```

安装好插件后，有两种使用方法：

1. 项目中直接引入[RenderJupyterNotebook](https://github.com/Z-J-wang/render-juypter-notebook-vue/blob/master/src/components/RenderJupyterNotebook.vue)组件最为便捷。
2. 调用 Class Notebook 渲染 Notebook

### 方法一：直接引入 RenderJupyterNotebook 组件

RenderJupyterNotebook 组件仅接收一个参数：`notebook`。它是 notebook 源码的 JSON 数据。

> **notebook 源码的 JSON 数据说明**：
>
> notebook 源文件为`.ipynb`（如本项目中提供的案例 notebook 文件 OutputExamples.ipynb）。只需要将`.ipynb`后缀改为`.json`就可以拿到 notebook 源码的 JSON 数据。

例如：

```html
<template>
  <div class="home">
    <RenderJupyterNotebook :notebook="notebook" />
  </div>
</template>

<script>
  import RenderJupyterNotebook from 'render-jupyter-notebook-vue'; // vue 3.x 写法
  import example from '../assets/OutputExamples.json';

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
```

### 方法二：调用 Class Notebook 渲染 Notebook

**该使用方法稍微繁琐一点，不过好处是比较灵活。**

在组件中引入`Class Notebook`后，首先需要实例化一个`Notebook`对象，这一步需要传递**notebook 源码的 JSON 数据**，接着就是调用`Notebook.render`方法来渲染出 notebook 的 DOM。最后将 DOM 插入页面即可。

例如：

```js
import { Notebook } from 'render-jupyter-notebook-vue/lib/Notebook/index.umd';

const notebook = new Notebook(this.notebook, false);
const fragment = await notebook.render();
this.$refs.NotebookFragment.appendChild(fragment);
```

## Class Notebook 说明

`Class Notebook`是 RenderJupyterNotebook 组件的核心部分。它实现了**将 notebook 渲染成 HTML**的全部过程。

`Class Notebook`构造函数接收四个参数：

| 参数                      | 类型                             | 默认值                           | 说明                                                   |
| ------------------------- | -------------------------------- | -------------------------------- | ------------------------------------------------------ |
| `source`                  | `JSON Object`                    | -                                | notebook 源码的 JSON 数据                              |
| `trusted`                 | `Boolean`                        | `false`                          | 用于说明当前运行环境是否安全可信，涉及 Script,SVG 渲染 |
| `shouldTypeset`           | `Boolean`                        | `true`                           | 是否对数学公式字符进行 latex 排版                      |
| `markdownParser`          |                                  | `defaultMarkdownParser`          | markdown 渲染工具                                      |
| `mathJaxTypesetterConfig` | `{ url: String, config: String}` | `defaultMathJaxTypesetterConfig` | `MathJaxTypesetter`配置项                              |

> #### 关于`defaultMarkdownParser`
>
> markdown-it 实例。具体如下：
>
> ```js
> import markdown from 'markdown-it';
>
> export default markdown({ html: true, xhtmlOut: true, breaks: true, linkify: true });
> ```
>
> #### 关于`defaultMathJaxTypesetterConfig`
>
> ```js
> const defaultMathJaxTypesetterConfig = {
>   url: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js',
>   config: 'TeX-AMS_HTML-full,Safe'
> };
> ```

### 关于 trusted 参数

`trusted`参数用于指明当前代码运行环境是否安全。当`trusted=true`时，表明当前环境是安全可信的。这时 notebook 中的脚本代码`<script>`和`<svg>`）会被执行。但是，**如果执行的代码中存在安全漏洞，将会是非常危险**。

所以，<font color="red">建议将`trusted`设为`false`</font>。

### 关于 markdownParser 参数

`markdownParser`参数用于向`Class Notebook`传递 markdown 渲染工具。`Class Notebook`已经内置了默认的 markdown 渲染工具`defaultMarkdownParser`。`defaultMarkdownParser`是基于[markdown-it](https://github.com/markdown-it/markdown-it#readme)实现的。

当`defaultMarkdownParser`无法满足您的 markdown 渲染需求时，您就需要自己实现 markdown 渲染工具，然后通过`markdownParser`参数传递给`Class Notebook`，`Class Notebook`将会优先使用您传递过来的 markdown 渲染工具。

> <font color=red>需要注意的是</font>，您提供的 markdown 渲染工具必须提供一个`function render()`。`Class Notebook`渲染时，只会调用`render()`来渲染 markdown。

> 绝大多数情况下，您是不需要传递 markdownParser 参数的。

> **当然，您也可以提交 Pull requests 来帮助我们完善`defaultMarkdownParser`。我们将会非常感谢您！**

### 关于 Notebook.render()

`Notebook.render()`是`Class Notebook`的一个 public 方法。

不接收任何参数，返回一个`Promise`对象。

只有调用该方法，`Class Notebook`才会进行 HTML 渲染。

### 使用说明

`Class Notebook`并不依赖于 vue。可单独引入其他架构项目中。具体用法请查看：[Z-J-wang/render-juypter-notebook-vue (github.com)](https://github.com/Z-J-wang/render-juypter-notebook-vue#方法二调用class-notebook渲染notebook)

### Class Notebook 更多说明

更多有关于`Class Notebook`说明，请查看：[根据 Jupyter-lab 源码实现 notebook（.ipynb）在页面中的渲染\_jupyter 源码](https://blog.csdn.net/weixin_44869002/article/details/129008963)

## Author

- Z-J-wang <https://github.com/Z-J-wang>

## Contact

- 邮箱：<a href="mailto:Jay040030@outlook.com">Jay040030@outlook.com</a>
- QQ: 1356573671

## LICENSE

[MIT](https://opensource.org/licenses/MIT)
