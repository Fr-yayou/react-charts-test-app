import {Meteor} from 'meteor/meteor'
import React,{Component} from 'react';
import { Projects } from '../../api/projects/projects.js';
import HelperFunctions from '../functions.js'

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Alert from 'react-s-alert';

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
    if (!(this.state.editTheData)) return(<td><Alert stack={true} timeout={3000} />{this.props.price} <button onClick={this.editHandler}>Edit</button></td>)
    else return (<td><Alert stack={true} timeout={3000} /><input ref="updatedValue" defaultValue={this.props.price} /><button onClick={this.updateValue}>Update</button></td>)
  }
  updateValue(e){
    let newPrice = Number(this.refs.updatedValue.value);
    let projectId = this.props.projectId;
    let self = this;

    try {
      HelperFunctions.validatePrice(newPrice);
      console.log(newPrice,projectId);
      Meteor.call("editProjectPrice",projectId,newPrice,(res,err) => {
        this.setState({editTheData : false})

        console.log("Yessssssss updated")
        if(res) {
          self.setState({editTheData : false})
          console.log(res);
        }
        else {
          console.log(err);
        }
      });
    }
    catch(e) {
      console.log(e.message);
      Alert.error(e.message, {
          position: 'top-right',
          effect: 'jelly',
        });
    }
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
