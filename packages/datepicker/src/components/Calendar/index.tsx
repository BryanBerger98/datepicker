import { ForwardRefExoticComponent, ForwardedRef, HTMLAttributes, PropsWithoutRef, RefAttributes, createContext, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Matcher } from '@/types/Matchers';
import { isBefore, isSame } from '@/utils/date.util';
import { WeekDay } from '@/utils/day.util';

import CalendarContent from './Content/CalendarContent';
import CalendarGrid from './Content/CalendarGrid';
import CalendarHead from './Content/CalendarHead';
import CalendarHeader from './Header/CalendarHeader';
import CalendarNavButton from './Header/CalendarNavButton';
import CalendarTitle from './Header/CalendarTitle';

export type CalendarMode = 'single' | 'multiple' | 'range';
type DateSelection<TMode extends CalendarMode> = TMode extends 'range' ? [ Date, Date ] : TMode extends 'multiple' ? Date[] : (Date | null);
type ControlledSelectDateHandler = (value: Date) => void;
type UncontrolledSelectDateHander<TMode extends CalendarMode> = (value: DateSelection<TMode>) => void;

type CalendarContextValue<TMode extends CalendarMode> = {
	onSelect: (value: Date) => void;
	mode: CalendarMode;
	selected: DateSelection<TMode>;
	currentDate: Date;
	onChangeCurrentDate: (date: Date) => void;
	showOutsideDates?: boolean;
	from?: Date;
	to?: Date;
	disableOutsideLimit?: boolean;
	disableNavigation?: boolean;
	onGoToNextMonth: (skip?: number) => () => void;
	onGoToPreviousMonth: (skip?: number) => () => void;
	weekStartDay: WeekDay;
	min?: number;
	max?: number;
	disabled?: Matcher | Matcher[] | undefined;
	required?: boolean;
};

export const CalendarContext = createContext<CalendarContextValue<CalendarMode> | null>(null);

interface BaseCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
	showOutsideDates?: boolean;
	from?: Date;
	to?: Date;
	defaultMonth?: Date;
	disableOutsideLimit?: boolean;
	disableNavigation?: boolean;
	weekStartDay?: WeekDay;
	min: never;
	max: never;
	disabled?: Matcher | Matcher[] | undefined;
	required?: boolean;
}

interface BaseSingleCalendarProps extends Omit<BaseCalendarProps, 'min' | 'max'> {
	mode?: 'single';
	defaultSelected?: Date;
}
interface ControlledSingleCalendarProps extends BaseSingleCalendarProps {
	selected: DateSelection<'single'>;
	onSelect: ControlledSelectDateHandler;
}
interface UncontrolledSingleCalendarProps extends BaseSingleCalendarProps {
	selected?: undefined;
	onSelect?: UncontrolledSelectDateHander<'single'>;
}
type SingleCalendarProps = ControlledSingleCalendarProps | UncontrolledSingleCalendarProps;

interface BaseMultipleCalendarProps extends Omit<BaseCalendarProps, 'min' | 'max'> {
	mode: 'multiple';
	defaultSelected?: Date[];
	min?: number;
	max?: number;
}
interface ControlledMultipleCalendarProps extends BaseMultipleCalendarProps {
	selected: DateSelection<'multiple'>;
	onSelect: ControlledSelectDateHandler;
}
interface UncontrolledMultipleCalendarProps extends BaseMultipleCalendarProps {
	selected?: undefined;
	onSelect?: UncontrolledSelectDateHander<'multiple'>;
}
type MultipleCalendarProps = ControlledMultipleCalendarProps | UncontrolledMultipleCalendarProps;

interface BaseRangeCalendarProps extends Omit<BaseCalendarProps, 'min' | 'max'> {
	mode: 'range';
	defaultSelected?: [ Date, Date ];
	min?: number;
	max?: number;
}
interface ControlledRangeCalendarProps extends BaseRangeCalendarProps {
	selected: DateSelection<'range'>;
	onSelect: ControlledSelectDateHandler;
}
interface UncontrolledRangeCalendarProps extends BaseRangeCalendarProps {
	selected?: undefined;
	onSelect?: UncontrolledSelectDateHander<'range'>;
}
type RangeCalendarProps = ControlledRangeCalendarProps | UncontrolledRangeCalendarProps;

type CalendarProps<TMode extends CalendarMode = 'single'> = TMode extends 'range' ? RangeCalendarProps : TMode extends 'multiple' ? MultipleCalendarProps : SingleCalendarProps;

type CalendarStatic = {
	Header: typeof CalendarHeader;
	Title: typeof CalendarTitle;
	NavButton: typeof CalendarNavButton;
	Content: typeof CalendarContent;
	Head: typeof CalendarHead;
	Grid: typeof CalendarGrid;
}

type CalendarComponent<TMode extends CalendarMode = 'single'> = ForwardRefExoticComponent<PropsWithoutRef<CalendarProps<TMode> & RefAttributes<HTMLDivElement>>> & CalendarStatic;

const CalendarInner = <TMode extends CalendarMode = CalendarMode>({ children,
	showOutsideDates = false,
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
	disabled = false,
	required = false,
	...props }: CalendarProps<TMode>, ref: ForwardedRef<HTMLDivElement>) => {

	const { min, max } = mode === 'multiple' || mode === 'range' ? props as Partial<MultipleCalendarProps | RangeCalendarProps> : {
		min: undefined,
		max: undefined, 
	};
	const dateRangeLastSelected = useRef<'start' | 'end'>('start');

	const isControlled = typeof selectedFromProps != 'undefined';
	const defaultSelectedFromProps: DateSelection<typeof mode> = mode === 'single' ? null : mode === 'multiple' ? [] : [];

	const [ internalSelectedDate, setInternalSelectedDate ] = useState<DateSelection<typeof mode>>(defaultSelected || defaultSelectedFromProps);
	const [ currentDate, setCurrentDate ] = useState<Date>(defaultMonth);

	const selected: DateSelection<typeof mode> = isControlled ? selectedFromProps : internalSelectedDate;

	const handleSelectDate = useCallback((date: Date) => {
		if (isControlled) {
			if (onSelect) {
				(onSelect as ControlledSelectDateHandler)(date);
			}
		} else {
			setInternalSelectedDate(prevSelected => {
				if (mode === 'single') {
					if (!required && prevSelected && prevSelected instanceof Date && isSame(prevSelected, date)) {
						return null;
					}
					return date;
				}
				if (Array.isArray(prevSelected)) {
					if (mode === 'multiple') {
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
							if (isSame(prevStartDate, date)) {
								if (required) {
									return [ date, date ];
								}
								return [];
							}
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
	}, [ isControlled, onSelect, mode, min, max, required ]);

	useEffect(() => {
		if (!isControlled) {
			if (onSelect) {
				(onSelect as UncontrolledSelectDateHander<TMode>)(selected as DateSelection<TMode>);
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
		showOutsideDates,
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
		disabled,
	}), [
		showOutsideDates,
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
		disabled,
	]);

	return (
		<CalendarContext.Provider value={ contextValue }>
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					marginTop: '1rem',
					marginBottom: '1rem',
				} }
				{ ...props }
				ref={ ref }
			>
				{ children }
			</div>
		</CalendarContext.Provider>
	);
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(CalendarInner) as CalendarComponent<CalendarMode>;

Calendar.displayName = 'Calendar';

Calendar.Header = CalendarHeader;
Calendar.Title = CalendarTitle;
Calendar.NavButton = CalendarNavButton;
Calendar.Content = CalendarContent;
Calendar.Head = CalendarHead;
Calendar.Grid = CalendarGrid;

export default Calendar;