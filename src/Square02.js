import React from 'react';

export default class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fill: null,
        }
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(){
        if(this.state.fill != null){
            return
        }

        if(this.props.xIsNext){
            this.setState({fill: "X"})
        }
        else {
            this.setState({fill: "O"})
        }

        this.props.changePlayer()
        // this.props.lastFillPosition()
        this.props.handleClick(this.props.position)
    }

    render() {
        

        return (
            <div  
                className="square"
                onClick={this.handleClick}>
                {this.state.fill}
            </div>
        )
    }
}
