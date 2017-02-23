import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

import { Projects } from '../../api/projects/projects.js';
import Loader from './Loader';
import Cell from './ProjectDetail';
import Search from './Search';
import Charts from './Charts';
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

const renderData = (projectData,onSkip,skip,projectCounter) => {
  return ( projectData && projectData.length > 0 ) ?
      <div className="project-display-wrapper">
          <table className="project-table">
            {console.log(skip," skip value is being displayed-----")}
            <thead>
              <tr>
                <th><input type="text" ref="name" className="search-fields" onChange={this.handleSearchInputs} defaultValue="Name" /></th>
                <th><input type="text" ref="description" className="search-fields" onChange={this.handleSearchInputs} defaultValue="Description" /></th>
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
                <th>Date : <input type="date" ref="date" onChange={this.handleSearchInputs} className="search-fields" placeholder="date" /></th>
                <th><input type="text" ref="course" onChange={this.handleSearchInputs} className="search-fields" defaultValue="course" placeholder="course" /> </th>
                <th><input type="text" ref="class" onChange={this.handleSearchInputs} className="search-fields" defaultValue="class" placeholder="class" /></th>
              </tr>
            </thead>
            <tbody>
              {
                  projectData.map((project) => {
                    return (
                      <ProjectDetail key={project._id} project={project} />
                    )
                  })
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
      </div> : <p>No projects yet!</p>
}

export default class ProjectDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput : '',
      selectorName : '',
    }
    this.handleSearchInputs = this.handleSearchInputs.bind(this);
  }
  handleSearchInputs(searchInput,selectorName) {
    this.setState({
      searchInput : searchInput,
      selectorName : selectorName
    })
  }
  render() {
    let {loading,projects,onSkip,skip,projectCounter} = this.props;
    return (loading || typeof loading == 'undefined') ? <Loader /> : renderData(projects,onSkip,skip,projectCounter);
  }
}
