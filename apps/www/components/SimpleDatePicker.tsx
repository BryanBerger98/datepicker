'use client';

import { Calendar } from '@bryanberger/datepicker';
import { Label } from '@radix-ui/react-label';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SimpleDatePicker = () => {

	return (
		<div className="space-y-4">
			<Label>Simple calendar</Label>
			<Calendar
				className="rounded-md border p-3"
				defaultSelected={ new Date() }
				weekStartDay="monday"
				showOutsideDates
			>
				<Calendar.Header className="relative w-full">
					<Calendar.Title className="text-sm font-medium" />
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
					<Calendar.Grid
						classNames={ { day: 'h-9 w-9 text-center text-sm p-0 relative data-[is-selected=false]:bg-accent/50 data-[is-selected=true]:bg-accent data-[is-first=true]:rounded-l-md data-[is-last=true]:rounded-r-md focus-within:relative focus-within:z-20' } }
					/>
				</Calendar.Content>
			</Calendar>
		</div>
	);
};

export default SimpleDatePicker;