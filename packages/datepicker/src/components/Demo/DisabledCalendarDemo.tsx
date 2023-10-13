import { ChevronLeft, ChevronRight } from 'lucide-react';

import Calendar from '../Calendar';

const DisabledCalendarDemo = () => {

	return (
		<Calendar
			className="rounded-md border p-3"
			disabled={ [
				'monday',
				'thursday',
				new Date(2023, 9, 1),
				new Date('2023-09-06'),
			] }
			weekStartDay="monday"
		>
			<Calendar.Header className="relative">
				<Calendar.Title />
				<div className="space-x-1 flex items-center">
					<Calendar.NavButton
						className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
						direction="previous"
					>
						<ChevronLeft className="h-4 w-4" />
					</Calendar.NavButton>
					<Calendar.NavButton
						className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
						direction="next"
					>
						<ChevronRight className="h-4 w-4" />
					</Calendar.NavButton>
				</div>
			</Calendar.Header>
			<Calendar.Content>
				<Calendar.Head />
				<Calendar.Grid />
			</Calendar.Content>
		</Calendar>
	);
};

export default DisabledCalendarDemo;