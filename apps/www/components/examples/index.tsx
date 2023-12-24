import { ComponentType, LazyExoticComponent, lazy } from 'react';

type CalendarExample = {
	name: string;
	registryDependencies?: string[];
	component: LazyExoticComponent<ComponentType<any>>;
};

export const CalendarExamples: Record<string, CalendarExample> = {
	'simple': {
		name: 'simple',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/SimpleCalendar')),
	},
	'styled': {
		name: 'styled',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/StyledCalendar')),
	},
	'styled2': {
		name: 'styled2',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/StyledCalendar2')),
	},
	'single': {
		name: 'single',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/single/SingleCalendar')),
	},
	'single2': {
		name: 'single2',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/single/SingleCalendar2')),
	},
	'single3': {
		name: 'single3',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/single/SingleCalendar3')),
	},
};