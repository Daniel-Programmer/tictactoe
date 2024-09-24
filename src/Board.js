import React, { useState, useEffect } from 'react';
import { Square } from './Square';


export const Board = (props) => {
    const [lastFilledPosition, setlastFilledPosition] = useState(null);
    const [filledO, setFilledO] = useState([]);
    const [filledX, setFilledX] = useState([]);
    const maxNumberOfSquares = props.boardSideLength * props.boardSideLength;

    const handleClick = (e) => {
        setlastFilledPosition(e);
        if (props.xIsNext === true) {
            setFilledX((prev) => ([...prev, e]));
        }
        else if (props.xIsNext === false) {
            setFilledO((prev) => ([...prev, e]));
        }
    }

    const isAlreadyFilledSquare = (squares, x, y) => {
        return squares.some(e => e.x === x && e.y === y)
    }

    const calculateWinner = (squares, currentPosition, boardSideLength, winFor) => {
        const x = currentPosition.x;
        const y = currentPosition.y;

        // first direction - horizontal
        let counter = 0;

        let xMin = x - (winFor - 1) >= 0 ? x - (winFor - 1) : 0;
        while ((xMin < (x + winFor)) && (xMin < boardSideLength)) {
            isAlreadyFilledSquare(squares, xMin, y) ? counter++ : counter = 0;

            if (counter === winFor) {
                return true
            }
            xMin++;
        }

        // second direction - vertical
        counter = 0;

        let yMin = y - (winFor - 1) >= 0 ? y - (winFor - 1) : 0;
        while ((yMin < (y + winFor)) && (yMin < boardSideLength)) {
            console.log(x, yMin);
            isAlreadyFilledSquare(squares, x, yMin) ? counter++ : counter = 0;

            if (counter === winFor) {
                return true
            }
            yMin++;
        }

        // third direction - primary diagonal
        counter = 0;
        let ulx;
        let uly;

        if (x > y) {
            ulx = x - y > x - (winFor - 1) ? x - y : x - (winFor - 1);
            uly = y - y > y - (winFor - 1) ? y - y : y - (winFor - 1);
        }
        else {
            ulx = x - x > x - (winFor - 1) ? x - x : x - (winFor - 1);
            uly = y - x > y - (winFor - 1) ? y - x : y - (winFor - 1);
        }

        while ((uly < boardSideLength && ulx < boardSideLength) && ((ulx < (x + winFor)) && (uly < (y + winFor)))) {
            isAlreadyFilledSquare(squares, ulx, uly) ? counter++ : counter = 0;

            ulx++;
            uly++;
        }

        //fouth direction - secondary diagonal
        counter = 0;

        let dly = y + (winFor - 1) < boardSideLength ? y + (winFor - 1) : boardSideLength - 1;
        let diff = dly - y;
        let dlx = x - diff;

        while ((dly >= 0 && dlx < boardSideLength) && ((dlx < x + winFor) && (dly > y - winFor))) {
            isAlreadyFilledSquare(squares, dlx, dly) ? counter++ : counter = 0;

            if (counter === winFor) {
                return true
            }

            dlx++;
            dly--;
        }
    }

    useEffect(() => {
        if (lastFilledPosition !== null) {
            if (maxNumberOfSquares === filledO.length + filledX.length) {
                props.handlePlayerWon('OX');
                props.setIsPlaying(false);
            }

            if (props.xIsNext === true) {
                const isWinner = calculateWinner(filledO, lastFilledPosition, props.boardSideLength, props.lengthForWin);
                if (isWinner) {
                    props.handlePlayerWon('O');
                    props.setIsPlaying(false);
                    props.setXIsNext(true);
                }
            }

            else if (props.xIsNext === false) {
                const isWinner = calculateWinner(filledX, lastFilledPosition, props.boardSideLength, props.lengthForWin);
                if (isWinner) {
                    props.handlePlayerWon('X');
                    props.setIsPlaying(false);
                    props.setXIsNext(true);
                }
            }
        }
    }, [lastFilledPosition, props, filledO, filledX, maxNumberOfSquares])


    // Create board of squares
    const boardSideLength = Number(props.boardSideLength);
    let allSquares = [];
    let squareRow = [];

    const boardStyle = {
        margin: "auto",
        gridTemplateColumns: `repeat(${boardSideLength}, minmax(40px, 1fr))`,
        gridTemplateRows: `repeat(${boardSideLength}, minmax(40px, 1fr))`,
        width: "auto",
    }

    let counter = 0

    for (let i = 0; i < boardSideLength; i++) {
        for (let j = 0; j < boardSideLength; j++) {

            squareRow.push(
                <Square
                    key={counter}
                    position={{ x: j, y: i }}
                    handleClick={handleClick}
                    changePlayer={props.changePlayer}
                    xIsNext={props.xIsNext}
                    won={props.won}
                    boardSideLength={boardSideLength}
                />
            )
            counter++;

        }
        allSquares.push(squareRow)
        squareRow = [];
    }

    return (
        <div style={{ padding: "2em" }}>
            {props.isPlaying && (props.xIsNext ? <h3>X's turn</h3> : <h3>O's turn</h3>)}
            <div style={boardStyle} className="board">
                {allSquares}
            </div>
        </div>
    )
}
