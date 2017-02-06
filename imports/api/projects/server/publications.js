import { Meteor } from 'meteor/meteor'
import {Projects} from '../projects.js'

Meteor.publish('project-data',() => Projects.find());
