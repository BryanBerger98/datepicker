import { WeekDay } from '@/utils/day.util';
import { cn } from '@/utils/ui.util';
import { ForwardRefExoticComponent, HTMLAttributes, PropsWithoutRef, RefAttributes, createContext, forwardRef, useCallback, useMemo, useState } from 'react';
import CalendarHeader from './Header/CalendarHeader';
import CalendarTitle from './Header/CalendarTitle';
import CalendarNavButton from './Header/CalendarNavButton';
import CalendarContent from './Content/CalendarContent';
import CalendarHead from './Content/CalendarHead';
import CalendarGrid from './Content/CalendarGrid';

type CalendarContextValue = {
	onSelectDate: (date: Date) => void;
	selectedDate: Date;
	currentDate: Date;
	onChangeCurrentDate: (date: Date) => void;
	from?: Date;
	to?: Date;
	disableOutsideLimit?: boolean;
	disableNavigation?: boolean;
	onGoToNextMonth: (skip?: number) => () => void;
	onGoToPreviousMonth: (skip?: number) => () => void;
	weekStartDay: WeekDay;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

type CalendarProps = HTMLAttributes<HTMLDivElement> & {
	defaultSelectedDate?: Date;
	defaultMonth?: Date;
	selectedDate?: Date;
	onSelectDate?: (date: Date) => void;
	from?: Date;
	to?: Date;
	disableOutsideLimit?: boolean;
	disableNavigation?: boolean;
	weekStartDay?: WeekDay;
};

type CalendarStatic = {
	Header: typeof CalendarHeader;
	Title: typeof CalendarTitle;
	NavButton: typeof CalendarNavButton;
	Content: typeof CalendarContent;
	Head: typeof CalendarHead;
	Grid: typeof CalendarGrid;
}

type CalendarComponent = ForwardRefExoticComponent<PropsWithoutRef<CalendarProps> & RefAttributes<HTMLDivElement>> & CalendarStatic;

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
	children,
	defaultMonth = new Date(),
	defaultSelectedDate,
	selectedDate: selectedDateFromProps,
	onSelectDate,
	from,
	to,
	disableOutsideLimit = false,
	disableNavigation = false,
	weekStartDay = 'sunday',
	className,
	...props
}, ref) => {

	const isControlled = typeof selectedDateFromProps != 'undefined';

	const [ internalSelectedDate, setInternalSelectedDate ] = useState<Date>(defaultSelectedDate || new Date());
	const [ currentDate, setCurrentDate ] = useState<Date>(defaultMonth);

	const selectedDate = isControlled ? selectedDateFromProps : internalSelectedDate;

	const handleSelectDate = useCallback((date: Date) => {
		if (onSelectDate) {
			onSelectDate(date);
		}
		if (!isControlled) {
			setInternalSelectedDate(date)
		}
	}, [ isControlled, onSelectDate ]);

	const handleChangeCurrentDate = useCallback((date: Date) => {
		setCurrentDate(date);
	}, []);

	const handleGoToNextMonth = useCallback((skip = 0) => () => {
		if (disableNavigation) return;
		setCurrentDate((prevCurrentDate) => {
			if (to && to.getMonth() === prevCurrentDate.getMonth() && to.getFullYear() === prevCurrentDate.getFullYear()) {
				return prevCurrentDate;
			}
			const newDate = new Date(prevCurrentDate.getFullYear(), prevCurrentDate.getMonth(), prevCurrentDate.getDate());
			newDate.setMonth(prevCurrentDate.getMonth() + (skip + 1));
			return newDate;
		});
	}, [ disableNavigation, to ]);

	const handleGoToPreviousMonth = useCallback((skip = 0) => () => {
		if (disableNavigation) return;
		setCurrentDate((prevCurrentDate) => {
			if (from && from.getMonth() === prevCurrentDate.getMonth() && from.getFullYear() === prevCurrentDate.getFullYear()) {
				return prevCurrentDate;
			}
			const newDate = new Date(prevCurrentDate.getFullYear(), prevCurrentDate.getMonth(), prevCurrentDate.getDate());
			newDate.setMonth(prevCurrentDate.getMonth() - (skip + 1));
			return newDate;
		});
	}, [ disableNavigation, from ]);

	const contextValue: CalendarContextValue = useMemo(() => ({
		onSelectDate: handleSelectDate,
		selectedDate,
		currentDate,
		onChangeCurrentDate: handleChangeCurrentDate,
		from,
		to,
		disableOutsideLimit,
		disableNavigation,
		onGoToNextMonth: handleGoToNextMonth,
		onGoToPreviousMonth: handleGoToPreviousMonth,
		weekStartDay,
	}), [
		handleSelectDate,
		selectedDate,
		currentDate,
		handleChangeCurrentDate,
		from,
		to,
		disableOutsideLimit,
		disableNavigation,
		handleGoToNextMonth,
		handleGoToPreviousMonth,
		weekStartDay,
	]);

	return (
		<CalendarContext.Provider value={ contextValue }>
			<div
				className={ cn('flex flex-col space-y-4', className) }
				{ ...props }
				ref={ ref }
			>
				{ children }
			</div>
		</CalendarContext.Provider>
	);
}) as CalendarComponent;

Calendar.displayName = 'Calendar';

Calendar.Header = CalendarHeader;
Calendar.Title = CalendarTitle;
Calendar.NavButton = CalendarNavButton;
Calendar.Content = CalendarContent;
Calendar.Head = CalendarHead;
Calendar.Grid = CalendarGrid;

export default Calendar;