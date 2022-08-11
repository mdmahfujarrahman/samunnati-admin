import React, { useState, useEffect } from 'react';
import RtableRow from './RtableRow';
import '../../../styles/newstyles/table.css';

const Rtable = ({ requirementData }) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Area</th>
            <th>Price</th>
            <th>Interest</th>
            <th>Other Spec</th>
          </tr>
        </thead>
        <tbody>
          {requirementData &&
            requirementData.map((requirement, index) => {
              return (
                <RtableRow
                  key={index}
                  index={index}
                  requirement={requirement}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Rtable;
