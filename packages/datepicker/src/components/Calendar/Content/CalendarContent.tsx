import { TableHTMLAttributes } from 'react';

type CalendarContentProps = TableHTMLAttributes<HTMLTableElement>;

const CalendarContent = ({ children, role = 'grid', ...props }: CalendarContentProps) => {

	return (
		<table
			role={ role }
			style={ {
				borderCollapse: 'collapse',
				width: '100%',
			} }
			{ ...props }
		>
			{ children }
		</table>
	);
};

CalendarContent.displayName = 'CalendarContent';

export default CalendarContent;