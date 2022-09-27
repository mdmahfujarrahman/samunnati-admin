import React, { useState, useEffect } from 'react';
import '../../../styles/newstyles/table.css';
import CtableRow from './CtableRow';

const Ctable = ({ QueryData}) => {
  
  return (
    <>
      {QueryData ? (
        <div className="table-wrapper" id="#scrollBar">
          <table className="fl-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th >Query</th>
              </tr>
            </thead>
            <tbody>
              {
                QueryData.map((item,index)=>{
                  return <CtableRow
                        key={index}
                        index={index}
                        name={item.name}
                        phone={item.phone}
                        query={item.query}
                      />
                })
              }
            </tbody>
          </table>
        </div>
      ) : (
        <h6 className="text-center">No details available</h6>
      )}
    </>
  );
};

export default Ctable;
