/**
 * Created by think on 2018/2/19.
 */
import React,{Component} from 'react';
// import io from 'socket.io-client';
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux';
import {connect} from 'react-redux';
import {getChatId} from '../../util';
// const socket=io('ws://localhost:9093');
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
export default class Chat extends Component{
    constructor(){
        super();
        this.state={
            text:'',
            msg:[],
            showEmoji:false
        }
    }
    componentDidMount(){
          if(!this.props.chat.chatmsg.length){
              this.props.getMsgList();
              this.props.recvMsg();
          }


//         socket.on('receiveMsg',(data)=> {
//     this.setState({msg:[...this.state.msg,data.text]})
// })
}
    componentWillUnmount(){
        window.location.href=window.location.href;
        const to = this.props.match.params.user;
        this.props.readMsg(to)
    }

    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit=()=>{

        const from=this.props.user._id;
        const to=this.props.match.params.user;
        const msg=this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:'',showEmoji:false})

    }

    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}))


        const userid=this.props.match.params.user;
        const Item=List.Item;
      const users=this.props.chat.users;
      if(!users[userid]){
          return null
      }
        const from=this.props.user._id;
        const to=this.props.match.params.user;
      const chatId=getChatId(from,to);
      const chatMsgs=this.props.chat.chatmsg.filter(v=>v.chatid===chatId);
        return(
            <div id='chat-page'>
                <NavBar model="dark"
                        className="navbar-nav-chat"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar>
                {chatMsgs.map(v=>{
                     const avatar=require(`../img/${users[v.from].avatar}.png`);
                    return v.from===userid?(
                         <List className="list-chat">
                             <Item key={new Date()+Math.random()}
                                   thumb={avatar}
                             >{v.content}</Item>
                         </List>
                     ):(
                         <List  key={new Date()+Math.random()}>
                             <Item extra={<img src={avatar} alt=""/>}
                                 className="chat-me">{v.content}</Item>
                         </List>
                     )
                    }
                )}
            <div className="stick-footer">
                <List>
                    <InputItem
                        placehoder="input"
                        value={this.state.text}
                        onChange={v=>this.setState({text:v})}
                        extra={
                            <div>
                                <span style={{marginRight:15}}
                                      onClick={()=>{this.setState({showEmoji:!this.state.showEmoji});
                                      this.fixCarousel()}}
                                >😄</span>
                                <span onClick={()=>this.handleSubmit()}>send</span>
                            </div>
                        }
                    >message</InputItem>
                </List>
                {this.state.showEmoji? <Grid
                    data={emoji}
                    columnNum={9}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={el=>this.setState({text:this.state.text+el.text})}
                />:null}

            </div>
            </div>
        )
    }
}