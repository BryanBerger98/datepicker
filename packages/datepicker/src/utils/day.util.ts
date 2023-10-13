export const WeekDaysIndexMap = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
} as const;

export const WeekDaysList = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

export type WeekDay = keyof typeof WeekDaysIndexMap;

export const WeekDaysMap: {
	[ key: string]: WeekDay;
} = {
	0: 'sunday',
	1: 'monday',
	2: 'tuesday',
	3: 'wednesday',
	4: 'thursday',
	5: 'friday',
	6: 'saturday',
};

export const getWeekDayFromDate = (date: Date): WeekDay => {
	return WeekDaysMap[ date.getDay() ];
};