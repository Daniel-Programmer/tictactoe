import React from 'react'

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    handleSubmit(event){
        event.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        const lengthForWin = this.props.lengthForWin;
        const field = this.props.field;
        const player = this.props.player;
        const handleSubmit = this.props.handleSubmit;
        
        return (
        <form onSubmit={handleSubmit} >

        <select value={player} onChange={(e)=> this.props.setPlayer(e.target.value)}>
            <option defaultValue value='X'>X</option>
            <option value='O'>O</option>
        </select>

            <input 
        name="lengthForWin"
        value={lengthForWin}
        onChange={(e)=> this.props.setLengthForwin(e.target.value)}
        type="number"
        placeholder="4" 
        />

        <input 
        name="field"
        value={field}
        onChange={(e)=> this.props.setField(e.target.value)}
        type="number"
        placeholder="5" 
        />

           
            <button type="submit">Set</button>
        </form>

        )
    }
}
