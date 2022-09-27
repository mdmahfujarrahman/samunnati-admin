import React from 'react';
const UtableRow = ({ index, name,organisation,designation,age,email,username,phone }) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>"photo"</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{age}</td>
        <td>{designation}</td>
        <td>{organisation}</td>
        <td>{username}</td>
      </tr>
    </>
  );
};

export default UtableRow;
