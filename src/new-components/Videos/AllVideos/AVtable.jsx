import React, { useState, useEffect } from 'react';
import PtableRow from './AVtableRow';
import '../../../styles/newstyles/table.css';

const AVtable = ({ propertyData }) => {
  useEffect(() => {
    setallproperty(propertyData);
  }, [propertyData]);

  const [allproperty, setallproperty] = useState(propertyData);
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Category</th>
            <th>Playlist</th>
            <th>Uploaded by</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {propertyData &&
            allproperty.map((property, index) => {
              return ( */}
                <PtableRow
                  // key={index}
                  // index={index}
                  // property={property}
                  // allproperty={allproperty}
                  // setallproperty={setallproperty}
                />
              {/* );
            })} */}
        </tbody>
      </table>
    </div>
  );
};

export default AVtable;
