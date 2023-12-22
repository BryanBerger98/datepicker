import { CalendarMode } from '@/components/Calendar';

type RangeCellDataAttributes = {
	'data-is-last': boolean;
	'data-is-first': boolean;
	'data-is-today': boolean;
	'data-is-middle': boolean;
}

type CellDataAttributesOptions = {
	mode: CalendarMode;
	isSelected: boolean;
	isDisabled: boolean;
	isHidden: boolean;
	isLast: boolean;
	isFirst: boolean;
	isToday: boolean;
	isMiddle: boolean;
};

export const getCellDataAttributes = (options: CellDataAttributesOptions) => {
	if (options.mode === 'range') {
		const attributes: RangeCellDataAttributes = {
			'data-is-first': options.isFirst,
			'data-is-last': options.isLast,
			'data-is-today': options.isToday,
			'data-is-middle': options.isMiddle,
		};
	}
};