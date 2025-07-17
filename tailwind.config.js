/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    extend: {
        animation: {
            'flash-red': 'flashRed 1s ease-in-out',
        },
        keyframes: {
            flashRed: {
                '0%': { backgroundColor: '#fecaca' },
                '50%': { backgroundColor: '#f87171' },
                '100%': { backgroundColor: '#fecaca' },
            },
        },
    },
};
