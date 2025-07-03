/** @type {import('tailwindcss').Config} */
import { teal } from "tailwindcss/colors";
export default {
    darkMode: "class",
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            colors: {
                primary: teal,
            },
            animation: {
                shake: "shake 0.4s ease-in-out",
            },
            keyframes: {
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-6px)" },
                    "50%": { transform: "translateX(6px)" },
                    "75%": { transform: "translateX(-4px)" },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
