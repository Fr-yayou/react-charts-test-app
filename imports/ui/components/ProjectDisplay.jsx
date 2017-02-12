import React, {Component} from 'react';
import { moment } from 'meteor/momentjs:moment';
import Search from './Search';
import Charts from './Charts'
import ProjectDisplayContainer from './ProjectDisplayContainer'
import {SpinnerView} from 'meteor/dpraburaj:react-spin';

const manipulateDate = (date) => { return moment(date).format('DD-MM-YYYY')}

const mapData = (projectData) => {
    let data = [];
    projectData.map(function(project) {
      data.push({
        xLabel : project.name,
        qty : Number(project.price)
      })
    });
    return data;
}

const renderData = (projectData) => {
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
                        <td>{project.price}</td>
                        <td>{manipulateDate(project.date)}</td>
                        <td>{project.course}</td>
                        <td>{project.classes}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
          <Charts projectData={mapData(projectData)} height={200} width={750} />
      </div> : <p>No projects yet!</p>
}

const displayLoader = () => {
  return (
  <div className='uil-ring-css'>
    <div></div>
  </div>
  );
}

export const ProjectDisplay = ({loading,projects}) => {
  return (loading || typeof loading == 'undefined') ? displayLoader() : renderData(projects);
};
