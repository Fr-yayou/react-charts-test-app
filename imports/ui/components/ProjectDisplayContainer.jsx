import {Meteor} from 'meteor/meteor'
import React,{Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Projects } from '../../api/projects/projects.js'
import { ProjectDisplay } from './ProjectDisplay'

// export default class ProjectDisplayContainer extends Component {
//   render() {
//     return (
//       <div>
//         <h3>project display container........</h3>
//         {console.log(createContainer)}
//         </div>
//     );
//   }
// }

function filterData(searchInput,selectorName) {
  if(searchInput || searchInput == '') {
    if(selectorName == 'hours') {
      var searchInput = Number(searchInput);
      return Projects.find({hours : { $gt: searchInput } }).fetch();
    }else if(selectorName == 'price') {
      var searchInput = Number(searchInput);
      return Projects.find({price : { $gt: searchInput } }).fetch();
    }else if(selectorName == 'course' || selectorName == 'classes') {
      return Projects.find({'course' : searchInput}).fetch();
    } else if(selectorName == 'date') {
      //let date = new Date(searchInput)
      //return Projects.find({'date' : {$gt }).fetch();
    }
    else {
      const selector = {};
      selector.name = {
        $regex: new RegExp(`.*${searchInput}.*`, 'i')
      }
      return Projects.find(selector).fetch();
    }
  }else {
    return Projects.find().fetch();
  }
}


export default ProjectDisplayContainer = createContainer(({ searchInput,selectorName }) => {
    const subscription = Meteor.subscribe('project-data');
    const loading = !subscription.ready();
    const ready = subscription.ready();
    let projects = filterData(searchInput,selectorName);
    return { loading, projects,ready ,filterData};
  }, ProjectDisplay);


//
// const composer = ( props, onData ) => {
//   const subscription = Meteor.subscribe('project-data');
//
//   if ( subscription.ready() ) {
//     let projects = Projects.find().fetch();
//     onData( null, { projects } );
//   }
// };
//
// export const ProjectDisplayContainer = composeWithTracker( composer )( ProjectDisplay );
