import { cn } from '@/utils/ui.util';

type WeekProps = {
	week: Date[];
	onClickDate: (date: Date) => void;
	selectedDate: Date;
	currentDate: Date;
	disableOutsideLimit?: boolean;
	to?: Date;
	from?: Date;
}

const Week = ({ week, onClickDate, selectedDate, currentDate, disableOutsideLimit, to, from }: WeekProps) => {

	const handleClickDate = (date: Date) => () => onClickDate(date);

	return (
		<tr className="flex w-full mt-2">
			{ week.map((date, index) => (
				<td
					key={ index }
					className={ cn('text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20', {
						
					}) }
				>
					<button
						onClick={ handleClickDate(date) }
						disabled={ disableOutsideLimit && ((to && to.getTime() < date.getTime()) || (from && from.getTime() > date.getTime())) }
						className={
							cn('inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 font-normal aria-selected:opacity-100', {
								'bg-slate-900': date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear(),
								'text-slate-300': date.getMonth() !== currentDate.getMonth(),
								'text-white': date.getMonth() === selectedDate.getMonth() && date.getDate() === selectedDate.getDate() && date.getFullYear() === selectedDate.getFullYear(),
							})
						}
					>
						{ date.getDate() }
					</button>
				</td>
			)) }
		</tr>
	);
};

export default Week;