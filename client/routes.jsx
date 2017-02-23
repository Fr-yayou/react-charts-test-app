import reactPolymer from 'react-polymer';
import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

{/* Layouts and Pages */}
import MainLayout from '../imports/ui/layouts/MainLayout';
import Home from '../imports/ui/pages/Home';
import UploadFiles from '../imports/ui/pages/UploadFiles';
FlowRouter.route('/',{
  name : 'homePage',
  action() {
    mount(MainLayout , {
      content : (<Home />)
    })
  }
})

FlowRouter.route('/display-projects',{
  name : 'homePageDisplayData',
  action() {
    mount(MainLayout , {
      content : (<Home />)
    })
  }
})

FlowRouter.route('/upload-files',{
  name : 'UploadFiles',
  action() {
    mount(MainLayout , {
      content : (<UploadFiles />)
    })
  }
})
