import { ForwardRefExoticComponent, ForwardedRef, HTMLAttributes, PropsWithoutRef, RefAttributes, createContext, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { isBefore } from '@/utils/date.util';
import { WeekDay } from '@/utils/day.util';
import { cn } from '@/utils/ui.util';

import CalendarContent from './Content/CalendarContent';
import CalendarGrid from './Content/CalendarGrid';
import CalendarHead from './Content/CalendarHead';
import CalendarHeader from './Header/CalendarHeader';
import CalendarNavButton from './Header/CalendarNavButton';
import CalendarTitle from './Header/CalendarTitle';

type CalendarMode = 'single' | 'multiple' | 'range';
type DateSelection<T extends CalendarMode> = T extends 'single' ? Date : T extends 'multiple' ? Date[] : [ Date, Date ];
type DateSelectedProp<T extends CalendarMode> = T extends 'single' ? Date : T extends 'multiple' ? Date[] : [ Date, Date ] | undefined;
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
	min?: number;
	max?: number;
};

export const CalendarContext = createContext<CalendarContextValue<CalendarMode> | null>(null);

interface BaseCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
	from?: Date;
	to?: Date;
	defaultMonth?: Date;
	disableOutsideLimit?: boolean;
	disableNavigation?: boolean;
	weekStartDay?: WeekDay;
	min: never;
	max: never;
}

interface SingleCalendarProps extends Omit<BaseCalendarProps, 'min' | 'max'> {
	mode?: 'single';
	defaultSelected?: Date;
	selected?: Date;
	onSelect?: SelectDateHandler<'single', DateSelectedProp<'single'>>;
}

interface MultipleCalendarProps extends Omit<BaseCalendarProps, 'min' | 'max'> {
	mode: 'multiple';
	defaultSelected?: Date[];
	selected?: Date[];
	onSelect?: SelectDateHandler<'multiple', DateSelectedProp<'multiple'>>;
	min?: number;
	max?: number;
}

interface RangeCalendarProps extends Omit<BaseCalendarProps, 'min' | 'max'> {
	mode: 'range';
	defaultSelected?: [ Date, Date ];
	selected?: [ Date, Date ];
	onSelect?: SelectDateHandler<'range', DateSelectedProp<'range'>>;
	min?: number;
	max?: number;
}

type CalendarProps = SingleCalendarProps | MultipleCalendarProps | RangeCalendarProps;

type CalendarStatic = {
	Header: typeof CalendarHeader;
	Title: typeof CalendarTitle;
	NavButton: typeof CalendarNavButton;
	Content: typeof CalendarContent;
	Head: typeof CalendarHead;
	Grid: typeof CalendarGrid;
}

type CalendarComponent = ForwardRefExoticComponent<PropsWithoutRef<CalendarProps & RefAttributes<HTMLDivElement>>> & CalendarStatic;

const CalendarInner = ({ children,
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
	...props }: CalendarProps, ref: ForwardedRef<HTMLDivElement>) => {

	const { min, max } = mode === 'multiple' || mode === 'range' ? props as MultipleCalendarProps | RangeCalendarProps : {
		min: undefined,
		max: undefined, 
	};
	const dateRangeLastSelected = useRef<'start' | 'end'>('start');

	const isControlled = typeof selectedFromProps != 'undefined';
	const defaultSelectedFromProps: DateSelection<typeof mode> = mode === 'single' ? new Date() : mode === 'multiple' ? [ new Date() ] : [];

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
						// const { min, max } = props as MultipleCalendarProps;
						const index = prevSelected.findIndex((d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
						if (index === -1) {
							if (max && prevSelected.length >= max) return prevSelected;
							return [ ...prevSelected, date ];
						} else {
							if (min && prevSelected.length <= min) return prevSelected;
							return prevSelected.filter((_, i) => i !== index);
						}
					}
					if (mode === 'range') {
						const [ prevStartDate ] = prevSelected;
						if (dateRangeLastSelected.current === 'start') {
							dateRangeLastSelected.current = 'end';
							return [ date, date ];
						}
						if (dateRangeLastSelected.current === 'end') {
							dateRangeLastSelected.current = 'start';
							if (isBefore(prevStartDate, date)) {
								return [ prevStartDate, date ];
							} else {
								return [ date, prevStartDate || date ];
							}
						}
						return [ date, date ];
					}
				}
				return prevSelected;
			});
		}
	}, [ isControlled, onSelect, mode, min, max ]);

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
		min,
		max,
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
		min,
		max,
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

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(CalendarInner) as CalendarComponent;

Calendar.displayName = 'Calendar';

Calendar.Header = CalendarHeader;
Calendar.Title = CalendarTitle;
Calendar.NavButton = CalendarNavButton;
Calendar.Content = CalendarContent;
Calendar.Head = CalendarHead;
Calendar.Grid = CalendarGrid;

export default Calendar;