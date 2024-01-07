'use client';

import { Calendar } from '@bryanberger/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MultipleCalendar2 = () => {

	const today = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);

	return (
		<Calendar
			className="border rounded-md p-3"
			defaultSelected={ [ today, tomorrow ] }
			mode="multiple"
		>
			<Calendar.Header className="!justify-between !w-full pl-2">
				<Calendar.Title />
				<div className="space-x-1 flex items-center">
					<Calendar.NavButton direction="previous">
						<ChevronLeft />
					</Calendar.NavButton>
					<Calendar.NavButton direction="next" >
						<ChevronRight />
					</Calendar.NavButton>
				</div>
			</Calendar.Header>
			<Calendar.Content>
				<Calendar.Head />
				<Calendar.Grid
					classNames={ { day: 'h-9 w-9 text-center data-[is-selected=true]:bg-slate-900 data-[is-first=true]:rounded-l-md data-[is-last=true]:rounded-r-md' } }
				/>
			</Calendar.Content>
		</Calendar>
	);
};

export default MultipleCalendar2;