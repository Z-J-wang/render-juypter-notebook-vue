import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import RenderJupyterNotebook from '../src/components/RenderJupyterNotebook.vue';
import example from '../src/assets/OutputExamples';
import { Notebook } from '../src/utils';

describe('notebook渲染相关测试', () => {
  it('RenderJupyterNotebook 组件测试', () => {
    const wrapper = mount(RenderJupyterNotebook, {
      props: { notebook: example }
    });
    expect(wrapper.classes()).toContain('notebook-fragment');
  });

  it('Class Notebook 测试', async () => {
    let fragment = undefined;
    const notebook = new Notebook(example, false);
    fragment = await notebook.render();
    expect(fragment).not.toBe(undefined); // fragment 不等于undefined，说明Notebook渲染成功
  });
});
