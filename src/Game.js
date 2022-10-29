import React, { useState } from 'react';

import { Settings } from './Settings';
import { Board } from './Board';

export const Game = () => {

    const [xIsNext,setXIsNext] = useState(true);
    const [field,setField] = useState(3);
    const [lengthForWin,setLengthForWin] = useState(3);
    const [won,setWon] = useState(null);
    const [isPlaying,setIsPlaying] = useState(false);
    const [warning,setWarning] = useState(false);

    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (field !== 0 && lengthForWin !== 0 && field >= lengthForWin){
            setIsPlaying( true );
            setWon(null);
            setWarning(false);
        }
        else {
            setWarning(true);
        }
    }

    // const handlePlayerWon = (player) => {
    //     setWon( player );
    // }

    const setPlayer = (player) => {
        const startX = player === 'X' ? true : false; 
        setXIsNext( startX );
    }

    const changePlayer = () => {
        setXIsNext((prev) => !prev );
    }

        return (
            <div className="game">
                <h1 className=''>TIC TAC TOE (PvP)</h1>
                <p></p>
                {(!isPlaying && !won) &&
                 <Settings 
                    setPlayer={setPlayer}
                    setField={(e) => setField(Number(e))}
                    setLengthForWin={(e) => setLengthForWin(Number(e))}
                    handleSubmit={handleSubmit}
                    lengthForWin={lengthForWin}
                    field={field}
                    player={xIsNext ? 'X' : 'O'}
                    warning={warning}
                 />  
                }
                {(isPlaying || won) && <button className='btn btn-newgame' onClick={() => {setIsPlaying(false) ; setWon(false)}} >NEW GAME</button>}
                {won && <h2>The {won} won 👏</h2> }
                {(isPlaying || won) &&
                    <Board 
                        changePlayer={changePlayer} 
                        xIsNext={xIsNext} 
                        field={field}
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


