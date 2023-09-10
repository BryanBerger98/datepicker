import { getDatesInMonthWeek, getWeeksInMonth } from './date.util';
import { WeekDay, WeekDaysIndexMap } from './day.util';


type CalendarGridOptions = {
	weekStartDay?: WeekDay;
};

export const buildCalendarGrid = (month: number, year: number, options?: CalendarGridOptions): Date[][] => {
	const { weekStartDay = 'sunday' } = options || {};

	const numberOfWeeks = getWeeksInMonth(year, month, WeekDaysIndexMap[ weekStartDay ]);

	let weekIndex = 1;
	const calendarGrid: Date[][] = [];

	for (let w = weekIndex; w <= numberOfWeeks; w++) {
		const week = getDatesInMonthWeek(w, month, year, WeekDaysIndexMap[ weekStartDay ]);
		calendarGrid.push(week.map(d => d.toDate()));
		weekIndex++;
	}

	return calendarGrid;
};
