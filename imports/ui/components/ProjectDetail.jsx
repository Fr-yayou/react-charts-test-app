import React from 'react';
import Cell from './Cell';

const manipulateDate = (date) => { return moment(date).format('DD-MM-YYYY')}

export default ProjectDetail = ({project,key}) => {
  return (
    <tr key={key}>
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
}
