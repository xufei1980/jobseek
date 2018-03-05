/**
 * Created by think on 2018/2/13.
 */
/**
 * Created by think on 2018/2/12.
 */
import React,{Component} from 'react';
import { NavBar, InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelect from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {update}
)
export default class GeniusInfo extends Component{
    constructor(){
        super();
        this.state={
            title:'',
            desc:'',
            avatar:''
        }
    }
    onChange=(key,val)=>{
        this.setState({[key]:val})
    }
    render(){
        const path=this.props.location.pathname;
        const redirectTo=this.props.redirectTo;
        return(
            <div>
                {redirectTo&&redirectTo!==path?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark">Genius Improve Information</NavBar>
                <AvatarSelect selectAvatar={(imageName)=>{
                    this.setState({avatar:imageName})

                }}/>
                <InputItem onChange={v=>this.onChange('title',v)}>Job</InputItem>

              <TextareaItem  autoHeight
                               rows={5}
                               title="Experience"
                             labelNumber={10}
                               onChange={v=>this.onChange('desc',v)}/>
                <Button type="primary" onClick={
                    ()=>{
                        this.props.update(this.state)
                    }
                }>save</Button>
            </div>
        )
    }
}