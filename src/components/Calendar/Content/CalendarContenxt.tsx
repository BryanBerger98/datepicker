import { cn } from '@/utils/ui.util';
import { TableHTMLAttributes } from 'react';

type CalendarContentProps = TableHTMLAttributes<HTMLTableElement>;

const CalendarContent = ({ children, className, role = 'grid', ...props }: CalendarContentProps) => {

	return (
		<table className={ cn('w-full border-collapse space-y-1', className) } role={ role } { ...props }>
			{ children }
		</table>
	)
};

CalendarContent.displayName = 'CalendarContent';

export default CalendarContent;