import { HTMLAttributes } from 'react';

import { buildCalendarGrid } from '@/utils/calendar.utils';

import useCalendar from '../useCalendar';

import CalendarWeek from './CalendarWeek';

type CalendarGridProps = HTMLAttributes<HTMLTableSectionElement> & {
	monthIndex?: number
	classNames?: {
		day?: string;
		week?: string;
	};
}

const CalendarGrid = ({ monthIndex = 0, classNames, ...props }: CalendarGridProps) => {

	const { currentDate, weekStartDay } = useCalendar();

	const date = new Date(currentDate);
	date.setMonth(date.getMonth() + monthIndex);

	return (
		<tbody
			{ ...props }
			role="rowgroup"
		>
			{
				buildCalendarGrid(date.getMonth(), date.getFullYear(), { weekStartDay })
					.map((week, index) => (
						<CalendarWeek
							key={ index }
							className={ classNames?.week }
							classNames={ { day: classNames?.day } }
							currentDate={ date }
							week={ week }
						/>
					))
			}
		</tbody>
	);
};

CalendarGrid.displayName = 'CalendarGrid';

export default CalendarGrid;