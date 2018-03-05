/**
 * Created by think on 2018/2/1.
 */
import React,{Component} from 'react';
import {Link,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './Auth.redux'
import App from './App'
function erying() {
    return <h1>二营</h1>
}
function sanying() {
    return <h1>三营</h1>
}
class Test extends React.Component{
    render(){
        console.log(this.props);
        return <h1>test</h1>
    }


}
@connect(
    state=>state.auth,
    {logout}
)
export default class Dashboard extends Component{
    render(){
        const match=this.props.match.url;
        console.log(match);
        console.log(this.props);
        const redirectTologin=<Redirect to='login'/>
        const app=( <div>
            {this.props.isAuth?<button onClick={this.props.logout}>logout</button>:null}
            <ul>
                <li><Link to={`${match}`}>一营</Link></li>
                <li><Link to={`${match}/erying`}>二营</Link></li>
                <li><Link to={`${match}/sanying`}>三营</Link></li>
            </ul>
            <Route path={`${match}`} exact component={App}/>
            <Route path={`${match}/erying`} component={erying}/>
            <Route path={`${match}/sanying`} component={sanying}/>

        </div>)
        return this.props.isAuth?app:redirectTologin
    }
}