/**
 * Created by think on 2018/2/12.
 */
import React,{Component} from 'react';
import { Grid ,List} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class AvatarSelect extends Component{
    static propTypes={
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(){
        super();
        this.state={}
    }
    render(){
        const avatarList='boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v=>(
                {
                    icon:require(`../img/${v}.png`),
                    text:v
                }
            ));
      const gridHeader=this.state.icon?
          (<div>
              <span>has already selected avatar</span>
              <img style={{width:'25px',height:'25px',marginLeft:'20px'}} src={this.state.icon} alt="" />
          </div>):"please choice an avatar"
        return(
            <div>
                <List renderHeader={() => gridHeader}>
                <Grid data={avatarList} columnNum={5}
                      hasLine={true}
                      onClick={ele=>{
                          this.setState(ele);
                          this.props.selectAvatar(ele.text)}}/>
                </List>

            </div>
        )
    }
}