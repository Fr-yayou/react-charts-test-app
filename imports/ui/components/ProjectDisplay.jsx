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
  return Math.floor(totalPages/limit) + 1;
}

const handlePaginateClick = (skipPages) => {
  return (currentPage) => {
    if(currentPage.selected)
      skipPages(currentPage.selected)
  }
}

const renderData = (projectData,onSkip,skip,projectCounter) => {
  return ( projectData && projectData.length > 0 ) ?
      <div className="project-display-wrapper">
          <table>
            {console.log(projectData,"-----")}
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>From Time(hours:mins)</th>
                <th>To Time(hours:mins)</th>
                <th>Price</th>
                <th>Date</th>
                <th>course</th>
                <th>class</th>
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
            <ReactPaginate forcePage={skip} pageCount={calcPages(projectCounter)} onPageChange={handlePaginateClick(onSkip)} pageLinkClassName={'paginate-link'} />
          </div>
          <Charts projectData={mapData(projectData)} height={255} width={750} />
      </div> : <p>No projects yet!</p>
}

export const ProjectDisplay = ({loading,projects,onSkip,skip,projectCounter}) => {
  return (loading || typeof loading == 'undefined') ? <Loader /> : renderData(projects,onSkip,skip,projectCounter);
};
