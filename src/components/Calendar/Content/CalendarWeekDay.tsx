import { cn } from '@/utils/ui.util';
import { TdHTMLAttributes } from 'react';
import useCalendar from '../useCalendar';

type CalendarWeekDayProps = TdHTMLAttributes<HTMLTableCellElement> & {
	date: Date;
	buttonClassName?: string;
};

const CalendarWeekDay = ({ date, className, buttonClassName, ...props }: CalendarWeekDayProps) => {

	const { onSelectDate, disableOutsideLimit, to, from, selectedDate, currentDate } = useCalendar();

	const handleClickDate = (date: Date) => () => onSelectDate(date);

	return (
		<td
			className={ cn('text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20', className) }
			{ ...props }
		>
			<button
				onClick={ handleClickDate(date) }
				aria-selected={ date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear() }
				disabled={ disableOutsideLimit && ((to && to.getTime() < date.getTime()) || (from && from.getTime() > date.getTime())) }
				className={
					cn('inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 font-normal aria-selected:opacity-100', {
						'bg-slate-900': date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear(),
						'text-slate-300': date.getMonth() !== currentDate.getMonth(),
						'text-white': date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear(),
					}, buttonClassName)
				}
			>
				{ date.getDate() }
			</button>
		</td>
	);
};

CalendarWeekDay.displayName = 'CalendarWeekDay';

export default CalendarWeekDay;