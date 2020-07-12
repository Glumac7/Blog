import React, { useState } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Redirect } from "react-router-dom";
import { setInStorage } from '../storage';

const Login = (props) => {

    const {funcToMain} = props;
    const [logInEmail, setLogInEmail] = useState('');
    const [logInError, setLogInError] = useState(true);
    const [logInPassword, setLogInPassword] = useState('');        

    function handelChange (event)
    {
        const {name, value} = event.target;

        switch (name) {

            case "email":
                setLogInEmail(value);
                break;
            case "password":
                setLogInPassword(value);
                break;
            default:
                break;
        }
    }
  
    function onLogIn(e) {
        
        e.preventDefault();
        
        // Post request to backend
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: logInEmail,
                password: logInPassword,
            }),
        })
        .then(res => res.json())
        .then(json => {

            if (json.success) 
            {
            setInStorage('user', { token: json.token });
            setLogInError(false);
            funcToMain("Logged in");
            }
            
        });
    }

    if(!logInError || localStorage.getItem('user'))
    {
        return <Redirect to={'/'} />
    }
    else
    {
        return (
            <div id="login">
                <Container>
                    
                        <Form onSubmit={onLogIn}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" onChange={handelChange} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" onChange={handelChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>

                </Container>
            </div>
        );
    }
}

export default Login;
