/**
 * Created by think on 2018/2/17.
 */
import React,{Component} from 'react';
export default function HocForm(Comp){
    return class WrapperComp extends Component{
        constructor(){
            super();
            this.state={}
        }
        handleChange=(key,val)=>{
            this.setState({
                [key]:val
            })
        }
        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
        }
    }
}