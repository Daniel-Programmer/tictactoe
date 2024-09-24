import React, { useState } from 'react';

import { Settings } from './Settings';
import { Board } from './Board';

export const Game = () => {

    const [xIsNext, setXIsNext] = useState(true);
    const [boardSideLength, setboardSideLength] = useState(3);
    const [lengthForWin, setLengthForWin] = useState(3);
    const [won, setWon] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [warning, setWarning] = useState(false);


    const submitSettings = (event) => {
        event.preventDefault();
        if (boardSideLength !== 0 && lengthForWin !== 0 && boardSideLength >= lengthForWin) {
            setIsPlaying(true);
            setWon(null);
            setWarning(false);
        }
        else {
            setWarning(true);
        }
    }

    const setStartingPlayer = (player) => {
        const startX = player === 'X' ? true : false;
        setXIsNext(startX);
    }

    const changePlayer = () => {
        setXIsNext((prev) => !prev);
    }

    return (
        <div className="game">
            <h1 className=''>TIC TAC TOE (PvP)</h1>
            <p></p>
            {(!isPlaying && !won) &&
                <Settings
                    setStartingPlayer={setStartingPlayer}
                    setboardSideLength={(e) => setboardSideLength(Number(e))}
                    setLengthForWin={(e) => setLengthForWin(Number(e))}
                    submitSettings={submitSettings}
                    lengthForWin={lengthForWin}
                    field={boardSideLength}
                    player={xIsNext ? 'X' : 'O'}
                    warning={warning}
                />
            }
            {(isPlaying || won) && <button className='btn btn-newgame' onClick={() => { setIsPlaying(false); setWon(null) }} >NEW GAME</button>}
            {won && (won === 'OX' ? <h2>It's a Draw <span role="img" aria-label="Shaking hands">🤝</span></h2> : <h2>The {won} won <span role="img" aria-label="Applause">👏</span></h2>)}
            {(isPlaying || won) &&
                <Board
                    changePlayer={changePlayer}
                    xIsNext={xIsNext}
                    boardSideLength={boardSideLength}
                    handlePlayerWon={(e) => setWon(e)}
                    lengthForWin={lengthForWin}
                    setIsPlaying={(e) => setIsPlaying(e)}
                    isPlaying={isPlaying}
                    setXIsNext={(e) => setXIsNext(e)}
                    won={won}
                />
            }
        </div>
    )
}


