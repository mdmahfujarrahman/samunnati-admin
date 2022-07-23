import React from 'react';
import moment from 'moment';
import { blockUnblockUser } from '../../redux/api';
import { Link } from 'react-router-dom';
import '../../styles/ArtistsTable.css';

const UsersTable = (props) => {
  const { Users } = props;
  console.log(Users)
  return (
    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>session</th>
            <th>fund</th>
            <th>Email</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {Users?.map((user) => (
            <tr key={user._id}>
              <td>{(user.firstName) ? (user.firstName + " " +   user.lastName)   : user.name ? (user.name):  'N/A' }</td>
              <td>{user.mobileNo ? user.mobileNo : 'NA'}</td>
              <td>{user.whichCountry ? user.whichCountry : 'NA'}</td>
              <td>{user.session ? user.session : 'NA'}</td>
              <td>{user.fund ? user.fund : 'NA'}</td>
              <td>{user.email ? user.email : 'NA'}</td>
              <td><Link style={{ backgroundColor:"#155b89",padding:"6px",color:"white",textDecoration:"none" }} to={`/users/${user._id}`}>View Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
