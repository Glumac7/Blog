import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
    return (
        <div id="header">
            <Navbar bg="dark" variant="dark">
                <Link className="navbar-brand" to="/">Blog</Link>
                <Nav className="ml-auto">
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/signup">Signup</Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;
