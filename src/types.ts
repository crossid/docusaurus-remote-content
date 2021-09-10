export interface Content {
  file: string;
  url: string;
  meta: Record<string, any>;
  header: string;
  /**
   * transform fetched data, the result is the final written file.
   */
  transform?: (c: Content, data: string) => string;
}

export interface PluginOptions {
  /**
   * Delete local content upon post build.
   */
  cleanup?: boolean;

  /**
   * Fetch in runtime, if false use CLI.
   */
  liveFetch?: boolean;

  /**
   * Plugin instance type
   */
  type: 'docs' | 'blog';

  /**
   * The remote contents to fetch
   */
  contents: Content[] | (() => Content[]);
}
