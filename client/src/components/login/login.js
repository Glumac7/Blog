import React from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Login = (props) => {

    const {onLogIn, handelChange, logInError} = props;

    return (
        <div id="login">
            <Container>
                
                    <Form onSubmit={onLogIn}>
                        <h1>
                            {
                                logInError ? logInError : null
                            }
                        </h1>
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

export default Login;
