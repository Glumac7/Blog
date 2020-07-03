import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main.css';

/*import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';*/

const Main = () => {
    
    const [customers, setCustomers] =  useState([]);
    const [filter, setFilter] =  useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [logInError, setLogInError] = useState('');
    const [logInEmail, setLogInEmail] = useState('');
    const [logInPassword, setLogInPassword] = useState('');

    function onTextboxChangeLogInEmail (event)
    {
        setLogInEmail(event.target.value);
    }

    function onTextboxChangeLogInPassword (event)
    {
        setLogInPassword(event.target.value);
    }

    function onTextboxChangeSignUpEmail (event)
    {
        setSignUpEmail(event.target.value);
    }

    function onTextboxChangeSignUpPassword (event)
    {
        setSignUpPassword(event.target.value);
    }

    function onSignUp() {

        setIsLoading(true);
    
        // Post request to backend
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: signUpEmail,
            password: signUpPassword,
          })
        })
          .then(res => res.json())
          .then(json => {

            console.log('json', json);

            if(json.success) 
            {
                setSignUpError(json.message);
                setIsLoading(false);
                setSignUpEmail('');
                setSignUpPassword('');
            } 
            else 
            {
                setSignUpError(json.message);
                setIsLoading(false);
            }
          });
    }

    /*function onLogIn() {

        setIsLoading(true);

        // Post request to backend
        fetch('/signin', {
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

            console.log('json', json);

            if (json.success) 
            {
                setInStorage('the_main_app', { token: json.token });
                setLogInError(json.message);
                setIsLoading(false);
                setLogInPassword('');
                setLogInEmail('');
                setToken(json.token);
            }
            else 
            {
                setLogInError(json.message);
                setIsLoading(false);
            }
        });
    }*/

    /*function logout() {

        setIsLoading(true);

        const obj = getFromStorage('the_main_app');
        
        if (obj && obj.token) 
        {
          const { token } = obj;
          // Verify token
          fetch('/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) 
              {
                localStorage.removeItem('the_main_app');
                setToken('');
                setIsLoading(false);
              } 
              else 
              {
                setIsLoading(false);
              }
            });
        } 
        else 
        {
            setIsLoading(false);
        }
    }*/

    function handelSearch(event) {
        const {value} = event.target;
        setFilter(value);
    }

    const blog = customers.filter(data => {
        if(filter == null) 
        {
            return data;
        }
        else if(data.title.toLowerCase().includes(filter.toLowerCase())){
            return data;
        }
        else return 0;
    }).map(item => <div id="individual-blog" key={item._id}>
        <h1>{item.title}</h1>
        <h5>{item.snippet}</h5>
        <p>{item.body}</p>
        <br/>
    </div>)

    useEffect(() => {

        fetch(`http://localhost:5000/all-blogs`)
            .then(res => res.json())
            .then(item => setCustomers(item));
            
    }, []);

    /*if (isLoading)
    {
        return (
            <Container id="main">
                <Row>
                    <Col style={{margin: 20, backgroundColor: "#fff"}}> 
                        <Form.Group>
                            <Form.Label>Search blogs by name</Form.Label>
                            <Form.Control type="text" placeholder="Enter blog name..." onChange={handelSearch}/>
                        </Form.Group>
                    </Col>
                    <Col style={{margin: 20, backgroundColor: "#fff"}}>
                        <Form method="POST" action="http://localhost:5000/blogs">
                            <Form.Group>
                                <Form.Label>Add a blog</Form.Label>
                                <Form.Control type="text" name="title" placeholder="Enter blog name..." required/>
                                <Form.Control type="text" name="snippet" placeholder="Enter blog snippet..." required/>
                                <Form.Control as="textarea" name="body" placeholder="Enter blog body..." required/>
                                <Button type="submit" style={{width: "100%"}} variant="primary">Add blog</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            
                <div id="main-container">
                    Loading...           
                </div>   
                

            </Container>
            
        )
    }

    return (
        <Container id="main">
            <Row>
                <Col style={{margin: 20, backgroundColor: "#fff"}}> 
                    <Form.Group>
                        <Form.Label>Search blogs by name</Form.Label>
                        <Form.Control type="text" placeholder="Enter blog name..." onChange={handelSearch}/>
                    </Form.Group>
                </Col>
                <Col style={{margin: 20, backgroundColor: "#fff"}}>
                    <Form method="POST" action="http://localhost:5000/blogs">
                        <Form.Group>
                            <Form.Label>Add a blog</Form.Label>
                            <Form.Control type="text" name="title" placeholder="Enter blog name..." required/>
                            <Form.Control type="text" name="snippet" placeholder="Enter blog snippet..." required/>
                            <Form.Control as="textarea" name="body" placeholder="Enter blog body..." required/>
                            <Button type="submit" style={{width: "100%"}} variant="primary">Add blog</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
           
            <div id="main-container">
                {blog}            
            </div>   
            

        </Container>
    );*/
      if (!token) {
        return (
          <div>
            <div>
              {
                (logInError) ? (
                  <p>{logInError}</p>
                ) : (null)
              }
              <p>Sign In</p>
              <input
                type="email"
                placeholder="Email"
                value={logInEmail}
                onChange={onTextboxChangeLogInEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={logInPassword}
                onChange={onTextboxChangeLogInPassword}
              />
              <br />
              <button>Sign In</button>
            </div>
            <br />
            <br />
            <div>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <p>Sign Up</p>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={onTextboxChangeSignUpEmail}
              /><br />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={onTextboxChangeSignUpPassword}
              /><br />
              <button onClick={onSignUp}>Sign Up</button>
            </div>
         </div>
        );
      }
      return (
        <div>
          <p>Signed in</p>
        </div>
      );
}

export default Main;

