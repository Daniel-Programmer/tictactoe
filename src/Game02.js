import React from 'react';

import { Settings } from './Settings';
import { Board } from './Board';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xIsNext: true,
            field: 0,
            lengthForWin: 0,
            won: null,
            // isEndGame: false,
            isPlaying: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setLengthForwin = this.setLengthForwin.bind(this);
        this.handlePlayerWon = this.handlePlayerWon.bind(this);
        this.setPlayer = this.setPlayer.bind(this);
        this.setField = this.setField.bind(this);
        this.changePlayer = this.changePlayer.bind(this);
    }

    handleSubmit(event){
        // event.preventDefault();
        if (this.state.field !== 0 && this.state.lengthForWin !== 0){
            this.setState({ isPlaying: true })
        }
    }

    setLengthForwin(length){
        this.setState({ lengthForWin: length })
    }

    handlePlayerWon(player){
        this.setState({ won: player })
    }

    setPlayer(player){
        const startX = player === 'X' ? true : false; 
        this.setState({xIsNext: startX })
    }
    setField(field){
        this.setState({field: field})
    }

    changePlayer(){
        this.setState({xIsNext: !this.state.xIsNext})
    }

    render() {
        // const length = this.state.lengthForWin;
        // const field = this.state.field;
        const setPlayer= this.setPlayer;
        const setField= this.setField;
        const setLengthForwin = this.setLengthForwin;
        const handleSubmit = this.handleSubmit;
        const field = this.state.field;
        const player = (this.state.xIsNext ? 'X' : 'O');
        const lengthForWin = this.state.lengthForWin;
        const isPlaying = this.state.isPlaying;
        const xIsNext = this.state.xIsNext;

        const won = this.state.won;

        return (
            <div className="game">
                {isPlaying ? "" :
                 <Settings 
                    setPlayer={setPlayer}
                    setField={setField}
                    setLengthForwin={setLengthForwin}
                    handleSubmit={handleSubmit}
                    lengthForWin={lengthForWin}
                    field={field}
                    player={player}
                 />  
                }

                {isPlaying && <Board changePlayer={this.changePlayer} xIsNext={xIsNext} field={field}/>}
                {won != null && "The " + won +" won"}
            </div>
        )
    }
}

