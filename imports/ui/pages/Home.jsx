import React , {Component} from 'react';
import ProjectDisplayContainer from '../components/ProjectDisplayContainer';
import Search from '../components/Search';
import {createContainer} from 'meteor/react-meteor-data';
import ProjectDataForm from '../components/ProjectDataForm';
import {FlowRouter} from 'meteor/kadira:flow-router';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput : '',
      selectorName : ''
    }
  }
  handleSearchInputs(searchInput,selectorName) {
    console.log(searchInput,selectorName);
      this.setState({
        searchInput : searchInput,
        selectorName : selectorName
      })
  }
  renderComponent() {
    console.log(createContainer);
    if(FlowRouter.getRouteName() == 'homePage') {
      return (<ProjectDataForm />);
    }else if(FlowRouter.getRouteName() == 'homePageDisplayData') {
      return (
        <div>
        <Search onSearchInputs={this.handleSearchInputs.bind(this)} />
        <ProjectDisplayContainer searchInput={this.state.searchInput} selectorName={this.state.selectorName}/>
        </div>
    );
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
