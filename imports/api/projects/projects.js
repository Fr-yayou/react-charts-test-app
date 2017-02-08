import { Mongo } from 'meteor/mongo';
import 'babel-polyfill';
import SimpleSchema from 'simpl-schema';
export const Projects = new Mongo.Collection( 'projects' );

var Schemas = {};
Schemas.Time = new SimpleSchema({
  hours : {
    type : String,
    optional : true,

  },
  mins : {
    type : String,
    optional : true,

  }
})

Schemas.Project = new SimpleSchema({
  from : {
    type : Object,
    optional : true,
    blackbox : true,
    label : 'from time'
  },
  to : {
    type : Object,
    optional : true,
    blackbox : true,
    label : 'to time'
  },
  date : {
    type : Date,
    label : 'date'
  },
  hours : {
    type : Number,
    label : 'hours'
  },
  price : {
    type : Number,
    label : 'price'
  },
  course : {
    type : String,
    label : 'course',
    allowedValues : ['course 1','course 2','course 3','course 4','course 5']
  },
  classes : {
    type : String,
    label : 'classes',
    allowedValues : ['class 1','class 2','class 3']
  },
  name : {
    type : String,
    label : 'name',
  },
  description : {
    type : String,
    optional : true,
    label : 'description',
  }
})

Projects.attachSchema(Schemas.Project);
