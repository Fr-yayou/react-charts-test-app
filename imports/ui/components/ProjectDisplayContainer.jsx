import {Meteor} from 'meteor/meteor'
import React,{Component} from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Projects } from '../../api/projects/projects.js'
import {ProjectDisplay} from './ProjectDisplay'

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
export default ProjectDisplayContainer = createContainer(({ params }) => {
    const subscription = Meteor.subscribe('project-data');
    const loading = !subscription.ready();
    let projects = Projects.find().fetch();

    let filterData = function(searchInput,selectorName) {
      if(searchInput) {
        if(selectorName == 'hours' || selectorName == 'price') {
          projects = Projects.find({ selectorName : { $gt: searchInput } }).fetch();
        }else if(selectorName == 'course' || selectorName == 'classes') {
          console.log(Projects.find({selectorName : searchInput}).fetch());
          projects = Projects.find({selectorName : searchInput}).fetch();
        }else {
          const selector = {};
          selector.name = {
            $regex: new RegExp(`.*${searchInput}.*`, 'i')
          }
          projects = Projects.find(selector).fetch();
        }
      }
    }

    console.log(params,"sdkjfslfjlj")
    console.log(projects);

    return { loading, projects ,filterData};
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
