import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { cn } from '../utils/ui.util';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildCalendarGrid } from '@/utils/calendar.utils';
import Week from './Week';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	onSelectDate?: (date: Date) => void;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({ className, onSelectDate, ...props }, ref) => {

	const [ selectedDate, setSelectedDate ] = useState<Date>(new Date());
	const [ currentDate, setCurrentDate ] = useState<Date>(selectedDate);

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
		<div className={ cn('flex flex-col space-y-4 rounded-md border p-3', className) } { ...props } ref={ref}>
			<div className="flex justify-center pt-1 relative items-center">
				<div className="text-sm font-medium" role="presentation" aria-live='polite'>
					{ currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) }

				</div>
				<div className="space-x-1 flex items-center">
					<button
						onClick={ handleGoToPreviousMonth }
						name="previous-month"
						aria-label="Go to previous month"
						className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
						type="button"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<button
						onClick={ handleGoToNextMonth }
						name="next-month"
						aria-label="Go to next month"
						className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
						type="button"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</div>
			<table className="w-full border-collapse space-y-1" role="grid">
				<thead>
					<tr className="flex">
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Sunday">Su</th>
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Monday">Mo</th>
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Tuesday">Tu</th>
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Wednesday">We</th>
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Thursday">Th</th>
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Friday">Fr</th>
						<th scope="col" className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]" aria-label="Saturday">Sa</th>
					</tr>
				</thead>
				<tbody>
					{
						buildCalendarGrid(currentDate.getMonth(), currentDate.getFullYear())
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
	);
});

Calendar.displayName = 'Calendar';

export default Calendar;