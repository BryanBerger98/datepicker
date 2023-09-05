export const getDateMonth = (date: Date) => date.getMonth() + 1;
import dayjs, { Dayjs } from 'dayjs';

type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Dimanche, 1=Lundi, 2=Mardi, ..., 6=Samedi

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