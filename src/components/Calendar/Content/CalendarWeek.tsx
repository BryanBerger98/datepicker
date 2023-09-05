import { cn } from '@/utils/ui.util';
import { HTMLAttributes, ReactNode } from 'react';
import useCalendar from '../useCalendar';

type CalendarWeekProps = HTMLAttributes<HTMLTableRowElement> & {
	week: Date[];
	renderWeekDays: ({ date, index, selectedDate, currentDate }: { date: Date, index: number, selectedDate: Date, currentDate: Date }) => ReactNode;
};

const CalendarWeek = ({ week, className, renderWeekDays, ...props }: CalendarWeekProps) => {

	const { selectedDate, currentDate } = useCalendar();

	return (
		<tr className={ cn('flex w-full mt-2', className) } { ...props }>
			{ week.map((date, index) => renderWeekDays({ date, index, selectedDate, currentDate })) }
		</tr>
	);
};

CalendarWeek.displayName = 'CalendarWeek';

export default CalendarWeek;