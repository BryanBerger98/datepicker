import { MainNavItem, SidebarNavItem } from '@/types/nav.type';

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: 'Documentation',
			href: '/docs',
		},
		// {
		// 	title: 'Examples',
		// 	href: '/examples',
		// },
		{
			title: 'GitHub',
			href: 'https://github.com/BryanBerger98/datepicker',
			external: true,
			icon: 'github',
		},
		{
			title: 'Threads',
			href: 'https://www.threads.net/@bryanberger.dev',
			external: true,
			icon: 'threads',
		},
	],
	sidebarNav: [
		{
			title: 'Getting Started',
			items: [
				{
					title: 'Introduction',
					href: '/docs',
					items: [],
				},
				{
					title: 'Installation',
					href: '/docs/installation',
					items: [],
				},
				{
					title: 'Composition',
					href: '/docs/composition',
					items: [],
				},
				{
					title: 'Styling',
					href: '/docs/styling',
					items: [],
				},
				{
					title: 'Configuration',
					href: '/docs/configuration',
					items: [],
				},
				{
					title: 'Changelog',
					href: '/docs/changelog',
					items: [],
				},
			],
		},
		{
			title: 'Selecting dates',
			items: [
				{
					title: 'Single date',
					href: '/docs/selecting-dates/single-date',
					items: [],
				},
				{
					title: 'Multiple dates',
					href: '/docs/selecting-dates/multiple-dates',
					items: [],
				},
				{
					title: 'Range of dates',
					href: '/docs/selecting-dates/range-of-dates',
					items: [],
				},
			],
		},
		{
			title: 'Helpers',
			items: [
				{
					title: 'Disabled',
					href: '/docs/helpers/disabled',
					items: [],
				},
				{
					title: 'Required',
					href: '/docs/helpers/required',
					items: [],
				},
				{
					title: 'Localization',
					href: '/docs/helpers/localization',
					items: [],
					disabled: true,
				},
				
			],
		},
		{
			title: 'Guides',
			items: [
				{
					title: 'Multiple months',
					href: '/docs/guides/multiple-months',
					items: [],
				},
			],
		},
	],
};