import { Meteor } from 'meteor/meteor'
import {Projects} from '../projects.js'
import {check} from 'meteor/check';

Meteor.publish('project-data',function(skip,limit){
  check(skip,Number);

  let limitPages = limit || 3;
  let skipPages = skip * limitPages;
  console.log(skipPages,limitPages,"skip and limit Pages");
  Counts.publish(this, 'projectCounter', Projects.find({}))
  return Projects.find({},{skip : skipPages , limit : limitPages})
})
