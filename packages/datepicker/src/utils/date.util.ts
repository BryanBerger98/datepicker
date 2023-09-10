export const getDateMonth = (date: Date) => date.getMonth() + 1;
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const getWeeksInMonth = (
	year: number,
	month: number,
	weekStartDay: WeekStartDay = 0
): number => {
	const firstDayOfMonth: Dayjs = dayjs().year(year).month(month).date(1);
	const lastDayOfMonth: Dayjs = firstDayOfMonth.endOf('month');
	const startOfWeek: number = firstDayOfMonth.day();
	const daysInMonth: number = lastDayOfMonth.date();
	const daysToAdd: number = (startOfWeek - weekStartDay + 7) % 7;
	const totalDays: number = daysInMonth + daysToAdd;
	const weeksInMonth: number = Math.ceil(totalDays / 7);
	return weeksInMonth;
};

export const getDatesInMonthWeek = (
	weekNumber: number,
	month: number,
	year: number,
	weekStartDay: WeekStartDay = 0
): Dayjs[] => {
	const firstDayOfMonth: Dayjs = dayjs().year(year).month(month).date(1);
	const startDayOfWeek: number = (firstDayOfMonth.day() - weekStartDay + 7) % 7;
	const startDate: Dayjs = firstDayOfMonth.add(weekNumber - 1, 'week').subtract(startDayOfWeek, 'day');
	const weekDates: Dayjs[] = [];

	for (let i = 0; i < 7; i++) {
		const currentDate: Dayjs = startDate.add(i, 'day');
		weekDates.push(currentDate);
	}

	return weekDates;
};

export const isInDateRange = (
	dateToCheck: Date,
	startDate?: Date,
	endDate?: Date
): boolean => {
	const startDateWithoutTime = dayjs(startDate).startOf('day');
	const endDateWithoutTime = dayjs(endDate).startOf('day');
	const dateToCheckWithoutTime = dayjs(dateToCheck).startOf('day');
	return dateToCheckWithoutTime.isBetween(startDateWithoutTime, endDateWithoutTime, 'day', '[]');
};

export const getDateRangeLength = (startDate: Date, endDate: Date): number => {
	const startDateWithoutTime = dayjs(startDate).startOf('day');
	const endDateWithoutTime = dayjs(endDate).startOf('day');
	return endDateWithoutTime.diff(startDateWithoutTime, 'day') + 1;
};

export const isBefore = (dateToCheck: Date, date: Date): boolean => {
	const dateToCheckWithoutTime = dayjs(dateToCheck).startOf('day');
	const dateWithoutTime = dayjs(date).startOf('day');
	return dateToCheckWithoutTime.isBefore(dateWithoutTime, 'day');
};

export const isSame = (dateToCheck: Date, date: Date): boolean => {
	const dateToCheckWithoutTime = dayjs(dateToCheck).startOf('day');
	const dateWithoutTime = dayjs(date).startOf('day');
	return dateToCheckWithoutTime.isSame(dateWithoutTime, 'day');
};

export const isNearestTo = (dateToCheck: Date, date: Date, date2: Date): 'date1' | 'date2' => {
	const dateToCheckWithoutTime = dayjs(dateToCheck).startOf('day');
	const dateWithoutTime = dayjs(date).startOf('day');
	const date2WithoutTime = dayjs(date2).startOf('day');
	const diff1 = Math.abs(dateToCheckWithoutTime.diff(dateWithoutTime, 'day'));
	const diff2 = Math.abs(dateToCheckWithoutTime.diff(date2WithoutTime, 'day'));
	return diff1 < diff2 ? 'date1' : 'date2';
};

export const addDaysToDate = (date: Date, days: number): Date => {
	return dayjs(date).add(days, 'day').toDate();
};

export const substractDaysToDate = (date: Date, days: number): Date => {
	return dayjs(date).subtract(days, 'day').toDate();
};