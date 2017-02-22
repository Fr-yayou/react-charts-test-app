import React , {Component} from 'react';
import Header from '../components/Header'

export default MainLayout = ({content}) => (
  <div className="main-layout">
        <Header />
        {content}
      </div>
);
