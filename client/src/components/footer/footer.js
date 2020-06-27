import React from 'react';
import './footer.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/NavbarBrand';

const Footer = () => {
    return (
        <div id="footer">
            <Navbar bg="dark">
                <Container id="footer-container">
                    <NavbarBrand>Blog by <Nav.Link className="nav-link" href="https://glumac7.github.io/">Nemanja Glumicic</Nav.Link></NavbarBrand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Footer;
