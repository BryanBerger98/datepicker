import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarHeaderProps = {
	currentDate: Date;
	onGoToPreviousMonth: () => void;
	onGoToNextMonth: () => void;
};

const CalendarHeader = ({ currentDate, onGoToNextMonth, onGoToPreviousMonth }: CalendarHeaderProps) => {

	return (
		<div className="flex justify-center pt-1 relative items-center">
				<div className="text-sm font-medium" role="presentation" aria-live='polite'>
					{ currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) }
				</div>
				<div className="space-x-1 flex items-center">
					<button
						onClick={ onGoToPreviousMonth }
						name="previous-month"
						aria-label="Go to previous month"
						className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
						type="button"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<button
						onClick={ onGoToNextMonth }
						name="next-month"
						aria-label="Go to next month"
						className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
						type="button"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</div>
	)
};

export default CalendarHeader;