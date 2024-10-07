import { describe, expect, it } from 'vitest';
import example from '../src/assets/OutputExamples';
import { Notebook } from '../src/utils';
import markdown from 'markdown-it';

describe('Class notebook 单元测试', () => {
  it('正常实例化', async () => {
    let fragment = undefined;
    const notebook = new Notebook(example, false);
    fragment = await notebook.render();
    expect(fragment).not.toBe(undefined); // fragment 不等于undefined，说明Notebook渲染成功
  });

  it('不传参', async () => {
    expect(() => new Notebook()).toThrowError('The Notebook is Error! Source is required!');
  });

  it('Source 参数类型错误', async () => {
    expect(() => new Notebook({})).toThrowError('The Notebook is Error! Cells attribute is required and is Array!');
  });

  it('参数 trusted 和 shouldTypeset 测试', async () => {
    let fragment = undefined;
    const notebook = new Notebook(example, true, false);
    fragment = await notebook.render();
    expect(fragment).not.toBe(undefined); // fragment 不等于undefined，说明Notebook渲染成功
  });

  it('自定义 markdown 渲染器', async () => {
    let fragment = undefined;
    const notebook = new Notebook(example, false, false, markdown());
    fragment = await notebook.render();
    expect(fragment).not.toBe(undefined); // fragment 不等于undefined，说明Notebook渲染成功
  });

  it('mathJaxTypesetterConfig 传参测试', async () => {
    let fragment = undefined;
    const notebook = new Notebook(example, false, true, null, {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js',
      config: 'TeX-AMS_HTML-full,Safe'
    });
    fragment = await notebook.render();
    expect(fragment).not.toBe(undefined); // fragment 不等于undefined，说明Notebook渲染成功
  });
});
