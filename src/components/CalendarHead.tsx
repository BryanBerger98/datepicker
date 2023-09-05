import { WeekDay } from '@/utils/day.util';

type CalendarHeadProps = {
	weekStartDay?: WeekDay;
};

const daysOfWeek = [
	{ name: 'Sunday', shortName: 'Su' },
	{ name: 'Monday', shortName: 'Mo' },
	{ name: 'Tuesday', shortName: 'Tu' },
	{ name: 'Wednesday', shortName: 'We' },
	{ name: 'Thursday', shortName: 'Th' },
	{ name: 'Friday', shortName: 'Fr' },
	{ name: 'Saturday', shortName: 'Sa' },
] as const;

const CalendarHead = ({ weekStartDay = 'sunday' }: CalendarHeadProps) => {

	const rearrangeDaysOfWeek = (startDay: WeekDay) => {
		const startIndex = daysOfWeek.findIndex((day) => day.name.toLowerCase() === startDay);
		return [...daysOfWeek.slice(startIndex), ...daysOfWeek.slice(0, startIndex)];
	};

	const arrangedDaysOfWeek = rearrangeDaysOfWeek(weekStartDay);

	return (
		<thead>
			<tr className="flex">
				{
					arrangedDaysOfWeek.map((day) => {
						return (
							<th
								key={ day.name }
								scope="col"
								className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
								aria-label={ day.name }
							>
								{ day.shortName }
							</th>
						)
					})
				}
			</tr>
		</thead>
	)
};

export default CalendarHead;