import {Meteor} from 'meteor/meteor'
import React,{Component} from 'react';
import { Projects } from '../../api/projects/projects.js';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editTheData : false
      }
    this.editHandler = this.editHandler.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  conditionalRender() {
    if (!(this.state.editTheData)) return(<td>{this.props.price} <button onClick={this.editHandler}>Edit</button></td>)
    else return (<td><input ref="updatedValue" defaultValue={this.props.price} /><button onClick={this.updateValue}>Update</button></td>)
  }
  updateValue(e){
    let newPrice = Number(this.refs.updatedValue.value);
    let projectId = this.props.projectId;
    let self = this;
    console.log(newPrice,projectId);
    Meteor.call("editProjectPrice",projectId,newPrice,(res,err) => {
      this.setState({editTheData : false})

      console.log("Yessssssss updated")
      console.log(self,ReactDOM.findNode(self));
      if(res) {
        self.setState({editTheData : false})
        console.log(res);
      }
      else {
        console.log(err);
      }
    })
  }
  editHandler(e) {
    console.log("ohoooo",this,e);
    this.setState({
      editTheData : true
    })
    return (<span>hello</span>)
  }
  render() {
      let editState = this.state.editTheData;
      {console.log('re rendering again editState',editState)}
      return this.conditionalRender();
  }
}
