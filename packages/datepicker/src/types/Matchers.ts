import { WeekDay, WeekDaysList } from '@/utils/day.util';

/** A matcher to match a day falling before the specified date, with the date not included. */
export type DateBefore = {
	before: Date;
};

/** A matcher to match a day falling after the specified date, with the date not included. */
export type DateAfter = {
	after: Date;
};

/** A matcher to match a day falling before and/or after two dates, where the dates are not included. */
export type DateInterval = {
	before: Date;
	after: Date;
};

/** A matcher to match a range of dates. The range can be open. Differently from {@link DateInterval}, the dates here are included. */
export type DateRange = {
	from: Date | undefined;
	to?: Date | undefined;
};

export type Matcher = boolean | ((date: Date) => boolean) | Date | Date[] | DateBefore | DateAfter | DateInterval | DateRange | WeekDay | WeekDay[];

/** Returns true if `matcher` is of type {@link DateInterval}. */
export const isDateInterval = (matcher: unknown): matcher is DateInterval => {
	return Boolean(
		matcher &&
			typeof matcher === 'object' &&
			'before' in matcher &&
			'after' in matcher
	);
};
  
/** Returns true if `value` is a {@link DateRange} type. */
export const isDateRange = (value: unknown): value is DateRange => {
	return Boolean(value && typeof value === 'object' && 'from' in value);
};
  
/** Returns true if `value` is of type {@link DateAfter}. */
export const isDateAfterType = (value: unknown): value is DateAfter => {
	return Boolean(value && typeof value === 'object' && 'after' in value);
};
  
/** Returns true if `value` is of type {@link DateBefore}. */
export const isDateBeforeType = (value: unknown): value is DateBefore => {
	return Boolean(value && typeof value === 'object' && 'before' in value);
};

/**Returns true if `value` is a {@link WeekDay} type. */
export const isWeekDayType = (value: unknown): value is WeekDay => {
	return Boolean(value && typeof value === 'string' && WeekDaysList.includes(value));
};

/**Returns true if `value` is an array of {@link WeekDay} type. */
export const isArrayOfWeekDaysType = (value: unknown): value is WeekDay[] => {
	return Boolean(value && Array.isArray(value) && value.every(item => WeekDaysList.includes(item)));
};