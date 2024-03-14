/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: [
          "2.5rem",
          {
            lineHeight: "3.125rem",
            letterSpacing: "0.5px",
          },
        ],
        h2: [
          "2.25rem",
          {
            lineHeight: "2.875rem",
            letterSpacing: "0.5px",
          },
        ],
        h3: [
          "2rem",
          {
            lineHeight: "2.625rem",
            letterSpacing: "0.5px",
          },
        ],
        h4: [
          "1.75rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "0.5px",
          },
        ],
        h5: [
          "1.5rem",
          {
            lineHeight: "2.125rem",
            letterSpacing: "0.5px",
          },
        ],
        h6: [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "0.5px",
          },
        ],
        subheading: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        "p-lg": [
          "1rem",
          {
            lineHeight: "1.625rem",
          },
        ],
        "p-md": [
          "0.875rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        "p-sm": [
          "0.75rem",
          {
            lineHeight: "1.375rem",
          },
        ],
        caption: [
          "0.625rem",
          {
            lineHeight: "1.25rem",
          },
        ],
      },
      colors: {
        primary: {
          main: "#006298",
          "bg-1": "#F6F9FE",
          "bg-2": "#F1F5FB",
          border: "#BAD5F9",
          hover: "#276BC5",
          pressed: "#184076",
          focus: "#CCDFEA",
        },
        secondary: {
          main: "#84BD00",
          surface: "#F9FCF3",
          border: "#D6E9AA",
          hover: "#6E9D00",
          pressed: "#425F00",
          focus: "#E6F2CC",
        },
        neutral: {
          10: "#FFFFFF",
          20: "#F5F5F5",
          30: "#EDEDED",
          40: "#E0E0E0",
          50: "#C2C2C2",
          60: "#9E9E9E",
          70: "#757575",
          80: "#616161",
          90: "#404040",
          100: "#0A0A0A",
        },
        tertiary: {
          "bg-green": "#CFF2CC",
          "br-green": "#5FD355",
          "tx-green": "#0FBD00",
          "bg-yellow": "#F9F1D8",
          "br-yellow": "#ECD07C",
          "tx-yellow": "#E2B93B",
          "bg-red": "#F2CCCC",
          "br-red": "#D35555",
          "tx-red": "#BD0000",
          "bg-blue": "#CDCCF2",
          "br-blue": "#5855D3",
          "tx-blue": "#0400BD",
          "bg-brown": "#F2E5CC",
          "br-brown": "#D3A855",
          "tx-brown": "#BD7D00",
          "bg-tosca": "#CCF2F2",
          "br-tosca": "#55D3D3",
          "tx-tosca": "#00BDBD",
          "bg-purple": "#DFCCF2",
          "br-purple": "#9455D3",
          "tx-purple": "#5F00BD",
          "bg-pink": "#EFCCF2",
          "br-pink": "#C955D3",
          "tx-pink": "#AE00BD",
          "bg-gold": "#F2EECC",
          "br-gold": "#D3C655",
          "tx-gold": "#BDAA00",
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
};
