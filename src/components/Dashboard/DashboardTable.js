import moment from 'moment';
import React from 'react';
import '../../styles/ArtistsTable.css';

const DashboardTable = (props) => {
  const { paymentList } = props;
  // console.log(paymentList);
  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Artist</th>
            <th>Order Date</th>
            {/**<th>Due Date</th> */}
          </tr>
        </thead>
        <tbody>
          {paymentList.map((payment) => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td style={{ textTransform: 'capitalize' }}>{payment.status}</td>
              <td style={{ textTransform: 'capitalize' }}>
                {payment?.artistId?.username}
              </td>
              {/**<td>{`Corona, Michigan`}</td> */}
              <td>
                {payment.createdAt
                  ? moment(payment.createdAt).format('MMMM Do YYYY, h:mm a')
                  : ''}
              </td>
              {/**<td>{`01/22/15 17:15`}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
