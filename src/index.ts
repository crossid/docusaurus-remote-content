import { join } from 'path';
import { writeFileSync, unlinkSync } from 'fs';
// import { sync as del } from 'rimraf';
import { Content, PluginOptions } from './types';
import axios from 'axios';
import {
  LoadContext,
  OptionValidationContext,
  ValidationResult,
  Plugin,
} from '@docusaurus/types';
import { PluginOptionSchema } from './pluginOptionSchema';
import chalk from 'chalk';
import milli from 'pretty-ms';
import { transformer as defaultTransformer, transformer } from './helper';

export { transformer };

export default function pluginSitemap(
  context: LoadContext,
  options: PluginOptions,
): Plugin<void> {
  const { type, contents, liveFetch, cleanup } = options;

  function getContents(): Content[] {
    const a: Content[] = [];

    (
      (typeof contents == 'function'
        ? contents.call(context.siteConfig)
        : contents) as Content[]
    ).forEach((d) => {
      a.push(d);
    });

    return a;
  }

  async function fetchContent(): Promise<void> {
    const c = getContents();

    for (let i = 0; i < c.length; i++) {
      const trans = c[i].transform ? c[i].transform : defaultTransformer;
      writeFileSync(
        join(getTargetDir(), c[i].file),
        trans!(c[i], await (await axios({ url: c[i].url })).data),
      );
    }
  }

  async function cleanContent(): Promise<void> {
    const c = getContents();

    for (let i = 0; i < c.length; i++) {
      unlinkSync(join(getTargetDir(), c[i].file));
    }
  }

  function getTargetDir(): string {
    if (type === 'docs') {
      return join(context.siteDir, 'docs');
    }

    if (type === 'blog') {
      return join(context.siteDir, 'blog');
    }

    return '';
  }

  return {
    name: `docusaurus-plugin-remote-content-${type}`,

    async loadContent(): Promise<void> {
      if (liveFetch) {
        return await fetchContent();
      }
    },

    async postBuild(): Promise<void> {
      if (cleanup) {
        return await cleanContent();
      }
    },

    extendCli(cli): void {
      const t = type;
      cli
        .command(`fetch-remote-${t}`)
        .description(`Fetch the remote ${t} data.`)
        .action(() => {
          (async () => {
            const startTime = new Date();
            await fetchContent();
            console.log(
              chalk`{green Fetched remote content in} {white ${milli(
                (new Date() as any) - (startTime as any),
              )}}`,
            );
          })();
        });

      cli
        .command(`clean-remote-${t}`)
        .description(`Wiped local copy of the remote ${t} content.`)
        .action(() => {
          (async () => {
            const startTime = new Date();
            await cleanContent();
            console.log(
              chalk`{green Successfully removed content in} {white ${milli(
                (new Date() as any) - (startTime as any),
              )}}`,
            );
          })();
        });
    },
  };
}

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<PluginOptions>): ValidationResult<PluginOptions> {
  const validatedOptions = validate(PluginOptionSchema, options);
  return validatedOptions;
}
