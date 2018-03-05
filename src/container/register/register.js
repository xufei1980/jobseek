/**
 * Created by think on 2018/2/7.
 */
import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import '../../css/index.css';
@connect(
    state=>state.user,
    {register}
)
export default class Register extends React.Component{
    constructor(){
        super();
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'//or 'boss'
        }
    }
    handleChange=(key,val)=>{
        this.setState({
            [key]:val
        })
    }
    handleRegister=()=>{
        this.props.register(this.state)
        console.log(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem;


        return(
            <div>
                {(this.props.redirectTo)?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                <WingBlank>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <List>
                        <InputItem onChange={v=>this.handleChange('user',v)}>user name</InputItem>
                        <InputItem onChange={v=>this.handleChange('pwd',v)} type='password'>password</InputItem>
                        <InputItem onChange={v=>this.handleChange('repeatpwd',v)} type='password'>confirm</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type==="genius"}
                                   onChange={()=>this.handleChange('type','genius')}>Genius</RadioItem>
                        <RadioItem checked={this.state.type==="boss"}
                                   onChange={()=>this.handleChange('type','boss')}>Boss</RadioItem>
                        <Button type="primary" onClick={this.handleRegister}>Register</Button>
                    </List>

                </WingBlank>
            </div>
        )
    }
}