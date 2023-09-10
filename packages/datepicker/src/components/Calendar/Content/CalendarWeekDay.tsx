import { cn } from '@/utils/ui.util';
import { TdHTMLAttributes } from 'react';
import useCalendar from '../useCalendar';
import { addDaysToDate, isInDateRange, isSame, substractDaysToDate } from '@/utils/date.util';

type CalendarWeekDayProps = TdHTMLAttributes<HTMLTableCellElement> & {
	date: Date;
	currentDate: Date;
};

const CalendarWeekDay = ({ date: dayDate, className, currentDate, ...props }: CalendarWeekDayProps) => {

	const { onSelect, disableOutsideLimit, to, from, selected, mode, max, min } = useCalendar();

	const handleClickDate = (date: Date) => () => onSelect(date);

	const isSelected = (date: Date) => {
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ start, end ] = selected;
			if (start && end) {
				return isInDateRange(date, start, end);
			}
			if (!end) {
				return isSame(date, start);
			}
			if (!start) {
				return isSame(date, end);
			}
		} else if (mode === 'multiple' && Array.isArray(selected)) {
			return selected.some((selectedDate) => {
				return selectedDate.getMonth() === date.getMonth() && selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear();
			});
		} else if (mode === 'single' && !Array.isArray(selected)) {
			return dayDate.getMonth() === selected.getMonth() && dayDate.getDate() === selected.getDate() && dayDate.getFullYear() === selected.getFullYear()
		}
		return false;
	};

	const isDisabled = (date: Date) => {
		if (disableOutsideLimit) {
			if (to && to.getTime() < date.getTime() || from && from.getTime() > date.getTime()) return true;
		}
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ start, end ] = selected;
			if (max && min && min > 2 && isSame(start, end)) {
				const minMinAllowedDate = substractDaysToDate(start, min - 2);
				const minMaxAllowedDate = addDaysToDate(start, min - 2);
				const maxMinAllowedDate = substractDaysToDate(start, max);
				const maxMaxAllowedDate = addDaysToDate(start, max);
				return !isInDateRange(date, maxMinAllowedDate, maxMaxAllowedDate) || isInDateRange(date, minMinAllowedDate, minMaxAllowedDate); // No good
			}
			if (max && isSame(start, end)) {
				if (start) {
					const minAllowedDate = substractDaysToDate(start, max);
					const maxAllowedDate = addDaysToDate(start, max)
					return !isInDateRange(date, minAllowedDate, maxAllowedDate);
				}
			}
			if (min && min > 2 && isSame(start, end)) {
				if (start) {
					const minAllowedDate = substractDaysToDate(start, min - 2);
					const maxAllowedDate = addDaysToDate(start, min - 2)
					return isInDateRange(date, minAllowedDate, maxAllowedDate);
				}
			}
		}
		return false;
	};

	return (
		<td
			onClick={ handleClickDate(dayDate) }
			aria-selected={ isSelected(dayDate) }
			aria-disabled={ isDisabled(dayDate) }
			className={
				cn('text-center relative focus-within:relative focus-within:z-20 inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 h-9 w-9 p-0 font-normal aria-selected:opacity-100', {
					'bg-slate-900': isSelected(dayDate),
					'text-slate-300': dayDate.getMonth() !== currentDate.getMonth(),
					'text-white': isSelected(dayDate),
					'rounded-l-md': mode === 'range' && Array.isArray(selected) ? isSame(dayDate, selected[0]) : isSelected(dayDate),
					'rounded-r-md': mode === 'range' && Array.isArray(selected) ? isSame(dayDate, selected[1]) : isSelected(dayDate),
				}, className)
			}
			{ ...props }
			role="button"
		>
			{ dayDate.getDate() }
		</td>
	);
};

CalendarWeekDay.displayName = 'CalendarWeekDay';

export default CalendarWeekDay;