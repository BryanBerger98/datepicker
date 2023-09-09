import { ChevronLeft, ChevronRight } from 'lucide-react';
import Calendar from '../Calendar';

const MultiMonthsCalendarDemo = () => {

	return (
		<Calendar weekStartDay="monday" className="rounded-md border space-y-0 flex-row gap-4 p-3">
			<div className="flex flex-col space-y-4">
				<Calendar.Header className="relative">
					<Calendar.Title />
					<div className="space-x-1 flex items-center">
						<Calendar.NavButton skip={ 1 } direction="previous" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1">
							<ChevronLeft className="h-4 w-4" />
						</Calendar.NavButton>
					</div>
				</Calendar.Header>
				<Calendar.Content>
					<Calendar.Head />
					<Calendar.Grid />
				</Calendar.Content>
			</div>
			<div className="flex flex-col space-y-4">
				<Calendar.Header className="relative">
					<Calendar.Title monthIndex={ 1 } />
					<div className="space-x-1 flex items-center">
						<Calendar.NavButton skip={ 1 } direction="next" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1">
							<ChevronRight className="h-4 w-4" />
						</Calendar.NavButton>
					</div>
				</Calendar.Header>
				<Calendar.Content>
					<Calendar.Head />
					<Calendar.Grid monthIndex={ 1 } />
				</Calendar.Content>
			</div>
		</Calendar>
	);
};

export default MultiMonthsCalendarDemo