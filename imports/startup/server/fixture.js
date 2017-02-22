import { Meteor } from 'meteor/meteor';
import { Projects } from '../../api/projects/projects.js';

// While initializing the database

Meteor.startup(() => {
  if(Projects.find().count() == 0) {
    let obj1 =  {
        name : 'project 1',
        description : 'project sample description',
        from : {
          hours : 2,
          mins : 2,
        },
        to : {
          hours : 4,
          mins : 4,
        },
        price : 44,
        course : 'course 2',
        classes : 'class 2',
        date : new Date(),
      },
      obj2 = {
        name : 'project 2',
        description : 'project sample description',
        from : {
          hours : 2,
          mins : 2,
        },
        to : {
          hours : 4,
          mins : 4,
        },
        price : 10,
        course : 'course 1',
        classes : 'class 1',
        date : new Date(),
      },
      obj3 = {
        name : 'project 3',
        description : 'project sample description',
        from : {
          hours : 2,
          mins : 2,
        },
        to : {
          hours : 4,
          mins : 4,
        },
        price : 440,
        course : 'course 3',
        classes : 'class 2',
        date : new Date(),
      }
    Projects.insert(obj1);
    Projects.insert(obj2);
    Projects.insert(obj3);
  }
}
