/**
 * Created by think on 2018/1/31.
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button,List} from 'antd-mobile';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Button type="primary" >hello</Button>
                <List renderHeader={() => 'Basic Style'} className="my-list">
                    <List.Item extra={'extra content'}>title</List.Item>
                </List>
            </div>

        );
    }
}

export default App;
