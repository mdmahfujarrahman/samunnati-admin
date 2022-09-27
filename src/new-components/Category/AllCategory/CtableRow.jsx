import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const CtableRow = ({name,index,phone,query}) => {

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{query}</td>
      </tr>
     
    </>
  );
};

export default CtableRow;
