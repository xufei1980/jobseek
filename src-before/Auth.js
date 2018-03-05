/**
 * Created by think on 2018/2/1.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login,getUserData} from './Auth.redux';

@connect(
    state=>state.auth,
    {login,getUserData}
)
export default class Auth extends Component {

    componentDidMount() {
        this.props.getUserData();
    }
    render() {
        console.log(this.porps);
        return (
            <div>

                {this.props.isAuth?<Redirect to='/dashboard'/>:null}
                <h2>{this.props.user}</h2>
                <h1>{this.props.age}</h1>
                no auth,need to login
                <button onClick={this.props.login}>login</button>
            </div>
        )
    }
}