import { React, useState, useContext } from 'react'
import { TextField, Typography, Button } from '@material-ui/core';
import {authenticationService} from '../../services/auth'
import styled from 'styled-components'
import { AuthContext } from './../../contexts/AuthContext'
import { useHistory } from "react-router";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";

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

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').min(3,'Name must be at least 3 characters long'),
    password: Yup.string().required('Required').min(4, "Passwords must be at least 4 characters long"),
  })
  const renderError = (message) => <p className="help is-danger">{message}</p>;

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
          <Formik
            validationSchema={validationSchema}>
            <Form>
              <Typography variant="h5" style={{ margin: 8 }}>
                Login
              </Typography>
              <StyledBox>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <ErrorMessage name="email" render={renderError} />
              </StyledBox>
              <StyledBox>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  className="form-input"
                  type="password"
                  
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <ErrorMessage name="password" render={renderError} />
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
            </Form>
            </Formik>
          </div>
          </StyledContainer>
        );
}