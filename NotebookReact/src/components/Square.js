import React, { Component } from 'react';

class Square extends Component{
    constructor(props){
        super(props);
        this.state = {
            example: null
        }
    }

    render(){
        return(
            <button className="square" onClick={() => this.setState({example: 'X'})}>
                {this.state.example}
            </button>
        )
    }
}

export default Square