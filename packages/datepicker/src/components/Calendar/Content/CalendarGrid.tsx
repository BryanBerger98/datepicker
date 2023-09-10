import { buildCalendarGrid } from '@/utils/calendar.utils';
import useCalendar from '../useCalendar';
import { HTMLAttributes } from 'react';
import CalendarWeek from './CalendarWeek';

type CalendarGridProps = HTMLAttributes<HTMLTableSectionElement> & {
	monthIndex?: number
	weekClassName?: string;
	dayClassName?: string;
}

const CalendarGrid = ({ monthIndex = 0, weekClassName, dayClassName, ...props }: CalendarGridProps) => {

	const { currentDate, weekStartDay } = useCalendar();

	const date = new Date(currentDate);
	date.setMonth(date.getMonth() + monthIndex);

	return (
		<tbody { ...props }>
			{
				buildCalendarGrid(date.getMonth(), date.getFullYear(), { weekStartDay })
				.map((week, index) => (
					<CalendarWeek
						week={ week }
						key={ index }
						className={ weekClassName }
						dayClassName={ dayClassName }
						currentDate={ date }
					/>
				))
			}
		</tbody>
	);
};

CalendarGrid.displayName = 'CalendarGrid';

export default CalendarGrid;