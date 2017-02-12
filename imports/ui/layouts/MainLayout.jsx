import React , {Component} from 'react';
import Navigation from '../components/Header'

export default MainLayout = ({content}) => (
    <div className="main-layout">
      <Header />
      {content}
    </div>
);
