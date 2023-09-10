import { HTMLAttributes } from 'react';

import { cn } from '@/utils/ui.util';

import CalendarWeekDay from './CalendarWeekDay';

type CalendarWeekProps = HTMLAttributes<HTMLTableRowElement> & {
	week: Date[];
	dayClassName?: string;
	currentDate: Date;
};

const CalendarWeek = ({ week, className, dayClassName, currentDate, ...props }: CalendarWeekProps) => {

	return (
		<tr
			className={ cn('flex w-full mt-2', className) }
			{ ...props }
		>
			{ week.map((date, index) => (
				<CalendarWeekDay
					key={ index }
					className={ dayClassName }
					currentDate={ currentDate }
					date={ date }
				/>
			)) }
		</tr>
	);
};

CalendarWeek.displayName = 'CalendarWeek';

export default CalendarWeek;