import React from 'react';
import Oneuniveristy from './Oneuniveristy';
import '../../../styles/ArtistsTable.css';

const ArtistsTable = (props) => {
  
  return (
   <>
        

    <div className='table-wrapper' id='#scrollBar'>
      <table className='fl-table'>
        <thead>
          <tr>
            <th>University Name</th>
            <th>University Pic</th>
            <th>State</th>
            <th>Country Code</th>
            <th>Level</th>
            <th>Courses</th>
            <th>Add Courses</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.uniData?(
            props.uniData.map((university,index)=>{
                 return(  <Oneuniveristy
                            id={university._id}
                            key={index}
                            photo = {university.photo}
                            name={university.name}
                            level={university.level}
                            country={university.country}
                            state={university.state}
                          />
            )
            })):("no Data")
          }             
        </tbody>
      </table>
    </div>
   
  </>
  );
};

export default ArtistsTable;
