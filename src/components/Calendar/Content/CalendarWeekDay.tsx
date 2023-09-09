import { cn } from '@/utils/ui.util';
import { TdHTMLAttributes } from 'react';
import useCalendar from '../useCalendar';
import { isInDateRange, isSame } from '@/utils/date.util';

type CalendarWeekDayProps = TdHTMLAttributes<HTMLTableCellElement> & {
	date: Date;
	currentDate: Date;
};

const CalendarWeekDay = ({ date: dayDate, className, currentDate, ...props }: CalendarWeekDayProps) => {

	const { onSelect, disableOutsideLimit, to, from, selected, mode } = useCalendar();

	const handleClickDate = (date: Date) => () => onSelect(date);

	const isSelected = (date: Date) => {
		if (mode === 'range' && Array.isArray(selected) && selected.length === 2) {
			const [ from, to ] = selected;
			if (from && to) {
				return isInDateRange(date, from, to);
			}
			if (!to) {
				return isSame(date, from);
			}
			if (!from) {
				return isSame(date, to);
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

	return (
		<td
			onClick={ handleClickDate(dayDate) }
			aria-selected={ isSelected(dayDate) }
			aria-disabled={ disableOutsideLimit && ((to && to.getTime() < dayDate.getTime()) || (from && from.getTime() > dayDate.getTime())) }
			className={
				cn('text-center relative first:aria-selected:rounded-l-md last:aria-selected:rounded-r-md focus-within:relative focus-within:z-20 inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 h-9 w-9 p-0 font-normal aria-selected:opacity-100', {
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