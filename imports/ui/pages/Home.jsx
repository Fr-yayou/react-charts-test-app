import React , {Component} from 'react';
import ProjectDisplayContainer from '../components/ProjectDisplayContainer';
import {createContainer} from 'meteor/react-meteor-data';
import ProjectDataForm from '../components/ProjectDataForm';
import {FlowRouter} from 'meteor/kadira:flow-router';

export default class Home extends Component {
  renderComponent() {
    console.log(createContainer);
    if(FlowRouter.getRouteName() == 'homePage') {
      return (<ProjectDataForm />);
    }else if(FlowRouter.getRouteName() == 'homePageDisplayData') {
      return (<ProjectDisplayContainer />);
    }
  }
  render() {
    return (
      <div className="home-page-wrapper">
        <a href="/display-projects">Review Data</a>
        {this.renderComponent()}
      </div>
    )
  }
}
