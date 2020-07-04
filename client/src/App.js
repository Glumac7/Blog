import React, { useState } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { setInStorage } from './components/storage';

const App = () => {
 
  const [logInEmail, setLogInEmail] = useState('');
  const [token, setToken] = useState('');
  const [logInError, setLogInError] = useState('');
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
    fetch('/login', {
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
        
        setLogInError(json.message);

        if (json.success) 
        {
            setInStorage('user', { token: json.token });
            setLogInPassword('');
            setLogInEmail('');
            setToken(json.token);
        }

    });
  }

  /*
    homepage not available when not logged in, so redirect the user to login page
    login and signup not available when logged in
    on a successful login redirect to homepage
    add all of the blogs to the cluster under the logged in user
  */

  return (
    <div className="App">

        <Router>
          <Header/>

          <Switch>
              <Route exact path="/">
                  <Main />
              </Route>
              <Route path="/login">
                  <Login onLogIn={onLogIn} handelChange={handelChange} logInError={logInError}/>
              </Route>
              <Route path="/signup">
                  <Signup />
              </Route>
          </Switch>

          <Footer/>
        </Router>
      
    </div>
  );
}

export default App;
