import reactPolymer from 'react-polymer';
import React , {Component} from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

import ProjectDisplayContainer from '../components/ProjectDisplayContainer';
import Search from '../components/Search';
import Charts from '../components/Charts';
import {createContainer} from 'meteor/react-meteor-data';
import ProjectDataForm from '../components/ProjectDataForm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput : '',
      selectorName : '',
      skip : 0,
    }
    this.handleSearchInputs = this.handleSearchInputs.bind(this);
    this.handleSkipCount = this.handleSkipCount.bind(this);
  }
  handleSearchInputs(searchInput,selectorName) {
    this.setState({
      searchInput : searchInput,
      selectorName : selectorName
    })
  }
  handleSkipCount(skip) {
    console.log('handle skip is being called',skip);
    this.setState({
      skip : skip
    })
  }
  renderComponent() {
    if(FlowRouter.getRouteName() == 'homePage') {
      return (<ProjectDataForm />);
    }else if(FlowRouter.getRouteName() == 'homePageDisplayData') {
      return (
        <div className="display-project-page">
          <Search onSearchInputs={this.handleSearchInputs} />
          <ProjectDisplayContainer searchInput={this.state.searchInput} selectorName={this.state.selectorName} onSkip={this.handleSkipCount} skip={this.state.skip}/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="home-page-wrapper">
        {this.renderComponent()}
      </div>
    )
  }
}
