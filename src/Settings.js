import React from 'react'

export const Settings = ({
    submitSettings,
    player,
    setStartingPlayer,
    lengthForWin,
    setLengthForWin,
    field,
    setboardSideLength,
    warning,
}) => {

    const minLengthForWin = 3;
    const maxLengthForWin = 6;

    const minboardSideLength = 3;
    const maxboardSideLength = 50;

    return (
        <form onSubmit={submitSettings} >
            <label>
                <h3>Player starts:</h3>

                <select value={player} onChange={(e) => setStartingPlayer(e.target.value)}>
                    <option defaultValue value='X'>X</option>
                    <option value='O'>O</option>
                </select>
            </label>
            <label>
                <h3>Length for win game ({minLengthForWin} - {maxLengthForWin}):</h3>
                <input
                    name="lengthForWin"
                    value={lengthForWin}
                    onChange={(e) => setLengthForWin(e.target.value)}
                    type="number"
                    min={minLengthForWin}
                    max={maxLengthForWin}
                />
            </label>
            <label>
                <h3>Field Size ({minboardSideLength} - {maxboardSideLength}):</h3>
                <input
                    name="field"
                    value={field}
                    onChange={(e) => setboardSideLength(e.target.value)}
                    type="number"
                    min={minboardSideLength}
                    max={maxboardSideLength}
                />
            </label>

            <br />
            {warning && <p className='warning'>Length for win cannot be greater than field size</p>}


            <button className='btn btn-submit' type="submit">Let's play!</button>
        </form>

    )
}

