import React from 'react'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/ArtistsTable.css';

function Onecourse(prop) {
 let discipline= prop.discipline
    return (
    <>
        <tr key={prop.index}>
            <td>{prop.name}</td>
            <td>{discipline.map((dis)=> <p>{dis.name}</p>)}</td>
            <td>{prop.activeStatus ? (<Button size="small" color="success" variant="contained">Active</Button>):(<Button color="error" variant="contained">Not Active</Button>)}</td>
            <td>{prop.applicationFees} </td>
            <td>{prop.programFees} </td>
            <td>{prop.departmentDetails.email}</td>
            <td className="text-right" >
              <div className="actions" style={{display:"flex",justifyContent:"space-betweens"}}>
              <Link to={`/Universities/editcourse/${prop.courseid}/${prop.id}`}> <button  className='uni-edit-btn'><ModeEditIcon/> </button></Link>
             <Link onClick={async(e) => {
                            e.preventDefault();
                                const yes = window.confirm("Do you want delete ?");
                            if (yes) {
                                try {
                                    await axios.delete(`https://flywise-admin2.herokuapp.com/api/deleteUnivesity/${prop.id}`);
                                    window.location.reload();
                                } catch (err) {
                                    console.log(err);
                                    }
                            }
                          }}  ><button  className='uni-delete-btn'><DeleteIcon/> </button></Link>
              </div>
        </td>
        </tr>
    </>
  )
}

export default Onecourse