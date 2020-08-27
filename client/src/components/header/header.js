import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { getFromStorage } from '../storage';
import { Redirect } from 'react-router-dom';

const Header = (props) => {

    const {toMain} = props;
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        if(toMain === "Logged in" || localStorage.getItem('user'))
        {
            setLoggedIn(true);
        }
        else setLoggedIn(false);
    });

    function logout() {

        const obj = getFromStorage('user');
        
        if (obj && obj.token) 
        {
          const { token } = obj;
          // Verify token
          fetch('/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) 
              {
                localStorage.removeItem('user');
                setLoggedIn(false);
              } 
            });
        } 
    }

    return (
        <div id="header">
            <Navbar bg="dark" variant="dark">

                <Link className="navbar-brand" to="/">Blog</Link>
                
                {loggedIn ?
                    <Nav className="ml-auto">
                        <Link className="nav-link" onClick={logout} to="/">Logout</Link> 
                    </Nav>
                : (
                    <Nav className="ml-auto">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/signup">Signup</Link>
                        <Redirect to='/login' />
                    </Nav> 
                )}
                
            </Navbar>
        </div>
    );
}

export default Header;
