import useCalendar from '@/components/Calendar/useCalendar';
import { addDaysToDate, isInDateRange, isSame, substractDaysToDate } from '@/utils/date.util';
import { isMatch } from '@/utils/modifiers/is-match.util';
import { matcherToArray } from '@/utils/modifiers/matcher-to-array.util';

export const useDay = (dayDate: Date, currentDate: Date) => {
	const { disableOutsideLimit, to, from, selected, mode, max, min, disabled, showOutsideDates, required } = useCalendar();

	const isSelected = () => {
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ start, end ] = selected;
			if (start && end) {
				return isInDateRange(dayDate, {
					from: start,
					to: end, 
				});
			}
			if (!end) {
				return isSame(dayDate, start);
			}
			if (!start) {
				return isSame(dayDate, end);
			}
		} else if (mode === 'multiple' && Array.isArray(selected)) {
			return selected.some((selectedDate) => {
				return selectedDate.getMonth() === dayDate.getMonth() && selectedDate.getDate() === dayDate.getDate() && selectedDate.getFullYear() === dayDate.getFullYear();
			});
		} else if (mode === 'single' && selected && !Array.isArray(selected)) {
			return dayDate.getMonth() === selected.getMonth() && dayDate.getDate() === selected.getDate() && dayDate.getFullYear() === selected.getFullYear();
		}
		return false;
	};

	const isDisabledByModifier = () => {
		if (disabled !== undefined && disabled !== false) {
			return isMatch(dayDate, matcherToArray(disabled));
		}
	};

	const isDisabled = () => {
		if (disableOutsideLimit) {
			if (to && to.getTime() < dayDate.getTime() || from && from.getTime() > dayDate.getTime()) return true;
		}
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ start, end ] = selected;
			if (max && min && min > 2 && isSame(start, end)) {
				if (start && !required && isSame(dayDate, start)) {
					return false;
				}
				const minMinAllowedDate = substractDaysToDate(start, min - 2);
				const minMaxAllowedDate = addDaysToDate(start, min - 2);
				const maxMinAllowedDate = substractDaysToDate(start, max);
				const maxMaxAllowedDate = addDaysToDate(start, max);
				return !isInDateRange(dayDate, {
					from: maxMinAllowedDate,
					to: maxMaxAllowedDate,
				}) || isInDateRange(dayDate, {
					from: minMinAllowedDate,
					to: minMaxAllowedDate,
				});
			}
			if (max && isSame(start, end)) {
				if (start) {
					const minAllowedDate = substractDaysToDate(start, max);
					const maxAllowedDate = addDaysToDate(start, max);
					return !isInDateRange(dayDate, {
						from: minAllowedDate,
						to: maxAllowedDate,
					});
				}
			}
			if (min && min > 2 && isSame(start, end)) {
				if (start && !required && isSame(dayDate, start)) {
					return false;
				}
				if (start) {
					const minAllowedDate = substractDaysToDate(start, min - 2);
					const maxAllowedDate = addDaysToDate(start, min - 2);
					return isInDateRange(dayDate, {
						from: minAllowedDate,
						to: maxAllowedDate,
					});
				}
			}
		}
		return false;
	};

	const isFirst = () => {
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ start ] = selected;
			if (start) {
				return isSame(dayDate, start);
			}
		}
		return false;
	};

	const isLast = () => {
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ , end ] = selected;
			if (end) {
				return isSame(dayDate, end);
			}
		}
		return false;
	};

	const isToday = () => {
		return isSame(dayDate, new Date());
	};

	const isMiddle = () => {
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ start, end ] = selected;
			if (start && end) {
				return isInDateRange(dayDate, {
					from: start,
					to: end,
					behavior: 'exclude',
				});
			}
		}
		return false;
	};

	return {
		isSelected: isSelected(),
		isDisabled: isDisabled() || isDisabledByModifier(),
		isHidden: !showOutsideDates && dayDate.getMonth() !== currentDate.getMonth(),
		isFirst: isFirst(),
		isLast: isLast(),
		isToday: isToday(),
		isMiddle: isMiddle(),
	};
};