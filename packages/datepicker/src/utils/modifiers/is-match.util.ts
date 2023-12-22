import { Matcher, isArrayOfWeekDaysType, isDateAfterType, isDateBeforeType, isDateInterval, isDateRange, isWeekDayType } from '@/types/Matchers';

import { isAfter, isBefore, isDate, isInDateRange, isSame } from '../date.util';
import { getWeekDayFromDate } from '../day.util';

/** Returns true if `value` is an array of valid dates. */
const isArrayOfDates = (value: unknown): value is Date[] => {
	return Array.isArray(value) && value.every(isDate);
};

/**
 * Returns whether a day matches against at least one of the given Matchers.
 *
 * ```
 * const day = new Date(2022, 5, 19);
 * const matcher1: DateRange = {
 *    from: new Date(2021, 12, 21),
 *    to: new Date(2021, 12, 30)
 * }
 * const matcher2: DateRange = {
 *    from: new Date(2022, 5, 1),
 *    to: new Date(2022, 5, 23)
 * }
 *
 * const isMatch(day, [matcher1, matcher2]); // true, since day is in the matcher1 range.
 * ```
 * */
export const isMatch = (day: Date, matchers: Matcher[]): boolean => {
	return matchers.some((matcher: Matcher) => {
		if (typeof matcher === 'boolean') {
			return matcher;
		}
		if (isDate(matcher)) {
			return isSame(day, matcher);
		}
		if (isArrayOfDates(matcher)) {
			return matcher.includes(day);
		}
		if (isDateRange(matcher)) {
			return isInDateRange(day, {
				from: matcher.from,
				to: matcher.to,
			});
		}
		if (isWeekDayType(matcher)) {
			return matcher === getWeekDayFromDate(day);
		}
		if (isArrayOfWeekDaysType(matcher)) {
			return matcher.includes(getWeekDayFromDate(day));
		}
		if (isDateInterval(matcher)) {
			const isDayBefore = isBefore(day, matcher.before);
			const isDayAfter = isAfter(day, matcher.after);
			const isClosedInterval = isAfter(matcher.after, matcher.before);
			if (isClosedInterval) {
				return isDayAfter && isDayBefore;
			} else {
				return isDayBefore || isDayAfter;
			}
		}
		if (isDateAfterType(matcher)) {
			return isAfter(day, matcher.after);
		}
		if (isDateBeforeType(matcher)) {
			return isBefore(day, matcher.before);
		}
		if (typeof matcher === 'function') {
			return matcher(day);
		}
		return false;
	});
};
