import { cn } from '@/utils/ui.util';
import { HTMLAttributes } from 'react';
import CalendarWeekDay from './CalendarWeekDay';

type CalendarWeekProps = HTMLAttributes<HTMLTableRowElement> & {
	week: Date[];
	dayClassName?: string;
	currentDate: Date;
};

const CalendarWeek = ({ week, className, dayClassName, currentDate, ...props }: CalendarWeekProps) => {

	return (
		<tr className={ cn('flex w-full mt-2', className) } { ...props }>
			{ week.map((date, index) => (
				<CalendarWeekDay date={ date } key={ index } currentDate={ currentDate } className={ dayClassName } />
			)) }
		</tr>
	);
};

CalendarWeek.displayName = 'CalendarWeek';

export default CalendarWeek;