import { TdHTMLAttributes } from 'react';

import { useDay } from '@/hooks/useDay';

import useCalendar from '../useCalendar';


type CalendarWeekDayProps = TdHTMLAttributes<HTMLTableCellElement> & {
	date: Date;
	currentDate: Date;
};

const CalendarWeekDay = ({ date: dayDate, className, currentDate, ...props }: CalendarWeekDayProps) => {

	const { onSelect, mode } = useCalendar();

	const { isSelected, isDisabled, isHidden, isToday, isFirst, isLast } = useDay(dayDate, currentDate);

	const handleClickDate = (date: Date) => () => onSelect(date);

	return (
		<td
			aria-disabled={ isDisabled || isHidden }
			aria-selected={ isSelected }
			className={ className }
			data-calendar-mode={ mode }
			data-is-disabled={ isDisabled }
			data-is-first={ isFirst }
			data-is-hidden={ isHidden }
			data-is-last={ isLast }
			data-is-selected={ isSelected }
			data-is-today={ isToday }
			style={ {
				textAlign: 'center',
				position: 'relative',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: isDisabled || isHidden ? 'none' : 'auto',
				fontSize: '0.878rem',
				lineHeight: '1.25rem',
				height: '2.25rem',
				width: '2.25rem',
				padding: 0,
				fontWeight: 400,
				backgroundColor: isSelected ? '#0f172a' : 'transparent',
				color: isSelected ? '#fff' : dayDate.getMonth() !== currentDate.getMonth() ? '#cbd5e1' : '#0f172a',
				opacity: isHidden ? 0 : isDisabled ? 0.5 : 1,
			} }
			{ ...props }
			role="button"
			onClick={ handleClickDate(dayDate) }
		>
			{ dayDate.getDate() }
		</td>
	);
};

CalendarWeekDay.displayName = 'CalendarWeekDay';

export default CalendarWeekDay;