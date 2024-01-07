'use client';

import { Calendar } from '@bryanberger/datepicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const isSameDay = (date1: Date, date2: Date) => {
	return date1.getDate() === date2.getDate()
		&& date1.getMonth() === date2.getMonth()
		&& date1.getFullYear() === date2.getFullYear();
};

const MultipleCalendar4 = () => {

	const today = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);

	const [ selected, setSelected ] = useState<Date[]>([ today, tomorrow ]);

	const handleSelect = (date: Date) => {
		setSelected((prevSelected) => {
			const dateIndex = prevSelected.findIndex((prevDate) => isSameDay(prevDate, date));
			const isDateAlreadySelected = dateIndex !== -1;
			if (isDateAlreadySelected) {
				return prevSelected.filter((_, i) => i !== dateIndex);
			}
			return [ ...prevSelected, date ];
		});
	};

	return (
		<div>
			<Calendar
				className="border rounded-md p-3"
				defaultSelected={ [ today, tomorrow ] }
				mode="multiple"
				selected={ selected }
				onSelect={ handleSelect }
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
			<p>Selected dates:</p>
			<ul className="list-disc pl-6">
				{
					selected.map((date) => (
						<li key={ date.toISOString() }>{ date.toLocaleDateString() }</li>
					))
				}
			</ul>
		</div>
	);
};

export default MultipleCalendar4;