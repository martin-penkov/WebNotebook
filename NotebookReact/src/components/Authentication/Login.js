import { React, useState, useContext } from 'react'
import { TextField, Typography, Button } from '@material-ui/core';
import {authenticationService} from '../../services/auth'
import styled from 'styled-components'
import { AuthContext } from './../../contexts/AuthContext'
import { useHistory } from "react-router";

const StyledContainer = styled.div`
margin: auto;
width: 50%;

`;

const StyledBox = styled.div`
margin: 7px 7px 7px 7px;
`;

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const validateForm = () => {
      return this.state.email.length > 0 && this.state.password.length > 0;
  }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await authenticationService.login(email, password)
        console.log(authenticationService.currentUserValue())
        if(response){
          history.push('/')
        }
        setUser(authenticationService.currentUserValue())
    }

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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </StyledBox>
              <StyledBox>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  className="form-input"
                  type="password"
                  
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </StyledBox>
              <StyledBox>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="form-input"
                  size="large"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </StyledBox>
            </form>
          </div>
          </StyledContainer>
        );
}