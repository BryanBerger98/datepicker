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
	'multiple': {
		name: 'multiple',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/multiple/MultipleCalendar')),
	},
	'multiple2': {
		name: 'multiple2',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/multiple/MultipleCalendar2')),
	},
	'multiple3': {
		name: 'multiple3',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/multiple/MultipleCalendar3')),
	},
	'multiple4': {
		name: 'multiple4',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/multiple/MultipleCalendar4')),
	},
	'range': {
		name: 'range',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/range/RangeCalendar')),
	},
	'range2': {
		name: 'range2',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/range/RangeCalendar2')),
	},
	'range3': {
		name: 'range3',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/range/RangeCalendar3')),
	},
	'range4': {
		name: 'range4',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/range/RangeCalendar4')),
	},
	'disabled': {
		name: 'disabled',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/disabled/DisabledCalendar')),
	},
	'disabledDates': {
		name: 'disabledDates',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/disabled/DisabledDatesCalendar')),
	},
	'disabledDatesInterval': {
		name: 'disabledDatesInterval',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/disabled/DisabledDatesIntervalCalendar')),
	},
	'disabledWeekDays': {
		name: 'disabledWeekDays',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/disabled/DisabledWeekDaysCalendar')),
	},
	'required': {
		name: 'required',
		registryDependencies: undefined,
		component: lazy(() => import('@/components/examples/RequiredCalendar')),
	},
};