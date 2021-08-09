import React from 'react'

export default class Photo extends React.Component{
    getImage(){
        let outside;
        let fetchUrl = 'https://localhost:44319/api/Images/1'

        fetch(fetchUrl)
            .then(response => console.log(response))
            
        return outside
    }
    

    render(){
        let image = this.getImage()
        
        return (
            <div>
                <img src="https://localhost:44319/api/Images/1"/>
            </div>
        )
    }
}