interface JupyterSource {
  cells: Array<any>; // Jupyter Notebook cells
}

declare module 'render-jupyter-notebook-vue' {

  interface RenderJupyterNotebookProps {
    notebook: JupyterSource; // Jupyter Notebook object
  }

  export class RenderJupyterNotebook {
    props: RenderJupyterNotebookProps;
  }
}