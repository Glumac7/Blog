import React, { Component } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>

        <Main />

        <Footer/>
      </div>
    );
  }
}

export default App;
