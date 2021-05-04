import React from 'react'
import ImageLoader from './ImageLoader'

export default class App extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return (
            <div className="main">
                <div className="imgField">
                    <ImageLoader/>
                </div>
            </div>
        )
    }
}