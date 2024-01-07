'use client';

import { Calendar } from '@bryanberger/datepicker';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const isSameDay = (date1: Date, date2: Date) => {
	return date1.getDate() === date2.getDate()
		&& date1.getMonth() === date2.getMonth()
		&& date1.getFullYear() === date2.getFullYear();
};

const isBefore = (dateToCheck: Date, date: Date): boolean => {
	const dateToCheckWithoutTime = dayjs(dateToCheck).startOf('day');
	const dateWithoutTime = dayjs(date).startOf('day');
	return dateToCheckWithoutTime.isBefore(dateWithoutTime, 'day');
};

const RangeCalendar4 = () => {

	const today = new Date();
	const inTwoDays = new Date();
	inTwoDays.setDate(today.getDate() + 2);

	const [ selected, setSelected ] = useState<[ Date, Date ]>([ today, inTwoDays ]);
	const [ start, end ] = selected;

	const dateRangeLastSelected = useRef<'start' | 'end'>('start');

	const handleSelect = (date: Date) => {
		setSelected((prevSelected) => {
			const [ prevStartDate ] = prevSelected;
			if (dateRangeLastSelected.current === 'start') {
				dateRangeLastSelected.current = 'end';
				return [ date, date ];
			}
			if (dateRangeLastSelected.current === 'end') {
				dateRangeLastSelected.current = 'start';
				if (isSameDay(prevStartDate, date)) {
					return [ date, date ];
				}
				if (isBefore(prevStartDate, date)) {
					return [ prevStartDate, date ];
				} else {
					return [ date, prevStartDate || date ];
				}
			}
			return [ date, date ];
		});
	};

	return (
		<div>
			<Calendar
				className="border rounded-md p-3"
				defaultSelected={ [ today, inTwoDays ] }
				mode="range"
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
			<p>Selected start date: { start.toLocaleDateString() }</p>
			<p>Selected end date: { end.toLocaleDateString() }</p>
		</div>
	);
};

export default RangeCalendar4;