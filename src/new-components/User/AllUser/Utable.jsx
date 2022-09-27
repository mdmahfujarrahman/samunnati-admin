import React from 'react';
import UtableRow from './UtableRow';
import '../../../styles/newstyles/table.css';

const Utable = ({ UserData }) => {
  return (
    <div className="table-wrapper" id="#scrollBar">
      <table className="fl-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Age</th>
            <th>Organisation</th>
            <th>Designation</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {UserData &&
            UserData.map((item, index) => {
              return <UtableRow key={index} username={item.username} index={index} designation={item.designation} email={item.email} name={item.name} phone={item.phone} age={item.age} organisation = {item.organisation}/>;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Utable;
