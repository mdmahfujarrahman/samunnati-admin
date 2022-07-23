import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function Singleblog(prop) {
  return (
    <>
          <tr >
            <td>{prop.writerName}</td>
            <td>{prop.date}</td>
            <td>{prop.minutes}</td>
            <td>{prop.title}</td>
            <td className="text-right" >
              <div className="actions" style={{display:"flex",justifyContent:"space-betweens"}}>
              <Link to={`/blog/edit/${prop.id}`}> <button  className='uni-edit-btn'><ModeEditIcon/> </button></Link>
             <Link onClick={async(e) => {
                            e.preventDefault();
                                const yes = window.confirm("Do you want delete ?");
                            if (yes) {
                                try {
                                    await axios.delete(`https://flywise-admin2.herokuapp.com/api/deleteBlog/${prop.id}`);
                                    window.location.reload();
                                } catch (err) {
                                    console.log(err);
                                    }
                            }
                          }} to={'#'}  ><button  className='uni-delete-btn'><DeleteIcon/> </button></Link>
              </div>
        </td>
        </tr>
    </>
  )
}

export default Singleblog