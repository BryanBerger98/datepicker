import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/ui.util';

import useCalendar from '../useCalendar';

type CalendarTitleProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode;
	monthIndex?: number;
};

const CalendarTitle = ({ children, className, monthIndex = 0, ...props }: CalendarTitleProps) => {

	const { currentDate } = useCalendar();

	const date = new Date(currentDate);
	date.setMonth(date.getMonth() + monthIndex);

	return (
		<div
			aria-live="polite"
			className={ cn('text-sm font-medium', className) }
			role="presentation"
			{ ...props }
		>
			{ children ? children : date.toLocaleString('default', {
				month: 'long',
				year: 'numeric', 
			}) }
		</div>
	);
};

CalendarTitle.displayName = 'CalendarTitle';

export default CalendarTitle;