import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addGUN,removeGUN,addGUNAsync} from './index.redux';

//App=connect(mapStatetoProps,actionCreators)(App)
@connect((state)=>{
    return {num:state.counter}
},{addGUN,removeGUN,addGUNAsync})
class App extends Component {
  render() {
      return (
      <div>
          <h1>现在有机枪{this.props.num}把</h1>
          <button onClick={this.props.addGUN}>+</button>
          <button onClick={this.props.removeGUN}>--</button>
          <button onClick={this.props.addGUNAsync}>wait</button>
      </div>
    );
  }
}

export default App;
