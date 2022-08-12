import React from 'react';
import EtableRow from './EtableRow';
import '../../../styles/newstyles/table.css';

const Etable = ({ expertData }) => {
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
              return <EtableRow key={index} index={index} expert={expert} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Etable;
