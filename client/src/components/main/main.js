import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import './main.css';

const Main = () => {
    
    const [customers, setCustomers] =  useState([]);
    const [filter, setFilter] =  useState(null);
    
    function handleChange(event) {
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
    }).map(item => <div key={item._id}>
        <h1>{item.title}</h1>
        <p>{item.snippet}</p>
        <p>{item.body}</p>
        <br/>
    </div>)

    useEffect(() => {

        fetch(`/all-blogs`)
            .then(res => res.json())
            .then(item => setCustomers(item));
            
    }, []);

    return (
        <Container id="main">
            <Form.Group>
                <Form.Control type="text" placeholder="Blog name..." onChange={handleChange}/>
            </Form.Group>
            
            <div id="main-container">
                {blog}            
            </div>   
            

        </Container>
    );
}

export default Main;

