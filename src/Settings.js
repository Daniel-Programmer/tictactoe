import React from 'react'

export const Settings = ({ 
    handleSubmit,
    player,
    setPlayer,
    lengthForWin,
    setLengthForWin,
    field,
    setField,
    warning,
 }) => {

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.handleSubmit();
    // }
        
        return (
        <form onSubmit={handleSubmit} >
            <label>
            <h3>Player starts:</h3>
            
            <select value={player} onChange={(e)=> setPlayer(e.target.value)}>
                <option defaultValue value='X'>X</option>
                <option value='O'>O</option>
            </select>
            </label>
            <label>
            <h3>Length for win game (2 - 10):</h3>
            <input 
                name="lengthForWin"
                value={lengthForWin}
                onChange={(e)=> setLengthForWin(e.target.value)}
                type="number"
                min="2" max="10"
            />
            </label>
            <label>
            <h3>Field Size (3 - 50):</h3>
            <input 
                name="field"
                value={field}
                onChange={(e)=> setField(e.target.value)}
                type="number"
                min="3" max="50" 
            />
            </label>

            <br />
            {warning && <p className='warning'>Length for win cannot be greater than field size</p>}
            

            <button className='btn btn-submit' type="submit">Let's play!</button>
        </form>

        )
}

