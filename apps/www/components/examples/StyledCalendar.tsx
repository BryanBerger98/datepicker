import { Calendar } from '@bryanberger/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StyledCalendar = () => {

	return (
		<Calendar
			className="border rounded-md p-3"
		>
			<Calendar.Header className="relative w-full">
				<Calendar.Title className="text-sm font-medium" />
				<div className="space-x-1 flex items-center">
					<Calendar.NavButton
						className="inline-flex items-center justify-center rounded-md text-sm font-medium h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
						direction="previous"
					>
						<ChevronLeft className="h-4 w-4" />
					</Calendar.NavButton>
					<Calendar.NavButton
						className="inline-flex items-center justify-center rounded-md text-sm font-medium h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
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

export default StyledCalendar;