const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { transformer } = require('../lib/helper');

function createRemoteContentTransformer(path) {
  return function remoteContentTransformer(c, data) {
    const d = transformer(c, data);

    return d.replace(/(\(\.\/(.*?)\))/gi, `(${path}/$2)`);
  };
}

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'My Site',
    tagline: 'Dinosaurs are cool',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    plugins: [
      [
        require.resolve('../lib/index.js'),
        {
          type: 'docs',
          cleanup: true,
          contents: [
            {
              file: 'sample-nodejs.md',
              url: 'https://raw.githubusercontent.com/crossid/sample-nodejs/main/README.md',
              header: `:::note
This content is from the README file of https://github.com/crossid/sample-nodejs.
:::`,
              meta: {
                id: 'sample-nodejs',
                sidebar_label: 'Sample-Nodejs',
                hide_title: true,
              },
              transform: createRemoteContentTransformer(
                'https://github.com/crossid/sample-nodejs/tree/main',
              ),
            },
            {
              file: 'sample-monorepo.md',
              url: 'https://raw.githubusercontent.com/crossid/sample-monorepo/main/README.md',
              header: `:::note
This content is from the README file of https://github.com/crossid/sample-monorepo.
:::`,
              meta: {
                id: 'sample-monorepo',
                sidebar_label: 'Sample-Monorepo',
                hide_title: true,
              },
              transform: createRemoteContentTransformer(
                'https://github.com/crossid/sample-monorepo/tree/main',
              ),
            },
          ],
        },
      ],
    ],
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            editUrl:
              'https://github.com/facebook/docusaurus/edit/main/website/',
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl:
              'https://github.com/facebook/docusaurus/edit/main/website/blog/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'My Site',
          logo: {
            alt: 'My Site Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'intro',
              position: 'left',
              label: 'Tutorial',
            },
            { to: '/blog', label: 'Blog', position: 'left' },
            {
              href: 'https://github.com/facebook/docusaurus',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Tutorial',
                  to: '/docs/intro',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                },
                {
                  label: 'Discord',
                  href: 'https://discordapp.com/invite/docusaurus',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/docusaurus',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'Blog',
                  to: '/blog',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/facebook/docusaurus',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
