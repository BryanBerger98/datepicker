import { cn } from '@/utils/ui.util';
import { TdHTMLAttributes } from 'react';
import useCalendar from '../useCalendar';

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
			return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
		} else if (mode === 'multiple' && Array.isArray(selected)) {
			return selected.some((selectedDate) => {
				return selectedDate.getMonth() === date.getMonth() && selectedDate.getDate() === date.getDate() && selectedDate.getFullYear() === date.getFullYear();
			});
		} else if (mode === 'single' && !Array.isArray(selected)) {
			return dayDate.getMonth() === selected.getMonth() && dayDate.getDate() === selected.getDate() && dayDate.getFullYear() === selected.getFullYear()
		}
		return false;
	};

	// console.log(selected);

	return (
		<td
			onClick={ handleClickDate(dayDate) }
			aria-selected={ isSelected(dayDate) }
			aria-disabled={ disableOutsideLimit && ((to && to.getTime() < dayDate.getTime()) || (from && from.getTime() > dayDate.getTime())) }
			className={
				cn('text-center relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 h-9 w-9 p-0 font-normal aria-selected:opacity-100', {
					'bg-slate-900': isSelected(dayDate),
					'text-slate-300': dayDate.getMonth() !== currentDate.getMonth(),
					'text-white': isSelected(dayDate),
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