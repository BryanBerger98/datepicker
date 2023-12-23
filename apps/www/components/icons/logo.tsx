import { IconProps } from '@/types/icon.type';

const LogoIcon = ({ size = 24, ...rest }: IconProps) => (
	<svg
		aria-label="Datepicker"
		fill="none"
		height={ size }
		viewBox="0 0 24 24"
		width={ size }
		xmlns="http://www.w3.org/2000/svg"
		{ ...rest }
	>
		<path
			d="M12 13L15.3333 21L16.5333 17.5333L20 16.3333L12 13Z"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		/>
		<path
			d="M10.7998 8.4668L11.3331 10.4001"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		/>
		<path
			d="M9.40013 12.3331L7.4668 11.7998"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		/>
		<path
			d="M15.3333 9.7334L14 11.0001"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		/>
		<path
			d="M10.0001 15L8.7334 16.3333"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		/>
		<path
			d="M21 14V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H13"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
		<path
			d="M16 2V6"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
		<path
			d="M8 2V6"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
);

export default LogoIcon;