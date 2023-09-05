import { buildCalendarGrid } from '@/utils/calendar.utils';
import useCalendar from '../useCalendar';
import { HTMLAttributes, ReactNode } from 'react';

type CalendarGridProps = HTMLAttributes<HTMLTableSectionElement> & {
	renderWeeks: ({ week, index }: { week: Date[], index: number }) => ReactNode;
}

const CalendarGrid = ({ renderWeeks, ...props }: CalendarGridProps) => {

	const { currentDate, weekStartDay } = useCalendar();

	return (
		<tbody { ...props }>
			{
				buildCalendarGrid(currentDate.getMonth(), currentDate.getFullYear(), { weekStartDay })
					.map((week, index) => renderWeeks({ week, index }))
			}
		</tbody>
	);
};

CalendarGrid.displayName = 'CalendarGrid';

export default CalendarGrid;