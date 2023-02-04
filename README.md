# 介绍

RenderJupyterNotebook是一个 vue 组件，实现了：**通过JavaScript还原渲染jupyter notebook**。渲染效果基本可以和JupyterLab的保持一致。这是因为最底层的渲染逻辑是直接引用于JupyterLab并进行了抽离组装。其中核心代码在src/utils/notebook中的`Class Notebook`。

# 使用

> RenderJupyterNotebook组件已经发布到npm。

## 安装render_jupyter_notebook_vue插件

```bsah
npm i render_jupyter_notebook_vue
```

安装好插件后有两种只用方法：

1. 直接调用RenderJupyterNotebook组件最为便捷。
2. 调用 Class Notebook 来自己封装组件

## 方法一：直接引入RenderJupyterNotebook组件

RenderJupyterNotebook组件接收仅接收一个参数：`notebook`。它是notebook源码的JSON对象。

> **notebook源码的JSON对象说明**：
>
> notebook源文件为`.ipynb`（如本项目中提供的案例notebook文件OutputExamples.ipynb）。只需要将`.ipynb`改为`.json`就可以拿到notebook源码的JSON文件。

例如：

```html
<template>
  <div class="home">
    <RenderJupyterNotebook :notebook="notebook" />
  </div>
</template>

<script>
import RenderJupyterNotebook from "@/components/RenderJupyterNotebook";
import example from "@/assets/OutputExamples";

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

## 方法二：调用 Class Notebook 来封装组件

调用`Class Notebook`来封装组件，渲染notebook。稍微繁琐一点点，不过好处是比较灵活。

在成功在组件中引入`Class Notebook`后，首先需要将实例化一个`Notebook`对象，这一步需要传递**notebook源码的JSON对象**，接着就是调用`Notebook.render`方法来渲染出notebook的HTML DOM。最后将DOM插入页面即可。

例如：

```js
const notebook = new Notebook(this.notebook, false);
const fragment = await notebook.render();
this.$refs.NotebookFragment.appendChild(fragment);
```

# Class Notebook说明

`Class Notebook`是RenderJupyterNotebook组件的核心部分。它实现了**将notebook渲染成HTML**的全部过程。

`Class Notebook`构造函数接收四个参数：

| 参数            | 类型      | 默认值                  | 说明                                                         |
| --------------- | --------- | ----------------------- | ------------------------------------------------------------ |
| `source`        | `Object`  | -                       | notebook源码的JSON对象                                       |
| `trusted`       | `Boolean` | `false`                 | 当前渲染字符是安全或者当前运行环境是否可信，涉及Script,SVG渲染 |
| `shouldTypeset` | `Boolean` | `true`                  | 是否对数学公式字符进行latex排版                              |
| markdownParser  |           | `defaultMarkdownParser` | markdown 渲染工具                                            |

## 关于trusted参数

`trusted`参数用于指明当前代码运行环境是否安全。当`trusted=true`时，表面当前环境是安全可信的。这时notebook中脚本代码`<script>`和`<svg>`）会被执行。**如果执行的代码中存在安全漏洞，将会是非常危险**。

所以，<font color="red">强烈建议将`trusted`设为`trusted`</font>。

## 关于markdownParser参数

`markdownParser`参数用于向`Class Notebook`传递markdown渲染工具。`Class Notebook`已经内置的默认的markdown渲染工具`defaultMarkdownParser`。`defaultMarkdownParser`是基于[markdown-it](https://github.com/markdown-it/markdown-it#readme)实现的，实现了markdown基本渲染。

当`defaultMarkdownParser`无法满足您的markdown渲染需求时，您就需要自己实现markdown渲染工具，然后通过`markdownParser`参数传递为`Class Notebook`，`Class Notebook`将会优先使用您传递过来的markdown渲染工具。

> <font color=red>不过需要注意的是</font>，您提供的markdown渲染工具必须提供一个`function render()`。`Class Notebook`渲染时，会调用`render()`来渲染markdown。

> 绝大多数情况下，您是不需要传递markdownParser参数的。

> **当然，您也可取提交 Pull requests 来帮助我们完善`defaultMarkdownParser`。我们将会非常感谢您！**

# 作者

+ Z-J-wang <https://github.com/Z-J-wang>

# 贡献

# LICENSE

[MIT](https://opensource.org/licenses/MIT)
