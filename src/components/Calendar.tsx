import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { cn } from '../utils/ui.util';
import { buildCalendarGrid } from '@/utils/calendar.utils';
import Week from './Week';
import CalendarHeader from './CalendarHeader';
import CalendarHead from './CalendarHead';
import { WeekDay } from '@/utils/day.util';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	onSelectDate?: (date: Date) => void;
	weekStartDay?: WeekDay;
	defaultMonth?: Date;
	defaultSelectedDate?: Date;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
	className,
	onSelectDate,
	defaultSelectedDate = new Date(),
	defaultMonth = new Date(),
	weekStartDay = 'sunday',
	...props
}, ref) => {

	const [ selectedDate, setSelectedDate ] = useState<Date>(defaultSelectedDate);
	const [ currentDate, setCurrentDate ] = useState<Date>(defaultMonth);

	useEffect(() => {
		if (onSelectDate) {
			onSelectDate(selectedDate);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selectedDate ]);

	const handleClickDate = (date: Date) => setSelectedDate(date);

	const handleGoToNextMonth = () => {
		// setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
		setCurrentDate((prevCurrentDate) => {
			const newDate = new Date(prevCurrentDate.getFullYear(), prevCurrentDate.getMonth(), prevCurrentDate.getDate());
			newDate.setMonth(prevCurrentDate.getMonth() + 1);
			return newDate;
		});
	};

	const handleGoToPreviousMonth = () => {
		// setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
		setCurrentDate((prevCurrentDate) => {
			const newDate = new Date(prevCurrentDate.getFullYear(), prevCurrentDate.getMonth(), prevCurrentDate.getDate());
			newDate.setMonth(prevCurrentDate.getMonth() - 1);
			console.log(newDate);
			return newDate;
		});
	};

	return (
		<>
			<div className={ cn('flex flex-col space-y-4 rounded-md border p-3', className) } { ...props } ref={ref}>
			<CalendarHeader
				currentDate={ currentDate }
				onGoToNextMonth={ handleGoToNextMonth }
				onGoToPreviousMonth={ handleGoToPreviousMonth }
			/>
			<table className="w-full border-collapse space-y-1" role="grid">
				<CalendarHead weekStartDay={ weekStartDay } />
				<tbody>
					{
						buildCalendarGrid(currentDate.getMonth(), currentDate.getFullYear(), { weekStartDay })
							.map((week, index) => (
								<Week
									key={ index }
									week={ week }
									onClickDate={ handleClickDate }
									selectedDate={ selectedDate }
									currentDate={ currentDate }
								/>
							))
					}
				</tbody>
			</table>
		</div>
		</>
	);
});

Calendar.displayName = 'Calendar';

export default Calendar;