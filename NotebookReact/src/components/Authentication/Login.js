import React from 'react'
import { TextField, Typography, Button } from '@material-ui/core';
import {authenticationService} from '../../services/auth'
import styled from 'styled-components'


const StyledContainer = styled.div`
margin: auto;
width: 50%;

`;

const StyledBox = styled.div`
margin: 7px 7px 7px 7px;
`;

export default class Login extends React.Component{
    
    constructor(props){
      super(props)
      this.state = {
        email: '',
        password: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  const { updateLoginStatus } = useContext(UserProvider);


    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    setEmail(input){
      this.setState({email: input})
    }
    
    setPassword(input){
      this.setState({password: input})
    }

    async handleSubmit(event) {
        event.preventDefault();
        let response = await authenticationService.login(this.state.email, this.state.password)
        console.log(authenticationService.currentUserValue())
        if(response){
          this.props.history.push('/')
        }
    }

    render(){
        return (
          <StyledContainer>
            <div className="Login">
              <form>
                <Typography variant="h5" style={{ margin: 8 }}>
                  Login
                </Typography>
                <StyledBox>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    className="form-input"
                    value={this.state.email}
                    onChange={e => this.setEmail(e.target.value)}
                  />
                </StyledBox>
                <StyledBox>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    className="form-input"
                    type="password"
                    
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                  />
                </StyledBox>
                <StyledBox>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="form-input"
                    size="large"
                    onClick={this.handleSubmit}
                  >
                    Login
                  </Button>
                </StyledBox>
              </form>
            </div>
            </StyledContainer>
          );
    }
}