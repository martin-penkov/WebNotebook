import React from 'react'

export default class Login extends React.Component{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
    handleSubmit(event) {
        event.preventDefault();
      }

    render(){
        return (
            <div className="Login">
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                  Login
                </Button>
              </Form>
            </div>
          );
    }
}