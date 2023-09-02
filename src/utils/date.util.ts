export const getDateMonth = (date: Date) => date.getMonth() + 1;

export const getLastDatesOfDaysOfPreviousMonth = (month: number, year: number) => {
	const lastDayOfPreviousMonth = new Date(year, month - 2, 0).getDate();
	const lastDaysOfPreviousMonth = [];
	for (let i = 0; i < new Date(year, month - 1, 1).getDay(); i++) {
		lastDaysOfPreviousMonth.push(new Date(year, month - 2, lastDayOfPreviousMonth - i));
	}
	return lastDaysOfPreviousMonth.reverse();
};

// OK
export const getNumberOfWeeksInMonth = (month: number, year: number) => {
	const firstDateOfMonth = new Date(year, month - 1, 1); // FIRST DATE OF MONTH
	const firstDayOfMonth = firstDateOfMonth.getDay();
	const lastDateOfMonth = new Date(year, month, 0); // LAST DATE OF MONTH
	const lastDayOfMonth = lastDateOfMonth.getDay();
	const numberOfWeeksInMonth = Math.ceil((firstDayOfMonth + lastDateOfMonth.getDate() + (6 - lastDayOfMonth)) / 7);
	return numberOfWeeksInMonth;
};

export const getDatesInMonthWeek = (week: number, month: number, year: number): Date[] => {
	const firstDayOfMonthDate = new Date(year, month - 1, 1);
	const firstDayOfMonth = firstDayOfMonthDate.getDay();
	const firstDateOfMonth = firstDayOfMonthDate.getDate();
	// const lastDateOfMonth = new Date(year, month, 0).getDate();
	const lastDayOfMonth = new Date(year, month, 0).getDay();
	const lastDatesOfPreviousMonth = getLastDatesOfDaysOfPreviousMonth(month, year);
	const datesInMonthWeek = [];
	const numberOfWeeksInMonth = getNumberOfWeeksInMonth(month, year);
	for (let i = 0; i < 7; i++) {
		// IF WEEK IS 1 AND INDEX IS LESS THAN FIRST DAY OF MONTH
		if (week === 1 && i < firstDayOfMonth) {
			// ADD LAST DATES OF PREVIOUS MONTH
			datesInMonthWeek.push(lastDatesOfPreviousMonth[i]);
			// ELSE IF WEEK IS 5 AND INDEX IS GREATER THAN LAST DAY OF MONTH
		} else if (week === numberOfWeeksInMonth && i > lastDayOfMonth) {
			// ADD FIRST DATES OF NEXT MONTH
			datesInMonthWeek.push(new Date(year, month, i - lastDayOfMonth));
		} else {
			// ADD DATES IN MONTH
			datesInMonthWeek.push(new Date(year, month - 1, firstDateOfMonth + (week - 1) * 7 + i - firstDayOfMonth));
		}
	}
	return datesInMonthWeek.filter(date => date);
};