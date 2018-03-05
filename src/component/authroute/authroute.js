/**
 * Created by think on 2018/2/7.
 */
import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux';
@withRouter
@connect(
    null,
    {loadData}
)
export default class AuthRoute extends Component{
    componentDidMount(){
        //login finished?
        //if current url is login need not to redirect
        //the type of user, user or boss?
        //if the user has complete the information?
        const publicList=['/login','/register'];
        const pathname=this.props.location.pathname;
        if (publicList.indexOf(pathname)>-1){
            return null;
        }
        axios.get('/user/info')
            .then(res=>{
                if(res.status===200){
                    if(res.data.code===0){
                        this.props.loadData(res.data.data);
                    }else {

                        this.props.history.push('/login');
                    }

                }
            })

    }
    render(){
        return(
            <div>

            </div>
        )
    }
}