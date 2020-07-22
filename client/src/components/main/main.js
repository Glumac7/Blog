import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';

import './main.css';

const Main = (props) => {
    
    const [customers, setCustomers] =  useState([]);
    const [filter, setFilter] =  useState(null);
    const [title, setTitle] = useState('');
    const [snippet, setSnippet] = useState('');
    const [body, setBody] = useState('');
    const {token} = JSON.parse(localStorage.getItem('user')) || "";
    const {toMain} = props;

    if(toMain !== "Logged in" && !localStorage.getItem('user'))
    {
        return <Redirect to={'/login'} />
    }
    else
    {
        function handelSearch(event) {
            const {value} = event.target;
            setFilter(value);
        }

        function handelChange (event)
        {
            const {name, value} = event.target;

            switch (name) {
                case "title":
                    setTitle(value);
                    break;
                case "snippet":
                    setSnippet(value);
                    break;
                case "body":
                    setBody(value);
                    break;
                default:
                    break;
            }
            console.log(value + " " + name)
        }

        function addBlog(e) {
            e.preventDefault();

            console.log(token);
            
            fetch('http://localhost:5000/blogs', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: title,
                  snippet: snippet,
                  body: body,
                  token: token
                })
              })
                .then(res => res.json())
                .then(json => { 
                    if(json.success)
                    {
                        let oldCustomers = customers;
                        oldCustomers.push({
                            title,
                            snippet,
                            body,
                            token
                        })
                        console.log(oldCustomers)
                        setCustomers(oldCustomers)
                        setTitle('');
                        setSnippet('');
                        setBody('');
                    }
                });

            
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
        }).map(item => <div id="individual-blog" key={Math.floor(Math.random() * Math.floor(1000000))}>
                            <h1>{item.title}</h1>
                            <h5>{item.snippet}</h5>
                            <p>{item.body}</p>
                            <br/>
                        </div>);
    
    
        useEffect(() => {
            let isCancelled = false;

            if(!isCancelled)
            {

                fetch(`http://localhost:5000/all-blogs`, 
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify({token: token})
                })
                .then(value => {
    
                    fetch(`http://localhost:5000/all-blogs`)
                        .then(res => res.json())
                        .then(item => setCustomers(item))
                        .catch(err => {
                            console.log(err);
                        })                    
                })
                .catch(err => console.log(err));
            }
            return () => {
                isCancelled = true;
            }
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
                        <Form onSubmit={addBlog}>
                            <Form.Group>
                                <Form.Label>Add a blog</Form.Label>
                                <Form.Control value={title} onChange={handelChange} type="text" name="title" placeholder="Enter blog name..." required/>
                                <Form.Control value={snippet} onChange={handelChange} type="text" name="snippet" placeholder="Enter blog snippet..." required/>
                                <Form.Control value={body} onChange={handelChange} as="textarea" name="body" placeholder="Enter blog body..." required/>
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
    
}

export default Main;

