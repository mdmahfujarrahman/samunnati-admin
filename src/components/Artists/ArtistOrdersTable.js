import React from 'react';
import moment from 'moment';
import '../../styles/ArtistsTable.css';

const ArtistOrdersTable = (props) => {
  const { paymentList } = props;
  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
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
          {paymentList?.map((payment) => (
            <tr key={payment._id}>
              <td>
                {payment?.userId?.username ? payment?.userId?.username : 'NA'}
              </td>
              <td>{payment?.userId?.phone ? payment?.userId?.phone : 'NA'}</td>
              <td>
                {payment?.serviceName && `${payment?.serviceName}`}
                {payment?.imageId && `${payment?.imageId?.caption}`}
                {payment?.albumId && `${payment?.albumId?.albumName}`}
              </td>
              <td>{payment?._id}</td>
              <td>
                {payment?.createdAt
                  ? moment(payment?.createdAt).format('MMMM Do YYYY, h:mm a')
                  : ''}
              </td>
              <td>{payment?.status}</td>
              {/**<td>
                <button className='artist-blockBtn'>Block</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistOrdersTable;
