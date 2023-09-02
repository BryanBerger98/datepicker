import { getDatesInMonthWeek, getNumberOfWeeksInMonth } from './date.util';

export const buildCalendarGrid = (month: number, year: number): Date[][] => {

	const numberOfWeeks = getNumberOfWeeksInMonth(month + 1, year);

	let weekIndex = 1;
	const calendarGrid: Date[][] = [];

	for (let w = weekIndex; w <= numberOfWeeks; w++) {
		const week = getDatesInMonthWeek(w, month + 1, year);
		calendarGrid.push(week);
		weekIndex++;
	}

	return calendarGrid;
};
