import { cn } from '@/utils/ui.util';
import { HTMLAttributes, ReactNode } from 'react';
import useCalendar from '../useCalendar';

type CalendarTitleProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode;
};

const CalendarTitle = ({ children, className, ...props }: CalendarTitleProps) => {

	const { currentDate } = useCalendar();

	return (
		<div className={ cn('text-sm font-medium', className)} role="presentation" aria-live='polite' { ...props }>
			{ children ? children : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) }
		</div>
	);
};

CalendarTitle.displayName = 'CalendarTitle';

export default CalendarTitle;