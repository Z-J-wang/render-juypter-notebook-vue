interface JupyterSource {
  cells: Array<any>; // Jupyter Notebook cells
}

declare module 'render-jupyter-notebook-vue' {

  interface RenderJuypterNotebookProps {
    notebook: JupyterSource; // Jupyter Notebook object
  }

  export class RenderJuypterNotebook {
    props: RenderJuypterNotebookProps;
  }
}