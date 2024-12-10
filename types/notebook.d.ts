export interface JupyterSource {
  cells: Array<any>; // Jupyter Notebook cells
}

declare module 'render-jupyter-notebook-vue/lib/Notebook/index.umd' {
  export class Notebook {
    public notebookHTML: string;
    constructor(notebook: JupyterSource, trusted: Boolean, shouldTypeset: Boolean, markdownParser: any, mathJaxTypesetterConfig: any);

    render(): void;
  }
}