/**
 * Created by think on 2018/2/16.
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
@withRouter
export default class UserCard extends Component{
    static propTypes={
        userlist:PropTypes.array.isRequired
    }
    handleClick=(v)=>{
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){

        const Header=Card.Header;
        const Body=Card.Body;
        return(
            <WingBlank>
                <WhiteSpace/>
                {
                    this.props.userlist.map(v=>(
                        v.avatar?(<Card key={v._id}
                              onClick={()=>this.handleClick(v)}
                        >
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >

                            </Header>
                            <Body>
                            {v.type==='boss'?<div style={{color:'blue'}}>company:{v.company}</div>:null}
                            {v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                            {v.type==='boss'?<div style={{color:'green'}}>salary:{v.money}</div>:null}
                            </Body>
                        </Card>):null
                    ))
                }
            </WingBlank>

        )
    }
    }


