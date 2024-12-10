import { type JupyterSource } from './notebook'

export { type JupyterSource } from './notebook'

declare module 'render-jupyter-notebook-vue' {

  interface RenderJupyterNotebookProps {
    notebook: JupyterSource; // Jupyter Notebook object
  }

  export class RenderJupyterNotebook {
    props: RenderJupyterNotebookProps;
  }
}