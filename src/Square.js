import React, { useState } from 'react';

export const Square = (props) => {
    const [fill, setFill] = useState(null);

    const handleClick = () => {
        if (fill != null || props.won) {
            return
        }

        if (props.xIsNext) {
            setFill("X");
        }
        else {
            setFill("O");
        }

        props.changePlayer()
        props.handleClick(props.position)
    }


    return (
        <div
            className="square"
            onClick={handleClick}>
            {fill}
        </div>
    )
}

