import React from 'react';
// import PropTypes from 'prop-types';

import Square from './Square';

export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lastFillPosition: null,
            filledO: [],
            filledX: [],
        }
        this.handleClick = this.handleClick.bind(this)
    }


  
    handleClick(e){
        this.setState({lastFillPosition: e});
            if(this.props.xIsNext === true){
                this.setState((pros,prev) =>  ({filledX: [...prev, this.state.lastFillPosition] }));
                
            }

            else if(this.props.xIsNext === false){
                this.setState({ filledO: [this.state.lastFillPosition] });
            }
        
    }

   

    render() {
        


        const field = Number(this.props.field);
        const wholeField = field * field;
        // let forEndRow = Number(this.props.field - 1);
        let allSquares = [];

        

        
        // const arraySquares = new Array(field).fill(0);

        // for (let i = 0; i < wholeField; i++) {
        //     if((i / forEndRow) == 1) {
        //         allSquares.push(<div className="row"><Square field={this.props.field} key={i} /><div className="break"></div></div>);
        //         forEndRow += field;
        //     }
        //     else {
        //         allSquares.push(<div className="row"><Square field={this.props.field} key={i} /></div>);
        //     }
        //   }

            for (let i = 0; i < wholeField; i++) {
                allSquares.push(
                    <Square 
                        key={i}
                        position={i} 
                        handleClick={this.handleClick}
                        changePlayer={this.props.changePlayer} 
                        xIsNext={this.props.xIsNext} 
                        field={this.props.field} 
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
}


// function calculateWinner(squares){

// }


// Board.propTypes = {
//     field: PropTypes.number,
//     lengthForWin: PropTypes.number
// }