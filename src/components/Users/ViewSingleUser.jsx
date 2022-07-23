import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../styles/ArtistsTable.css';
function ViewSingleUser() {
  
    const [SingleUserData, setSingleUserData] = useState({})
    const param = useParams();

    console.log(SingleUserData);
    const call1=async()=>{
        try {
          const get =   await axios.get(`https://flywise-admin2.herokuapp.com/api/users/${param.id}`)
          setSingleUserData(get.data.user);
        } catch (error) {
            console.log(error);
        }
    }
  
    useEffect(() => {
      
    call1();
    }, [])
    
    return (
    <>
    <div className='user-container'>
        <div className='user-tableSection'>
            <div className='User-tablewrap' id='#scrollBar'>
            <ul className='user-List'>
                <div className="d-flex">
                  <li>Name</li>
                  <li>{SingleUserData.name ? SingleUserData.name : "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>Mobile No</li>
                  <li>{SingleUserData.mobileNo ? SingleUserData.mobileNo : "N/A"}</li>
                </div>
                <hr />
                
                <div className="d-flex">
                  <li>Email</li>
                  <li>{SingleUserData.email ? SingleUserData.email : "N/A"}</li>
                </div>
                <hr />
                
                <div className="d-flex">
                  <li>Session</li>
                  <li>{SingleUserData.session ? SingleUserData.session : "N/A"}</li>
                </div>
                <hr />
                
                
                <div className="d-flex">
                  <li>Which Country ? </li>
                  <li>{SingleUserData.whichCountry ? SingleUserData.whichCountry : "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>Work Experience </li>
                  <li>{SingleUserData.workExperience ? SingleUserData.workExperience : "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>No of backlogs </li>
                  <li>{SingleUserData.noofbacklogs ? SingleUserData.noofbacklogs : "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>Major Barrier</li>
                  <li>{SingleUserData.majorBarrier ? SingleUserData.majorBarrier : "N/A"}</li>
                </div>
                <hr />
                

                <div className="d-flex">
                  <li>ISCSIT </li>
                  <li>{SingleUserData.iscsit ? SingleUserData.iscsit : "N/A"}</li>
                </div>
                <hr />
                

                <div className="d-flex">
                  <li>IELTS TOEFL </li>
                  <li>{SingleUserData.ielts_toefl ? SingleUserData.ielts_toefl : "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>Funds </li>
                  <li>{SingleUserData.fund ? SingleUserData.fund: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>English Test Type </li>
                  <li>{SingleUserData.englishTestType ? SingleUserData.englishTestType: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>English Test Score </li>
                  <li>{SingleUserData.englishTestScore ? SingleUserData.englishTestScore: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>Courses </li>
                  <li>{SingleUserData.courses ? SingleUserData.courses: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>College </li>
                  <li>{SingleUserData.college ? SingleUserData.college: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>CGPA </li>
                  <li>{SingleUserData.cgpa ? SingleUserData.cgpa: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>Budget</li>
                  <li>{SingleUserData.budget ? SingleUserData.budget: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>GRE Verbal Score</li>
                  <li>{SingleUserData.greVerbalScore ? SingleUserData.greVerbalScore: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>GRE Quant Score</li>
                  <li>{SingleUserData.greQuantScore ? SingleUserData.greQuantScore: "N/A"}</li>
                </div>
                <hr />

                <div className="d-flex">
                  <li>GRE Training</li>
                  <li>{SingleUserData.greTraining ? SingleUserData.greTraining: "N/A"}</li>
                </div>
                <hr />
            </ul>
            
            </div>
            </div>
       </div>     
    </>
  )
}

export default ViewSingleUser