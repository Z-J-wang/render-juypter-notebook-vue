import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import RenderJupyterNotebook from '../src/components/RenderJupyterNotebook.vue';
import example from '../src/assets/OutputExamples';

describe('notebook渲染相关测试', () => {
  it('RenderJupyterNotebook 组件测试', () => {
    const wrapper = mount(RenderJupyterNotebook, {
      props: { notebook: example }
    });
    expect(wrapper.classes()).toContain('notebook-fragment');
  });
});
