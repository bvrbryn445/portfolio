/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
module.exports = {
	content: [
		"./src/**/*.ts",
		"./**/*.html"
	],
	// added for dynamically applied classnames
	safelist: [
		{
			pattern: /(bg|text|border)-(bluemine|downy|frostedmint)-(100|400|500|source)/
		}
	],
	theme: {
		extend: {
			spacing: {
				'header-height': '4rem'
			},
			fontFamily: {
				'layout': ['AvenirBook', 'AvenirRoman', ...defaultTheme.fontFamily.sans],
				'intro': ['PromptMedium', 'AvenirBook', 'AvenirRoman', 'sans-serif'],
			}
		},
		backgroundSize: {
			'auto': 'auto',
			'cover': 'cover',
			'contain': 'contain',
			'80%': '80%',
			'125%': '125%',
		},
		fontFamily: {
			sans: ['Roboto', 'AvenirBook', 'AvenirRoman', ...defaultTheme.fontFamily.sans],
			heading: ['AvenirBook', 'AvenirRoman', 'sans-serif'],
			body: ['Roboto', 'AvenirRoman', 'AvenirBook']
		},
		colors: {
			'midnight': {
				DEFAULT: '#001C30',
				100: '#D6DDE8'
			},
			'bluemine': {
				100: '#CAE0EC',
				200: '#A7CCDE',
				300: '#86B8CF',
				400: '#66A3BE',
				source: '#176B87'
			},
			'downy': {
				100: '#C2E4E0',
				200: '#9AD1CC',
				300: '#73BDB8',
				500: '#26958F',
				700: '#006B66',
				source: '#64CCC5'
			},
			'frostedmint': {
				50: '#F0F4F4',
				600: '#577875',
				800: '#36504E',
				900: '#283D3B',
				source: '#DAFFFB',
			}
		},

	},
	variants: {
		extend: {},
	},
	plugins: [],
}

