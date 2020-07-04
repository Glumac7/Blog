import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main.css';

const Main = () => {
    
    const [customers, setCustomers] =  useState([]);
    const [filter, setFilter] =  useState(null);


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
                    </div>);

    useEffect(() => {

      fetch(`http://localhost:5000/all-blogs`)
          .then(res => res.json())
          .then(item => setCustomers(item));
            
    }, []);

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
    );
      
}

export default Main;

