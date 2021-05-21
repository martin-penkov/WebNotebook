import React from 'react';

export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          email: '',
          setEmail: '',
          password: '',
          setPassword: ''
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }
    
    handleSubmit(event) {
        event.preventDefault();

        
    }


    render(){
        return ('')
    }
}