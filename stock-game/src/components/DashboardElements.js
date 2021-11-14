import styled from "styled-components";


export const UpperDiv = styled.div`
    display:flex;
    padding:20px;
    /* background-color:blue; */
    justify-content:space-between;
    height: 40vh;
    @media screen and (max-width: 768px){
        display:none;
    }
`
export const Scoreboard = styled.div`
    border-radius:20%;
    border: 1px solid black;
    font-size: 1.5rem;
    font-weight:bold;
    /* background-color:red; */
    width: 40vw;
    height:35vh;
    margin:40px;
    display:inline-block;
    text-align:center;
    padding-top:8vh;
    box-sizing: border-box; 
`

export const Score = styled.span`
    font-size: 2rem;
`

export const Predictions = styled.div`
    border-radius:20%;
    font-size: 2rem;
    /* background-color:red; */
    border: 1px solid black;
    width: 40vw;
    height:35vh;
    margin:40px;
    display:inline-block;
    text-align:center;
    /* padding-top:8vh; */
    box-sizing: border-box; 
`

export const Screener = styled.div`
    margin: 30px;
    padding:10px;
    box-sizing: border-box; 
    font-size: 2rem;
    /* background-color:green; */
    border: 1px solid black;
    height:35vh;
`