import { createGlobalStyle } from "styled-components"; // npm package for reusable style components

// Now we can write CSS inside this and we are good to go
// example
// export const GlobalStyle = createGlobalStyle`
//     a{
//         color : "red";
//     }
// `;
export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing : border-box;
    }
    // change the background as theme changes
    body{
        background-color : ${({ theme }) => theme.background};
        color : ${(theme) => theme.textColor};
        margin: 0;
        padding: 0;
        transition : all 0.25s linear; 
    }
    .canvas {
        display : grid; // grid display
        min-height : 100vh; // it will take whole display that is visible
        grid-auto-flow : row; // it will be flowing rowwise 
        grid-template-rows : auto 1fr auto; // left me auto space mid me 1fr space right me auto space
        gap : 0.5rem;
        padding : 2rem;
        width : 100%; // Already done vese to
        align-items : center;
        text-align : center; // makes sure everything is aligned at center;
        color : ${({ theme }) => theme.textColor};
    }
    .typeBox{
        display : block; // it is by default 
        max-width : 1000px;
        height : 140px;
        margin-left : auto;
        margin-right : auto;
        overflow: hidden; // It is important as we have set height and width so to avoid overflow
    }
    .words{
        font-size: 32px;
        display : flex; // Both of these lines help us in the overflow thing, now if there is overflow then the words wrap
        flex-wrap: wrap;
        color : ${({ theme }) => theme.typeBoxText};
        ${console.log("theme: ")}
    }
    .word{
        // targeting a single word
        margin: 5px; // gives a margin to each word
        padding-right : 2px;
    }
    .hidden-input {
        opacity: 0px; // This is done to hide the input element
    }
    .upper-menu{
        display : flex;
        max-width : 1000px;
        margin-left : auto;
        margin-right : auto;
        font-size : 1.35rem;
        justify-content : space-between;
        padding : 0.5rem;
        color : ${({ theme }) => theme.buttonColor}
        font-family: "Roboto Mono", monospace;
    }
    .modes {
        display : flex;
        gap : 0.5rem;
    }
    .time-mode:hover{
        color : ${({ theme }) => theme.typeBoxText};
        cursor : pointer;
    }
    .hidden-input {
        opacity : 0;
    }
    .current {
        border-left : 1px solid; // we are doing this so that we have a blinking cursor when the user is typing
        // now we will put animation
        animation : blinking 2s infinite;
        animation-timing-function : ease;
        @keyframes blinking {
            0% {border-left-color : ${({ theme }) => theme.textColor};}
            25% {border-left-color : ${({ theme }) => theme.background};}
            50% {border-left-color : ${({ theme }) => theme.textColor};}
            75% {border-left-color : ${({ theme }) => theme.background};}
            100% {border-left-color : ${({ theme }) => theme.textColor}}
        }
    }
    .current-right {
        border-right : 1px solid; // we are doing this so that we have a blinking cursor when the user is typing
        // now we will put animation
        animation : blinkingRight 2s infinite;
        animation-timing-function : ease;
        @keyframes blinkingRight {
            0% {border-right-color : ${({ theme }) => theme.textColor};}
            25% {border-right-color : ${({ theme }) => theme.background};}
            50% {border-right-color : ${({ theme }) => theme.textColor};}
            75% {border-right-color : ${({ theme }) => theme.background};}
            100% {border-right-color : ${({ theme }) => theme.textColor}}
        }
    }
    .correct {
        color : ${({ theme }) => theme.textColor};
    }
    .incorrect {
        color : red;
    }
    // for footer and links and themes
    .footer {
        width : 1000px;
        display : flex;
        justify-content : space-between;
        margin-left : auto;
        margin-right : auto; 
    }

    .stats-box {
        display : flex;
        width : 1000px;
        height : auto;
        margin-left : auto;
        margin-right : auto;
    }

    .left-stats {
        width : 30%;
        padding : 30px;
    }

    .right-stats {
        width : 70%;
    }

    .title {
        font-size : 20px;
        color : ${({ theme }) => theme.buttonColor};
        margin-top: 1rem;
    }

    .subtitles {
        font-size : 30px; 
    }

    .header {
        width : 1000px;
        display : flex;
        justify-content : space-between;
        margin-left : auto;
        margin-right : auto;
        color : ${({ theme }) => theme.textColor};
    }

    .modaldiv {
        width: 400px;
        color: ${({ theme }) => theme.textColor};
        font-size: 20px;
        font-weight: bold;
    }

    .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.8);  /* Dark background */ 
        z-index: -1;  /* Make sure it's behind the modal */
    }

    .user-profile {
        // make it look like a card
        width: 1000px;
        margin: auto;
        display: flex;
        height: 15rem;
        background: ${({ theme }) => theme.background};
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }

    .user {
        width: 50%;
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 1.5rem;
        padding: 1rem;
        border-right: 2px solid;
    }

    .info {
        width: 60%;
        padding: 1rem;
        margin-top: 1rem;
    }

    .picture {
        width: 40%;
    }

    .total-tests {
        width: 50%;
        font-size: 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .table, .graph-user-page {
        margin: auto;
        width: 1000px;
    } 

    .center-of-screen {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center; 
        cursor: pointer;
    }

    .user-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo-title {
        font-family: 'Poppins', sans-serif;
        margin: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .restart { 
        cursor: pointer;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.buttonColor}; 
        margin: 2rem;
        font-family: 'Poppins', sans-serif;
    }

    .actual-footer{
        display: flex;
        justify-content: space-between;
    } 

`;
// we can export this to where ever we want to use these styles, for example in app.jsx

// transition linear will make sure that there is transition a little bit for every activity
// loading reload and all
