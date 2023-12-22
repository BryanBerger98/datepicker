import { HTMLAttributes, PropsWithChildren } from 'react';

type CalendarProps = HTMLAttributes<HTMLDivElement>;

const CalendarHeader = ({ children, ...props }: PropsWithChildren<CalendarProps>) => {	
	return (
		<div
			style={ {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: '1rem',
				paddingBottom: '1rem',
			} }
			{ ...props }
		>
			{ children }
		</div>
	);
};

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;