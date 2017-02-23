import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

import { Projects } from '../../api/projects/projects.js';
import Loader from './Loader';
import Cell from './ProjectDetail';
import Search from './Search';
import Charts from './Charts';
import HelperFunctions from '../functions.js';
import ProjectDisplayContainer from './ProjectDisplayContainer';

export const mapData = (projectData) => {
    let data = [];
    projectData.map(function(project) {
      if(project.name && project.price) {
        data.push({
          xLabel : project.name,
          qty : Number(project.price)
        })
      }
    });
    return data;
}

export const calcPages = (totalPages,limit = 3) => {
  let pages = (totalPages/limit);
  return (pages%1) == 0 ? pages : Math.floor(pages) + 1;
}

const handlePaginateClick = (skipPages) => {
  return (currentPage) => {
    console.log(currentPage.selected,"selected page..........");
    if(currentPage.selected >= 0)
      skipPages(currentPage.selected)
  }
}


export default class ProjectDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterObj : { }
    }
    this.filterData = this.filterData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.handleSearchInputs = this.handleSearchInputs.bind(this);
  }
  renderData(projectData,onSkip,skip,projectCounter) {
    return (
        <div className="project-display-wrapper">
            <table className="project-table">
              {console.log(skip," skip value is being displayed-----")}
              <thead className="project-table-header">
                <tr>
                  <th>
                    <label>
                      Name<input type="text" ref="name" className="search-fields" onChange={this.handleSearchInputs}  placeholder="name"/>
                      </label>
                  </th>
                  <th>
                    <label>
                      Description<input type="text" ref="description" className="search-fields" onChange={this.handleSearchInputs} placeholder="description"/></label></th>
                  <th>
                    <label>
                      From Time
                      <br />
                      <input type="time" ref="fromTime" onChange={this.handleSearchInputs} className="search-fields" placeholder="hrs:mins" />
                    </label>
                  </th>
                  <th>
                    <label>
                      To Time
                      <br />
                      <input type="time" ref="toTime" onChange={this.handleSearchInputs} className="search-fields" placeholder="hrs:mins" />
                    </label>
                  </th>
                  <th><label>Price :<input type="number" ref="price" onChange={this.handleSearchInputs} className="search-fields" placeholder="price" /></label></th>
                  <th>
                    <label>
                    Date : <input type="date" ref="date" onChange={this.handleSearchInputs} className="search-fields" placeholder="date" />
                    </label>
                  </th>
                  <th>
                    <label>
                      Course :
                      <input type="text" ref="course" onChange={this.handleSearchInputs} className="search-fields" placeholder="course" />
                    </label>
                  </th>
                  <th>
                    <label>
                      Class :
                      <input type="text" ref="classes" onChange={this.handleSearchInputs} className="search-fields" placeholder="class" />
                    </label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  (projectData && projectData.length > 0)  ?
                     projectData.map((project) => {
                        return (
                          <ProjectDetail key={project._id} project={project} />
                        )
                      }) : <p>No projects yet!</p>
                }
              </tbody>
            </table>
            <div className="pagination">
              <ReactPaginate
                forcePage={skip}
                pageCount={calcPages(projectCounter)}
                onPageChange={handlePaginateClick(onSkip)}
                pageLinkClassName={'paginate-link'}
                pageRangeDisplayed={5}
                marginPagesDisplayed ={5}
                />
            </div>
            <Charts projectData={mapData(projectData)} height={255} width={750} />
        </div>)
  }
  filterData(projects,filterData) {
    debugger;
    let filteredProjects = projects.filter((project) => {
      if(HelperFunctions.startsWith(project.name,filterData.name)
      && HelperFunctions.comparePrice(project.price,filterData.price)
      && HelperFunctions.startsWith(project.description,filterData.description)
      && HelperFunctions.startsWith(project.course,filterData.course)
      && HelperFunctions.startsWith(project.classes,filterData.classes)
      && HelperFunctions.dateGreaterThan(project.date,filterData.date)) {
        return true;
      }else {
        return false;
      }
    })
    return filteredProjects;
  }
  grabAllOtherInputs() {
    let filterObj = {};
    let fromTime = this.refs.fromTime.value.split(':');
    let toTime = this.refs.toTime.value.split(':');
    filterObj.name = this.refs.name.value;
    filterObj.description = this.refs.description.value;
    filterObj.fromTime = {};
    filterObj.fromTime.hours = Number(fromTime[0]);
    filterObj.fromTime.mins = Number(fromTime[1]);
    filterObj.toTime = {};
    filterObj.toTime.hours = Number(toTime[0]);
    filterObj.toTime.mins = Number(toTime[1]);
    filterObj.price = Number(this.refs.price.value);
    filterObj.course = this.refs.course.value;
    filterObj.classes = this.refs.classes.value;
    return filterObj;
  }
  handleSearchInputs(e) {
    let searchObject = this.grabAllOtherInputs();
    this.setState({
      filterObj : searchObject,
    })
  }
  render() {
    let {loading,projects,onSkip,skip,projectCounter} = this.props;
    let {filterObj} = this.state;
    let projectData = this.filterData(projects,filterObj);
    return (loading || typeof loading == 'undefined') ? <Loader /> : this.renderData(projectData,onSkip,skip,projectCounter);
  }
}
