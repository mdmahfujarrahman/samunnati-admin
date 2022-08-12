import React from 'react';
const CtableRow = ({ index, contact }) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
      </tr>
    </>
  );
};

export default CtableRow;
