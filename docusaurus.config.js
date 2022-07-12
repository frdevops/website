// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DevOps 故居',
  tagline: 'Dinosaurs are cool',
  url: 'https://frdevops.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DevOpsFR', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarTitle: '近期文章',
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
        title: 'DevOps 故居',
        logo: {
          alt: 'DevOps 故居',
          src: 'img/logo.svg',
        },
        items: [
          
          {
            to: '/tags', 
            label: '标签', 
            position: 'right'
          },
          {
            type: 'dropdown',
            label: '分类',
            position: 'right',
            items: [
              {
                label: 'Kubernetes',
                to: '/tags/facebook'
              },
              {
                label: 'Docusaurus',
                to: '/tags/docusaurus'
              },
            ],
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: '教程',
          },
          {
            href: 'https://github.com/frdevops',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
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
                label: 'GitHub',
                href: 'https://github.com/frdevops',
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
};

module.exports = config;
