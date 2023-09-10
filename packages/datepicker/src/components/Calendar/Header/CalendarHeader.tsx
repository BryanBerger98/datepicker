import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/ui.util';

type CalendarProps = HTMLAttributes<HTMLDivElement>;

const CalendarHeader = ({ children, className, ...props }: PropsWithChildren<CalendarProps>) => {	
	return (
		<div className={ cn('flex justify-center pt-1 items-center', className) } { ...props }>
			{ children }
		</div>
	);
};

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader