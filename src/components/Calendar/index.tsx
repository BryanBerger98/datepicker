import { WeekDay } from '@/utils/day.util';
import { cn } from '@/utils/ui.util';
import { ForwardRefExoticComponent, ForwardedRef, HTMLAttributes, PropsWithoutRef, RefAttributes, createContext, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import CalendarHeader from './Header/CalendarHeader';
import CalendarTitle from './Header/CalendarTitle';
import CalendarNavButton from './Header/CalendarNavButton';
import CalendarContent from './Content/CalendarContent';
import CalendarHead from './Content/CalendarHead';
import CalendarGrid from './Content/CalendarGrid';

type CalendarMode = 'single' | 'multiple' | 'range';
type DateSelection<T extends CalendarMode> = T extends 'single' ? Date : T extends 'multiple' ? Date[] : [ Date, Date ];
type DateSelectedProp<T extends CalendarMode> = DateSelection<T> | undefined;
type SelectDateHandler<T extends CalendarMode, S extends DateSelectedProp<T>> = (value: S extends undefined ? DateSelection<T> : Date) => void;

type CalendarContextValue<T extends CalendarMode> = {
	onSelect: (value: Date) => void;
	mode: CalendarMode;
	selected: DateSelection<T>;
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

export const CalendarContext = createContext<CalendarContextValue<CalendarMode> | null>(null);

type CalendarProps<T extends CalendarMode, S extends DateSelectedProp<T>> = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
	mode?: CalendarMode;
	defaultSelected?: DateSelection<T>;
	defaultMonth?: Date;
	selected?: S;
	onSelect?: SelectDateHandler<T, S>;
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

type CalendarComponent<T extends CalendarMode, S extends DateSelectedProp<T>> = ForwardRefExoticComponent<PropsWithoutRef<CalendarProps<T, S>> & RefAttributes<HTMLDivElement>> & CalendarStatic;

const CalendarInner = <T extends CalendarMode, S extends DateSelectedProp<T>>({
	children,
	defaultMonth = new Date(),
	mode = 'single',
	defaultSelected,
	selected: selectedFromProps,
	onSelect,
	from,
	to,
	disableOutsideLimit = false,
	disableNavigation = false,
	weekStartDay = 'sunday',
	className,
	...props
}: CalendarProps<T, S>, ref: ForwardedRef<HTMLDivElement>) => {

	const isControlled = typeof selectedFromProps != 'undefined';
	const defaultSelectedFromProps: DateSelection<typeof mode> = mode === 'single' ? new Date() : mode === 'multiple' ? [ new Date() ] : [ new Date(), new Date() ];

	const [ internalSelectedDate, setInternalSelectedDate ] = useState<DateSelection<typeof mode>>(defaultSelected || defaultSelectedFromProps);
	const [ currentDate, setCurrentDate ] = useState<Date>(defaultMonth);

	const selected = isControlled ? selectedFromProps : internalSelectedDate;

	const handleSelectDate = useCallback((date: Date) => {
		if (isControlled) {
			if (onSelect) {
				(onSelect as SelectDateHandler<typeof mode, typeof selectedFromProps>)(date);
			}
		} else {
			setInternalSelectedDate(prevSelected => {
				if (mode === 'single') {
					return date;
				}
				if (Array.isArray(prevSelected)) {
					if (mode === 'multiple') {
						const index = prevSelected.findIndex((d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
						if (index === -1) {
							return [ ...prevSelected, date ];
						} else {
							return prevSelected.filter((_, i) => i !== index);
						}
					}
					if (mode === 'range') {
						if (prevSelected.length === 0) {
							return [ date, date ];
						} else if (prevSelected.length === 1) {
							if (date.getTime() < prevSelected[0].getTime()) {
								return [ date, prevSelected[0] ];
							} else {
								return [ prevSelected[0], date ];
							}
						} else {
							return [ date, date ];
						}
					}
				}
				return prevSelected
			});
		}
	}, [ isControlled, onSelect, mode ]);

	useEffect(() => {
		if (!isControlled) {
			if (onSelect) {
				(onSelect as SelectDateHandler<typeof mode, typeof selectedFromProps>)(selected);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selected, isControlled ]);

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

	const contextValue: CalendarContextValue<typeof mode> = useMemo(() => ({
		mode,
		onSelect: handleSelectDate,
		selected,
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
		mode,
		handleSelectDate,
		selected,
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
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps<CalendarMode, DateSelectedProp<CalendarMode>>>(CalendarInner) as CalendarComponent<CalendarMode, DateSelectedProp<CalendarMode>>;

Calendar.displayName = 'Calendar';

Calendar.Header = CalendarHeader;
Calendar.Title = CalendarTitle;
Calendar.NavButton = CalendarNavButton;
Calendar.Content = CalendarContent;
Calendar.Head = CalendarHead;
Calendar.Grid = CalendarGrid;

export default Calendar;