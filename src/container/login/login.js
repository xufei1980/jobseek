/**
 * Created by think on 2018/2/7.
 */
import React,{Component} from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
import HocForm from '../../component/hocform/hocform'

// function WrapCom(Com) {
//    class wrc extends Component{
//        render(){
//            return (
//                <div>
//                    <h2>hello</h2>
//                    <Com {...this.props}></Com>
//                </div>
//            )
//        }
//    }
//     return wrc
// }
// @WrapCom
// class Hello extends Component{
//     render(){
//         return <h1>this is internal component</h1>
//     }
// }


@connect(state=>state.user,{login})
@HocForm
export default class Login extends Component{
    constructor(){
        super();
        this.register=this.register.bind(this);

    }
    register(){
        this.props.history.push('/register');
    }

    handleLogin=()=>{
        this.props.login(this.props.state);
    }

    render(){
        return(
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>user name</InputItem>
                        <InputItem onChange={v=>this.props.handleChange('pwd',v)} type="password">password</InputItem>
                        <WhiteSpace/>
                    </List>
                    <Button type="primary" onClick={this.handleLogin}>Login</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>Register</Button>
                </WingBlank>
                {/*<Hello/>*/}
            </div>
        )
    }
}