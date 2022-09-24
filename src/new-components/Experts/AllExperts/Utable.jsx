import React from 'react';
import UtableRow from './UtableRow';
import '../../../styles/newstyles/table.css';

const Utable = ({ expertData }) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {expertData &&
            expertData.map((expert, index) => {
              return <UtableRow key={index} index={index} expert={expert} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Utable;
