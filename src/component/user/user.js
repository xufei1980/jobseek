/**
 * Created by think on 2018/2/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile';

import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(
    state=>state.user,
    {logoutSubmit}
)
export default class User extends Component{
  logout=()=>{
      const alert=Modal.alert;
      alert('Log Out', 'Are you sure?', [
          { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
          { text: 'OK', onPress: () => {

              this.props.logoutSubmit();
          } },
      ]);
  }
    render(){
        const avatar=this.props.avatar;
        const Item=List.Item;
        const Brief=Item.Brief;
        return this.props.user?(

            <div>

                <Result
             img={<img src={require(`../img/${avatar}.png`)} alt="" />}
             title={this.props.user}
             message={this.props.type==='boss'?this.props.company:null}
                />

                <List renderHeader={()=>'description'}>
                    <Item
                        multipleLine={true}>
                        {this.props.title}
                        {this.props.desc.split('\n').map(
                            v=><Brief key={v}>{v}</Brief>
                        )}
                        {this.props.money?<Brief>salary:{this.props.money}</Brief>:null}


                    </Item>

                </List>
                <WhiteSpace/>
                {/*<Button type="primary" onClick={this.logout}>log out</Button>*/}
                <Button type="primary" onClick={this.logout}>log out</Button>



            </div>
        ):<Redirect to={this.props.redirectTo}/>
    }
}