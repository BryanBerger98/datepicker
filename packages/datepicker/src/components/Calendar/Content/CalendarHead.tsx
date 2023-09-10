import { HTMLAttributes } from 'react';

import { WeekDay } from '@/utils/day.util';
import { cn } from '@/utils/ui.util';

import useCalendar from '../useCalendar';

const daysOfWeek = [
	{
		name: 'Sunday',
		shortName: 'Su', 
	},
	{
		name: 'Monday',
		shortName: 'Mo', 
	},
	{
		name: 'Tuesday',
		shortName: 'Tu', 
	},
	{
		name: 'Wednesday',
		shortName: 'We', 
	},
	{
		name: 'Thursday',
		shortName: 'Th', 
	},
	{
		name: 'Friday',
		shortName: 'Fr', 
	},
	{
		name: 'Saturday',
		shortName: 'Sa', 
	},
] as const;

type CalendarHeadProps = HTMLAttributes<HTMLTableSectionElement> & {
	rowClassName?: string;
	cellClassName?: string;
};

const CalendarHead = ({ className, rowClassName, cellClassName, ...props }: CalendarHeadProps) => {

	const { weekStartDay } = useCalendar();

	const rearrangeDaysOfWeek = (startDay: WeekDay) => {
		const startIndex = daysOfWeek.findIndex((day) => day.name.toLowerCase() === startDay);
		return [ ...daysOfWeek.slice(startIndex), ...daysOfWeek.slice(0, startIndex) ];
	};

	const arrangedDaysOfWeek = rearrangeDaysOfWeek(weekStartDay);

	return (
		<thead
			className={ className }
			{ ...props }
		>
			<tr className={ cn('flex', rowClassName) }>
				{
					arrangedDaysOfWeek.map((day) => {
						return (
							<th
								key={ day.name }
								aria-label={ day.name }
								className={ cn('w-9 font-normal text-[0.8rem]', cellClassName) }
								scope="col"
							>
								{ day.shortName }
							</th>
						);
					})
				}
			</tr>
		</thead>
	);
};

CalendarHead.displayName = 'CalendarHead';

export default CalendarHead;