import { HTMLAttributes } from 'react';

import CalendarWeekDay from './CalendarWeekDay';

type CalendarWeekProps = HTMLAttributes<HTMLTableRowElement> & {
	week: Date[];
	classNames?: {
		day?: string;
	};
	currentDate: Date;
};

const CalendarWeek = ({ week, currentDate, classNames, ...props }: CalendarWeekProps) => {

	return (
		<tr
			style={ {
				display: 'flex',
				width: '100%',
				marginTop: '0.5rem',
			} }
			{ ...props }
		>
			{ week.map((date, index) => (
				<CalendarWeekDay
					key={ index }
					className={ classNames?.day }
					currentDate={ currentDate }
					date={ date }
				/>
			)) }
		</tr>
	);
};

CalendarWeek.displayName = 'CalendarWeek';

export default CalendarWeek;