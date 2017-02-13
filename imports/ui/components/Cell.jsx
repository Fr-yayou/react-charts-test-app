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
    if (!this.state.editTheData) return(<td>{this.props.price} <button onClick={this.editHandler}>Edit</button></td>)
    else return (<td><input ref="updatedValue" defaultValue={this.props.price} /><button onClick={this.updateValue}>Update</button></td>)
  }
  updateValue(e){
    let newPrice = Number(this.refs.updatedValue.value);
    let projectId = this.props.projectId;
    let self = this;
    console.log(newPrice,projectId);
    Meteor.call("editProjectPrice",projectId,newPrice,(res,err) => {
      console.log("Yessssssss updated")
      self.setState({editTheData : true})
      if(res) {
        self.setState({editTheData : true})
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
    {console.log('re rendering again')}
    return this.conditionalRender();
  }
}
