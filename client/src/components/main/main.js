import React, { useEffect, useState } from 'react';

import './main.css';

const Main = () => {

    const [customers, setCustomers] =  useState([]);

    useEffect(() => {

        fetch(`/api/customers`)
            .then(res => res.json())
            .then(item => setCustomers(item));
    }, []);

    return (
        <div id="main">

            {
                customers.map(item => <div key={item.id}>
                    <h1>{item.firstName}</h1>
                    <p>{item.lastName}</p>
                    <br/>
                </div>)
            }            

        </div>
    );
}

export default Main;

