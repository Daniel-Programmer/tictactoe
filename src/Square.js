import React, { useState } from 'react';

export const Square = (props) => {
    const [fill,setFill] = useState(null);

    const handleClick = () =>{
        if(fill != null || props.won){
            return
        }

        if(props.xIsNext){
            setFill("X");
        }
        else {
            setFill("O");
        }

        props.changePlayer()
        // this.props.lastFillPosition()
        props.handleClick(props.position)
    }

    const styleOfSquare = {
        width: props.squareWidth,
        height: props.squareWidth,
    }

        return (
            <div  
                style={styleOfSquare}
                className="square"
                onClick={handleClick}>
                {fill}
            </div>
        )
}

