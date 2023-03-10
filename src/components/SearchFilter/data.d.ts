export interface FilterOptionType {
	type: string | number;
	text: string;
	value: string | number;
	children: FilterOptionType[];
}

export interface DropdownOptionType {
	text: string;
	value: number;
}

export type OptionType = DropdownOptionType & { icon: string };
