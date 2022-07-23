import React from 'react';
import '../../styles/ArtistsTable.css';

const TLtable = () => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Contact No.</th>
            <th>Service Name</th>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Status</th>
            {/**<th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hello</td>
          </tr>
          {/* {paymentList?.map((payment) => (
          <tr key={payment._id}>
            <td>
            </td>
            
          </tr>
        ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default TLtable;
