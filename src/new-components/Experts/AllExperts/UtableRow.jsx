import React from 'react';
const UtableRow = ({ index, expert }) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{expert.name}</td>
        <td>{expert.number}</td>
        <td>{expert.email}</td>
      </tr>
    </>
  );
};

export default UtableRow;
