import React, { useState, useEffect } from 'react';
import CtableRow from './CtableRow';
import '../../../styles/newstyles/table.css';

const Ctable = ({ contactData }) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contactData &&
            contactData.map((contact, index) => {
              return <CtableRow key={index} index={index} contact={contact} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Ctable;
