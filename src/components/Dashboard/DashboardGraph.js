import React from 'react';
import '../../styles/DashboardPage.css';

const DashboardGraph = () => {
  return (
    <div className='graph-container'>
      <div className='graph-headerDiv'>
        <h3 className='graph-head'>Orders</h3>
        <h3 className='graph-head'>filter</h3>
      </div>
      <h3 style={{ textAlign: 'center' }}>Graph Here</h3>
    </div>
  );
};

export default DashboardGraph;
