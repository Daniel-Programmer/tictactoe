import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { Square } from './Square';



export const Board = (props) => {
    const [lastFillPosition, setLastFillPosition] = useState(null);
    const [filledO, setFilledO] = useState([]);
    const [filledX, setFilledX] = useState([]);
    
    const handleClick = (e) => {
            setLastFillPosition(e);
            if(props.xIsNext === true){
                setFilledX((prev) => ([ ...prev, e]))
            }

            else if(props.xIsNext === false){
                setFilledO((prev) => ([ ...prev, e]))
            }
    }

        const field = Number(props.field);
        const wholeField = field * field;
        let allSquares = [];
        

            for (let i = 0; i < wholeField; i++) {
                allSquares.push(
                    <Square 
                        key={i}
                        position={i} 
                        handleClick={handleClick}
                        changePlayer={props.changePlayer} 
                        xIsNext={props.xIsNext} 
                        field={props.field} 
                    />
                );
            }
    

          const width= field * 36;
          const myStyle = {
            width: width,
        }

        

        return (
            <div style={myStyle} className="board">
                {/* {arraySquares.map((square, index ) => index % forEndRow === 0 && index >= forEndRow ?  (<div className="row"><Square key={index} /><div className="break"></div></div>) : (<div className="row"><Square key={index} /></div>) )} */}
                {allSquares}
                {/* {console.log(filledO)} */}
                {/* {console.log(filledX)} */}
            </div>
        )
    }


function calculateWinner(squares){
    
}


// Board.propTypes = {
//     field: PropTypes.number,
//     lengthForWin: PropTypes.number
// }