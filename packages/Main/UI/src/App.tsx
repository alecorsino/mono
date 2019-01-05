import React, { Component } from 'react';
import './App.css';
import { Combo } from './components/Combo';
import { Logger } from './components/logger';
import logo from './logo.svg';

class App extends Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <Logger title={'Write Something'} />
                    <Combo />
                </header>
            </div>
        );
    }
}

export default App;
