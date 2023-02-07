# 介绍

RenderJupyterNotebook是一个 vue 组件，实现了：**通过JavaScript还原渲染jupyter notebook**。渲染效果基本和JupyterLab的保持一致。这是因为最底层的渲染逻辑是直接引用于JupyterLab并进行了抽离组装。其中核心代码在[src/utils/notebook](https://github.com/Z-J-wang/render-juypter-notebook-vue/tree/master/src/utils/notebook)中的`Class Notebook`。

# 使用

> RenderJupyterNotebook组件已经发布到npm。链接：[render-jupyter-notebook-vue - npm (npmjs.com)](https://www.npmjs.com/package/render-jupyter-notebook-vue)

## 安装render-jupyter-notebook-vue插件

```bash
npm i render-jupyter-notebook-vue
```

安装好插件后，有两种使用方法：

1. 项目中直接引入[RenderJupyterNotebook](https://github.com/Z-J-wang/render-juypter-notebook-vue/blob/master/src/components/RenderJupyterNotebook.vue)组件最为便捷。
2. 调用Class Notebook渲染Notebook

## 方法一：直接引入RenderJupyterNotebook组件

RenderJupyterNotebook组件仅接收一个参数：`notebook`。它是notebook源码的JSON数据。

> **notebook源码的JSON数据说明**：
>
> notebook源文件为`.ipynb`（如本项目中提供的案例notebook文件OutputExamples.ipynb）。只需要将`.ipynb`后缀改为`.json`就可以拿到notebook源码的JSON数据。

例如：

```html
<template>
  <div class="home">
    <RenderJupyterNotebook :notebook="notebook" />
  </div>
</template>

<script>
import RenderJupyterNotebook from "@/components/RenderJupyterNotebook";
import example from "@/assets/OutputExamples.json";

export default {
  name: "HomeView",
  components: { RenderJupyterNotebook },
  data() {
    return {
      notebook: example,
    };
  },
};
</script>
```

## 方法二：调用Class Notebook渲染Notebook

**该使用方法稍微繁琐一点，不过好处是比较灵活。**

在组件中引入`Class Notebook`后，首先需要实例化一个`Notebook`对象，这一步需要传递**notebook源码的JSON数据**，接着就是调用`Notebook.render`方法来渲染出notebook的DOM。最后将DOM插入页面即可。

例如：

```js
const notebook = new Notebook(this.notebook, false);
const fragment = await notebook.render();
this.$refs.NotebookFragment.appendChild(fragment);
```

# Class Notebook说明

`Class Notebook`是RenderJupyterNotebook组件的核心部分。它实现了**将notebook渲染成HTML**的全部过程。

`Class Notebook`构造函数接收四个参数：

| 参数            | 类型          | 默认值                  | 说明                                                 |
| --------------- | ------------- | ----------------------- | ---------------------------------------------------- |
| `source`        | `JSON Object` | -                       | notebook源码的JSON数据                               |
| `trusted`       | `Boolean`     | `false`                 | 用于说明当前运行环境是否安全可信，涉及Script,SVG渲染 |
| `shouldTypeset` | `Boolean`     | `true`                  | 是否对数学公式字符进行latex排版                      |
| markdownParser  |               | `defaultMarkdownParser` | markdown 渲染工具                                    |

## 关于trusted参数

`trusted`参数用于指明当前代码运行环境是否安全。当`trusted=true`时，表明当前环境是安全可信的。这时notebook中的脚本代码`<script>`和`<svg>`）会被执行。但是，**如果执行的代码中存在安全漏洞，将会是非常危险**。

所以，<font color="red">建议将`trusted`设为`false`</font>。


## 关于markdownParser参数

`markdownParser`参数用于向`Class Notebook`传递markdown渲染工具。`Class Notebook`已经内置了默认的markdown渲染工具`defaultMarkdownParser`。`defaultMarkdownParser`是基于[markdown-it](https://github.com/markdown-it/markdown-it#readme)实现的。

当`defaultMarkdownParser`无法满足您的markdown渲染需求时，您就需要自己实现markdown渲染工具，然后通过`markdownParser`参数传递给`Class Notebook`，`Class Notebook`将会优先使用您传递过来的markdown渲染工具。

> <font color=red>需要注意的是</font>，您提供的markdown渲染工具必须提供一个`function render()`。`Class Notebook`渲染时，只会会调用`render()`来渲染markdown。

> 绝大多数情况下，您是不需要传递markdownParser参数的。

> **当然，您也可以提交 Pull requests 来帮助我们完善`defaultMarkdownParser`。我们将会非常感谢您！**

## 关于 Notebook.render()

`Notebook.render()`是`Class Notebook`的一个public方法。

不接收任何参数，返回一个`Promise`对象。

只有调用该方法，`Class Notebook`才会进行HTML渲染。

## 使用说明

`Class Notebook`并不依赖于vue。可单独引入其他架构项目。

# Author

+ Z-J-wang <https://github.com/Z-J-wang>

# LICENSE

[MIT](https://opensource.org/licenses/MIT)
