import React from 'react';
const RtableRow = ({ index, requirement }) => {
  console.table(requirement);
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{requirement.name}</td>
        <td>{requirement.email}</td>
        <td>{requirement.number}</td>
        <td>{requirement.area.join(' , ')}</td>
        <td>{requirement.price.join(' , ')}</td>
        <td>{requirement.interest.join(' , ')}</td>
        <td>{requirement.otherSpecification}</td>
      </tr>
    </>
  );
};

export default RtableRow;
