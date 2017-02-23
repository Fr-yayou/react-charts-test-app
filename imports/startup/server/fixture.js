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
        hours : 122,
        price : 44,
        course : 'course 2',
        classes : 'class 2',
        date : new Date("2017-08-04")
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
        hours : 122,
        course : 'course 1',
        classes : 'class 1',
        date : new Date("2017-08-05"),
      },
      obj3 = {
        name : 'project 3',
        description : 'project sample description',
        from : {
          hours : 7,
          mins : 7,
        },
        to : {
          hours : 14,
          mins : 14,
        },
        price : 110,
        hours : 427,
        course : 'course 3',
        classes : 'class 2',
        date : new Date(),
      },
      obj4 = {
        name : 'this project 3',
        description : 'project sample description',
        from : {
          hours : 21,
          mins : 02,
        },
        to : {
          hours : 24,
          mins : 14,
        },
        price : 16,
        hours : 192,
        course : 'course 1',
        classes : 'class 2',
        date : new Date("2018-06-06"),
      },
      obj5 = {
        name : 'new project work',
        description : 'project sample description',
        from : {
          hours : 12,
          mins : 2,
        },
        to : {
          hours : 14,
          mins : 4,
        },
        hours : 122,
        price : 146,
        course : 'course 3',
        classes : 'class 1',
        date : new Date(),
      },
      obj6 = {
        name : 'fine project',
        description : 'project sample description',
        from : {
          hours : 21,
          mins : 02,
        },
        to : {
          hours : 24,
          mins : 14,
        },
        price : 16,
        hours : 192,
        course : 'course 1',
        classes : 'class 2',
        date : new Date("2018-06-06"),
      },
      obj7 = {
        name : 'fine project 3',
        description : 'project sample description',
        from : {
          hours : 21,
          mins : 02,
        },
        to : {
          hours : 24,
          mins : 14,
        },
        price : 16,
        hours : 192,
        course : 'course 1',
        classes : 'class 2',
        date : new Date("2018-02-06"),
      },
      obj8 = {
        name : 'fine new project',
        description : 'project sample description',
        from : {
          hours : 21,
          mins : 02,
        },
        to : {
          hours : 24,
          mins : 14,
        },
        price : 16,
        hours : 192,
        course : 'course 1',
        classes : 'class 2',
        date : new Date("2018-02-06"),
      },
    Projects.insert(obj1);
    Projects.insert(obj2);
    Projects.insert(obj3);
    Projects.insert(obj4);
    Projects.insert(obj5);
    Projects.insert(obj6);
    Projects.insert(obj7);
    Projects.insert(obj8);

  }
})
