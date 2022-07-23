import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function Oneuniveristy(prop) {
  return (
    <>
        <tr key={prop.index}>
            <td>{prop.name}</td>
            <td>
              <img style={{ height:"40px",width:"75px",objectFit:"cover",borderRadius:"6px" }} src={prop.photo} alt="no img" />
            </td>
            <td>{prop.state}</td>
            <td>{prop.country}</td>
            <td>Tier {prop.level}</td>
            <td><Button size="small" variant="contained"><Link style={{textDecoration:"none",color:"white"}} to={`/Universities/viewcourse/${prop.id}`}>View Courses</Link></Button></td>
            <td>
            <Button size="small" variant="contained"><Link style={{textDecoration:"none",color:"white"}} to={`/Universities/addcourse/${prop.id}`}>Add Courses</Link></Button></td>
        
            <td className="text-right" >
              <div className="actions" style={{display:"flex",justifyContent:"space-betweens"}}>
             <Link to={`/Universities/edit/${prop.id}`}> <button  className='uni-edit-btn'><ModeEditIcon/> </button></Link>
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


// delete


export default Oneuniveristy