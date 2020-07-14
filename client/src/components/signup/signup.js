import React, { useState, useEffect } from 'react';
import './signup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useHistory, Redirect } from 'react-router-dom';

const Signup = () => {

    const [signUpError, setSignUpError] = useState('');
    const [signUpFirstName, setSignUpFirstName] = useState('');
    const [signUpLastName, setSignUpLastName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    (function IFFE() {
        if(localStorage.getItem('user'))
        {
            useHistory().push('/');
        }
    }())

    useEffect(() => {

    }, [])

    function handelChange (event)
    {
        const {name, value} = event.target;

        switch (name) {
            case "firstName":
                setSignUpFirstName(value);
                break;
            case "lastName":
                setSignUpLastName(value);
                break;
            case "email":
                setSignUpEmail(value);
                break;
            case "password":
                setSignUpPassword(value);
                break;
            default:
                break;
        }
        console.log(value + " " + name)
    }

    function onSignUp(e) {
        e.preventDefault();
    
        // Post request to backend
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: signUpFirstName,
            lastName: signUpLastName,
            email: signUpEmail,
            password: signUpPassword,
          })
        })
          .then(res => res.json())
          .then(json => { setSignUpError(json.message); });
    }

    return (
        <div id="signup">
            <Container>
                <Form onSubmit={onSignUp} >
                    <h1>
                        {
                            (signUpError === "Signed up") ? <Redirect to={'/login'} /> : (signUpError) ? signUpError : null
                        }
                    </h1>

                    <Form.Group>
                        <Form.Label>Your name</Form.Label>
                        <Form.Control name="firstName" onChange={handelChange} type="text" placeholder="Enter first name" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control name="lastName" onChange={handelChange} type="text" placeholder="Enter last name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" value={signUpEmail} onChange={handelChange} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={signUpPassword} onChange={handelChange} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default Signup;
