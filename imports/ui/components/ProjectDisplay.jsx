import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {SpinnerView} from 'meteor/dpraburaj:react-spin';
import { moment } from 'meteor/momentjs:moment';
import ReactPaginate from 'react-paginate';

import { Projects } from '../../api/projects/projects.js';
import Loader from './Loader';
import Cell from './Cell';
import Search from './Search';
import Charts from './Charts';
import ProjectDisplayContainer from './ProjectDisplayContainer';

const manipulateDate = (date) => { return moment(date).format('DD-MM-YYYY')}

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

const renderData = (projectData,onSkip,projectCounter) => {
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
                      <tr key={project._id}>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.from.hours}:{project.from.mins}</td>
                        <td>{project.to.hours}:{project.to.mins}</td>
                        <Cell price={project.price} projectId={project._id} />
                        <td>{manipulateDate(project.date)}</td>
                        <td>{project.course}</td>
                        <td>{project.classes}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
          <div className="pagination">
            <ReactPaginate pageCount={calcPages(projectCounter)} onPageChange={handlePaginateClick(onSkip)} pageLinkClassName={'paginate-link'} />
          </div>
          <Charts projectData={mapData(projectData)} height={255} width={750} />
      </div> : <p>No projects yet!</p>
}

export const ProjectDisplay = ({loading,projects,onSkip,projectCounter}) => {
  return (loading || typeof loading == 'undefined') ? <Loader /> : renderData(projects,onSkip,projectCounter);
};
