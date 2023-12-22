import { ButtonHTMLAttributes } from 'react';

import useCalendar from '../useCalendar';

type CalendarNavButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	direction: 'previous' | 'next';
	skip?: number;
};

const CalendarNavButton = ({ children, direction, skip = 0, ...props }: CalendarNavButtonProps) => {

	const { currentDate, to, from, onGoToNextMonth, onGoToPreviousMonth, disableNavigation } = useCalendar();

	const disabledStatus = direction === 'previous' ?
		from && from.getMonth() === currentDate.getMonth() && from.getFullYear() === currentDate.getFullYear()
		: to && to.getMonth() === currentDate.getMonth() && to.getFullYear() === currentDate.getFullYear();

	if (disableNavigation) return null;

	return (
		<button
			aria-label={ direction === 'previous' ? 'Go to previous month' : 'Go to next month' }
			disabled={ disabledStatus }
			name="previous-month"
			type="button"
			onClick={ direction === 'previous' ? onGoToPreviousMonth(skip) : onGoToNextMonth(skip) }
			{ ...props }
		>
			{ children }
			{ !children && (direction === 'previous' ? 'Prev' : 'Next') }
		</button>
	);
};

CalendarNavButton.displayName = 'CalendarNavButton';

export default CalendarNavButton;