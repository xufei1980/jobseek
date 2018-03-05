/**
 * Created by think on 2018/2/14.
 */
import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLink from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import Msg from '../msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux';


@connect(
    state=>state,
    {getMsgList,recvMsg}
)
export default class Dashboard extends Component{
    componentDidMount(){

        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }


    }

    render(){
        const user=this.props.user;

        const pathname=this.props.location.pathname;

        const navList=[
            {
                path:'/boss',
                text:'genius',
                icon:'boss',
                title:'Genius List',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'Boss',
                icon:'job',
                title:'Job List',
                component:Genius,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'messages',
                icon:'msg',
                title:'MSG List',
                component:Msg
            },
            {
                path:'/me',
                text:'Myself',
                icon:'user',
                title:'User',
                component:User
            }

        ]

        return(
            (pathname==="/boss"||pathname==="/genius"
            ||pathname==="/msg"||pathname==="/me")?(<div>
                <NavBar className="fixed-header" mode="dark" >{navList.find(v=>v.path===pathname).title}</NavBar>
               <div style={{marginTop:'45px'}}>
                   <Switch>
                       {navList.map(v=>(
                           <Route key={v.path} path={v.path} component={v.component}/>
                       ))}
                   </Switch>
               </div>
                <NavLink data={navList}/>
            </div>):<Redirect to='/login'></Redirect>
        )
    }
}