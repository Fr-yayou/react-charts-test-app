import {Meteor} from 'meteor/meteor';
import {Projects} from './projects';
import { check } from 'meteor/check';

Meteor.methods({
  insertProjectData(Data) {
    console.log(Data)
    check(Data, {
      name : String,
      description : String,
      from : Object,
      to : Object,
      price : Number,
      hours : Number,
      date : Date,
      course : String,
      classes: String,
    })
    console.log(Data,"-------------------");
    return Projects.insert({
      name : Data.name,
      description : Data.description,
      from : Data.from,
      to : Data.to,
      hours : Data.hours,
      price : Data.price,
      date : Data.date,
      course : Data.course,
      classes : Data.classes
    })
  },
  removeProjectData(projectId) {
    return Projects.remove({_id : projectId});
  },
  editProjectPrice(projectId,newPrice) {
    check(projectId,String);
    check(newPrice,Number);
    return Projects.update({_id : projectId},
      { $set : { price : newPrice} });
  }
})
