import localFont from 'next/font/local';

export const sansFont = localFont({
	src: [
		{
			path: '../assets/fonts/RedHatDisplay-VariableFont_wght.ttf',
			style: 'normal',
		},
		{
			path: '../assets/fonts/RedHatDisplay-Italic-VariableFont_wght.ttf',
			style: 'italic',
		},
	],
	display: 'swap',
	variable: '--font-sans',
});
