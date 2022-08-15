import React, { useState, useEffect } from 'react';
import '../../../styles/newstyles/table.css';
import UDtableRow from './UDtableRow';

const UDtable = ({ unitDetailsData, propid }) => {
  const [allUnitDetails, setallUnitDetails] = useState(unitDetailsData);

  useEffect(() => {
    setallUnitDetails(unitDetailsData);
  }, [unitDetailsData]);

  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>BHK</th>
            <th>Facing</th>
            <th>Size</th>
            <th>Price</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUnitDetails.length &&
            allUnitDetails.detail.map((unitdetail, index) => {
              return (
                <UDtableRow
                  key={index}
                  index={index}
                  propid={propid}
                  bhk={allUnitDetails.bhk}
                  unitdetail={unitdetail}
                  allUnitDetails={allUnitDetails}
                  setallUnitDetails={setallUnitDetails}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UDtable;
