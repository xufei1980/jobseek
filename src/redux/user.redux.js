/**
 * Created by think on 2018/2/7.
 */
import axios from 'axios';
import {getRedirectPath} from '../util';
import browserCookie from 'browser-cookies';
// const REGISTER_SUCCESS='REGISTER_SUCCESS';
const ERROR_MSG='ERROR_MSG';
// const LOGIN_SUCCESS='LOGIN_SUCCESS';
const AUTH_SUCCESS='AUTH_SUCCESS';
const LOAD_DATA='LOAD_DATA';
const LOG_OUT='LOG_OUT';
const initState={
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
export function user(state=initState,action) {
    switch(action.type){
        // case REGISTER_SUCCESS:
        //     return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return{...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        // case LOGIN_SUCCESS:
        //     return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOG_OUT:{
             browserCookie.erase('userid')
            return {...initState,redirectTo:'/login'}
        }


        default:return state
    }

}
function errorMsg(msg) {
    return {msg,type:ERROR_MSG}
    
}
// function registerSuccess(data) {
//     return {type:REGISTER_SUCCESS,payload:data}
// }
// function loginSuccess(data) {
//     return {type:LOGIN_SUCCESS,payload:data}
//
// }
function authSuccess(obj) {
    const {pwd,...data}=obj;
    return {type:AUTH_SUCCESS,payload:data}
}
export function register({user,pwd,repeatpwd,type}) {
    if(!user||!pwd||!type){
        return errorMsg('username and password must be input!')
    }
    if(pwd!==repeatpwd){
        return errorMsg('the confirm of password is different from the password! ')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
            if(res.status===200&&res.data.code===0){
              dispatch(authSuccess({user,pwd,type}))
            }else{
               dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}) {
    if(!user||!pwd){
        return errorMsg('username and password must be input!')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}

export function loadData(userinfo) {
    return {type:LOAD_DATA,payload:userinfo}
}

export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}

export function logoutSubmit() {
    return {type:LOG_OUT}
}