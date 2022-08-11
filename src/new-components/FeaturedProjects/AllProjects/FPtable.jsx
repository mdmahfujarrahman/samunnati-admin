import React, { useState, useEffect } from 'react';
import '../../../styles/newstyles/table.css';
import FPtableRow from './FPtableRow';
const FPtable = ({ projectData }) => {
  useEffect(() => {
    setallprojects(projectData);
  }, [projectData]);

  const [allprojects, setallprojects] = useState(projectData);
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>SR.No</th>
            <th style={{ textAlign: 'center' }}>Image</th>
            <th></th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectData &&
            allprojects.map((project, index) => {
              return (
                <FPtableRow
                  key={index}
                  index={index}
                  project={project}
                  allprojects={allprojects}
                  setallprojects={setallprojects}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FPtable;
