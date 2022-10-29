import React, { useState , useEffect } from 'react';
// import PropTypes from 'prop-types';

import { Square } from './Square';



export const Board = (props) => {
    const [lastFillPosition, setLastFillPosition] = useState(null);
    const [filledO, setFilledO] = useState([]);
    const [filledX, setFilledX] = useState([]);
    
    // useEffect(() => {
    //     if (filledO.some(e => e.x === 1 && e.y === 1)) {
    //         console.log("Includes")
    //     }
    // })


    const handleClick = (e) => {
        setLastFillPosition(e); 
        if(props.xIsNext === true){
            setFilledX((prev) => ([ ...prev, e]));
        }
        else if(props.xIsNext === false) {
            setFilledO((prev) => ([ ...prev, e]));
        }
        
    }

    useEffect(() => {
        if(lastFillPosition !== null){

            if(props.xIsNext === true){
                
                
                if(calculateWinner(filledO, lastFillPosition, props.field, props.lengthForWin)){
                    props.handlePlayerWon('O');
                    props.setIsPlaying(false);
                    props.setXIsNext(true);
                }
                
                
                
            }
            
            else if(props.xIsNext === false){
                
                
                if(calculateWinner(filledX, lastFillPosition, props.field, props.lengthForWin)){
                    props.handlePlayerWon('X');
                    props.setIsPlaying(false);
                    props.setXIsNext(true);
                }
                }
                
            }
        
        
    }, [lastFillPosition])

    

        const field = Number(props.field);
        // const wholeField = field * field;
        let allSquares = [];
        let squareRow = [];

        const squareWidth = field > 15 ? 30 : 40;
        const boardWidth = (squareWidth + 2) * field;
        const boardStyle = {
            width: boardWidth,
            margin: "auto",
        }

        let counter = 0

            for (let i = 0; i < field; i++) {
                for (let j = 0; j < field; j++) {

                squareRow.push(
                    <Square 
                        key={counter}
                        position={{x: j, y: i}} 
                        handleClick={handleClick}
                        changePlayer={props.changePlayer} 
                        xIsNext={props.xIsNext} 
                        field={props.field} 
                        won={props.won}
                        squareWidth={squareWidth}
                    />
                    )
                counter++;

                }
                allSquares.push(squareRow)
                squareRow =[];
            }
    
        return (
            <div>
            {props.isPlaying && (props.xIsNext ? <h3>X's turn</h3> : <h3>O's turn</h3>)}
            <div style={boardStyle} className="board">
                {/* {arraySquares.map((square, index ) => index % forEndRow === 0 && index >= forEndRow ?  (<div className="row"><Square key={index} /><div className="break"></div></div>) : (<div className="row"><Square key={index} /></div>) )} */}
                
                {allSquares}
               
                
            </div>
            </div>
        )
    }


function calculateWinner(squares, currentPosition, field, winFor){

    // console.log(squares);
    // console.log(currentPosition);
     const x = currentPosition.x;
     const y = currentPosition.y;
    
     let counter = 0;

    // first direction
    
    let xMin = x - (winFor - 1) >= 0 ? x - (winFor - 1) : 0;
    while((xMin < (x + winFor)) && (xMin < field) ){
        if(squares.some(e => e.x === xMin && e.y === y)){
            counter++;
        }
        else {
            counter = 0;
        }
        
        if(counter === winFor){
            return true
        }
        xMin++;
    }
      
       
    // // second direction
    counter = 0;
    
    let yMin = y - (winFor - 1) >= 0 ? y - (winFor - 1) : 0;
    // while((yMin < (winFor * 2)) && (yMin < field) ){
    while((yMin < (y + winFor)) && (yMin < field) ){
        if(squares.some(e => e.x === x && e.y === yMin)){
            counter++;
        }
        else {
            counter = 0;
        }
        if(counter === winFor){
            return true
        }
        yMin++;
    }
    // // third direction

    // counter = 0;
    // let ulx;
    // let uly;
    // if(x > y){
    //     ulx = x - y > x - (winFor - 1) ? x - (winFor - 1): x - y;
    //     uly = y - y > y - (winFor - 1) ? y - (winFor - 1): y - y;
    // }
    // else {
    //     ulx = x - x > x - (winFor - 1) ? x - (winFor - 1): x - x;
    //     uly = y - x > y - (winFor - 1) ? y - (winFor - 1): y - x;
    // }

    // console.log("Checked 3");
    // if(counter === winFor - 1){
    //     return true
    // }
    
    // while((uly < field && ulx < field) && ((ulx || uly) < (winFor * 2))) {

    //     if(squares.some(e => e.x === ulx && e.y === uly)){
    //         counter++;
    //     }
    //     else {
    //         counter = 0;
    //     }
    //     ulx++;
    //     uly++;
    // }

    // if(counter === winFor - 1){
    //     return true
    // }
    

    counter = 0;
    let ulx;
    let uly;
    if(x > y){
        ulx = x - y > x - (winFor - 1) ? x - y : x - (winFor - 1);
        uly = y - y > y - (winFor - 1) ? y - y : y - (winFor - 1);
    }
    else {
        ulx = x - x > x - (winFor - 1) ? x - x : x - (winFor - 1);
        uly = y - x > y - (winFor - 1) ? y - x : y - (winFor - 1);
    }
    
    while((uly < field && ulx < field) && ((ulx < (x + winFor)) && (uly < (y + winFor)))) {
        console.log(ulx);
        console.log(uly);
        if(squares.some(e => e.x === ulx && e.y === uly)){
            counter++;
        }
        else {
            counter = 0;
        }
        // console.log(counter)
        if(counter === winFor){
            return true
        }

        ulx++;
        uly++;
    }

    
    counter = 0;

    let dly = y + (winFor - 1) < field ? y + (winFor - 1) : field - 1;
    let diff = dly - y;
    let dlx = x - diff;
    // let dlx = x - (winFor - 1) >= 0 ? x - (winFor - 1) : 0;
    
    //fouth direction

    //  while((dly > 0 && dlx < field) && ((dlx + (winFor * 2 - 1) < (winFor * 2)) && (dly - (winFor * 2 - 1) > (winFor * 2)))) {
     while((dly >= 0 && dlx < field) && ((dlx < x + winFor) && (dly > y - winFor)) ) {
        if(squares.some(e => e.x === dlx && e.y === dly)){
            counter++;
        }
        else {
            counter = 0;
        }

        if(counter === winFor){
            return true
        }

        dlx++;
        dly--;
    }
    // console.log("Checked 4");
    
    // counter = 0;
}


// Board.propTypes = {
//     field: PropTypes.number,
//     lengthForWin: PropTypes.number
// }