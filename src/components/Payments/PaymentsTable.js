import React from 'react';
import moment from 'moment';
import '../../styles/ArtistsTable.css';

const PaymentsTable = (props) => {
  const { allPayments } = props;
  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Credited to</th>
            <th>Phone no.</th>
            <th>Date</th>
            <th>Amount</th>
            {/**<th>Type</th> */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allPayments?.map((payment) => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td style={{ textTransform: 'capitalize' }}>
                {payment.artistId?.username}
              </td>
              <td>{payment.artistId?.phone}</td>
              <td>
                {payment.createdAt
                  ? moment(payment.createdAt).format('DD/MM/YYYY, h:mm a')
                  : ''}
              </td>
              <td>{`Rs. ${payment.amount}`}</td>
              {/**<td>{`20`}</td> */}
              <td style={{ textTransform: 'capitalize' }}>
                {/**<button className='payment-blockBtn'>Block</button> */}
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
