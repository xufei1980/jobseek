/**
 * Created by think on 2018/2/7.
 */
import React,{Component} from 'react';
import LogoImg from './recruitment.jpg';
import './logo.css';
export default class Logo extends Component{
    render(){
        return(
            <div className="logo-container">
                <img src={LogoImg} alt="" />
                <p>Felix's Recruitment Demo</p>

            </div>
        )
    }
}