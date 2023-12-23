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
			title: 'Calendars',
			items: [
				{
					title: 'Simple',
					href: '/docs/calendar/simple',
					items: [],
				},
				{
					title: 'Multiple months',
					href: '/docs/calendar/multiple-months',
					items: [],
				},
				{
					title: 'Multiple dates selection',
					href: '/docs/calendar/mutiple-dates-selection',
					items: [],
				},
				{
					title: 'Range selection',
					href: '/docs/calendar/range-selection',
					items: [],
				},
				{
					title: 'Controlled calendar component',
					href: '/docs/calendar/controlled-calendar-component',
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
	],
};