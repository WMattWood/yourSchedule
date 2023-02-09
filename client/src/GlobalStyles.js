import { createGlobalStyle } from 'styled-components'

// This becomes the source of truth for the application
const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Inter', sans-serif;
    background: var(--background);

    ///////   LIME THEME
    --background: #95C171;
    --text-primary: black;
    --text-secondary: #42493A;
    --highlight: goldenrod;
    --blankspace: white;
    --border-blank: white;
    --border-dim: #dfdfdf;
    --modal: #F5FBEF;
    --modal-secondary: #d3d3d3;
    --borders: black;
    --calllist: #395980;
    --calllist-hover: #B0BDCC;
    --calllist-hover-text: white;
    --daycell-border: #59CBE8;
    --daycell-fill: #D0EBF1;
    --bright-color1: #5c0067; //(blue from call list)
    --bright-color2: #00d4ff; //(magenta from call list)
    --red: #FF0000;
    --green: #1bde23;
    --day-incomplete: #C09CBE;
    --day-completed: #9CC09E;

    ///////   FOREST THEME
    /* --background: #354D22;
    --text-primary: black;
    --text-secondary: #9e9e9e;
    --highlight: goldenrod;
    --blankspace: white;
    --border-blank: white;
    --border-dim: #dfdfdf;
    --modal: #F5FBEF;
    --modal-secondary: #d3d3d3;
    --borders: black;
    --calllist: #395980;
    --calllist-hover: #B0BDCC;
    --calllist-hover-text: white;
    --daycell-border: #59CBE8;
    --daycell-fill: #D0EBF1;
    --bright-color1: #5c0067; //(blue from call list)
    --bright-color2: #00d4ff; //(magenta from call list)
    --red: #FF0000;
    --green: #1bde23;
    --day-incomplete: #C09CBE;
    --day-completed: #9CC09E; */

    --primary: cyan;
    --text: #506784;
    --borders: #EBF0F8;
    --page-background: transparent;
    --nav-background: white;
    /* add more colors */

    --font-primary: "Helvetica Neue", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "SFMono-Regular",  Consolas,  "Liberation Mono",  Menlo,  Courier,  monospace;
    --x1: 4px;
    --x2: 8px;
    --x3: 16px;
    --x4: 24px;
    --x5: 32px;
    --x6: 64px;
    --f1: 0.75rem;
    --f2: 0.875rem;
    --f3: 1rem;
    --f4: 1.25rem;
    --f5: 1.5rem;
    --f6: 2rem;
    /* add more variables to fill our your system */
  }

`

// background
// text
// blankspace 
// button fill
// hover color 
// bright color (blue from call list)
// red
// green
// filled day
// unfilled day

// https://www.color-name.com/hot-pepper-green.color#color-palettes
// #3E5A28

// #354D22

// #2D401D

// #243317


//Tints
// 7A9961
// Transparent 8BA674
// 8BA674
// Transparent 9BB388
// 9BB388
// Transparent ACC09C
// ACC09C
// Transparent BDCCB0
// BDCCB0
// Transparent CDD9C4
// CDD9C4
// Transparent DEE6D7
// DEE6D7
// Transparent EEF2EB
// EEF2EB

export default GlobalStyle