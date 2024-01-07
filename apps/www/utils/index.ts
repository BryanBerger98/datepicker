export const absoluteUrl = (path: string) => `${ process.env.NEXT_PUBLIC_APP_URL }${ path }`;

export const formatDate = (input: string | number): string => {
	const date = new Date(input);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
};