import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Alert from 'react-s-alert';

const checkValue = (value,type,msg) => {
  if(value && value.length > 0) {
    return value;
  }else {
    if(msg)
    throw new Error(msg);

    throw new Error(`${type} is not provided`);
  }
}

const dislayHours = (total) => {
  let hours = Math.floor(total/60);
  let mins = Math.floor(total%60);
  if(hours < 10) {
    hours = '0'+hours;
  }else if(mins < 10) {
    mins = '0'+mins;
  }
  return hours+':'+mins;
}

const calculateFormattedTime = (fromTime,toTime) => {
  if(!fromTime || !toTime) {
    throw new Error('Time objects are not passed');
  }else if(!fromTime.hours || !fromTime.mins || !toTime.hours || !toTime.mins ) {
    console.log(fromTime,toTime);
    throw new Error('hours or mins not provided check data')
  }else {
    let fromTimeInMinutes = Number(fromTime.hours) * 60 + Number(fromTime.mins);
    let toTimeInMinutes = Number(toTime.hours) * 60 + Number(toTime.mins);
    if(fromTimeInMinutes > toTimeInMinutes) {
      throw new Error("From can't be greater than to (hour/min)");
    }else {
      return total = toTimeInMinutes - fromTimeInMinutes;
    }
  }
}

export default class ProjectDataForm extends Component {
    handleFormSubmit(e) {
      console.log(this);
      try{
        let projectData = this.refs;
        let object = {};
        object.name = checkValue(projectData.projectName.value.trim() , 'project name');
        object.description = checkValue(projectData.description.value.trim(),'description');
        object.price = Number(checkValue(projectData.price.value.trim(),'price'));

        object.from = {};
        object.from.hours = checkValue(projectData.fromHours.value.trim(),'hours in from ');
        object.from.mins = checkValue(projectData.fromMins.value.trim(),'mins in from ');

        object.to = {}
        object.to.hours = checkValue(projectData.toHours.value.trim(),'hours in to ');
        object.to.mins = checkValue(projectData.toMins.value.trim(),'hours in to ');
        object.course = checkValue(projectData.courses[projectData.courses.selectedIndex].value,'courses','course is not selected');
        object.classes = checkValue(projectData.classes[projectData.classes.selectedIndex].value,'classes','class is not selected');
        object.hours = calculateFormattedTime(object.from,object.to);
        object.date = new Date(checkValue(projectData.date.value,'date','date is not selected'));

        console.log(object);
        Meteor.call('insertProjectData',object,(err,res) => {
          if(err)
            Alert.error(err.message);
          else {
            document.querySelector('.project-form').reset();
            Alert.success(res," data added successfully");
          }
        })
      }
      catch(e) {
        console.warn(e,);
        Alert.error(e.message, {
            position: 'top-right',
            effect: 'jelly',
        });
    }
  }
  render() {
    return (

      <div className="project-form-wrapper">
        <Alert stack={true} timeout={3000} />
        <h2>Project Entry Form</h2>
        <form className="project-form" onSubmit={this.handleFormSubmit.bind(this)}>

          <div className="form-elem-wrapper">
            <label>Project Name</label>
            <input type="text" ref="projectName" placeholder="project name"/>
          </div>

          <div className="form-elem-wrapper">
            <label>Project Description</label>
            <textarea rows="5" cols="10" ref="description" placeholder="write the description of task in 300 chars(optional)"></textarea>
          </div>

          <div className="form-elem-wrapper">
              <label >From (Hours</label> :
              <label >Mins)</label>

              <input type="number" min="0" max="23" ref="fromHours" placeholder="hours"/>
              <input type="number" min="0" max="59" ref="fromMins" placeholder="mins"/>
          </div>

          <div className="form-elem-wrapper">
              <label>To (Hours</label> :
              <label>Mins)</label>

              <input type="number" min="0" max="23" ref="toHours" placeholder="hours"/>
              <input type="number" min="0" max="59" ref="toMins" placeholder="mins"/>
          </div>
          <div className="form-elem-wrapper">
            <input type="date" ref="date" />
          </div>
          <div className="form-elem-wrapper">
            <label>Price $</label>
            <input type="text" ref="price" placeholder="Enter the price for the project $" />
          </div>

          <div className="form-elem-wrapper">
              <label>Courses</label>
              <select className="course" ref="courses">
                <option value="unknown" >See options below</option>
                <option value="course 1">course 1</option>
                <option value="course 2">course 2</option>
                <option value="course 3">course 3</option>
                <option value="course 4">course 4</option>
                <option value="course 5">course 5</option>
              </select>
          </div>
          <div className="form-elem-wrapper">
              <label>Classes</label>
              <select className="classes" ref="classes">
                <option value="unknown" >See options below</option>
                <option value="class 1">class 1</option>
                <option value="class 2">class 2</option>
                <option value="class 3">class 3</option>
              </select>
          </div>
          <div className="form-elem-wrapper">
            <input type="button" value="submit" onClick={this.handleFormSubmit.bind(this)}/>
          </div>
        </form>
      </div>
    );
  }
}
