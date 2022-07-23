import React,{useEffect,useState} from 'react'
import '../../../styles/ArtistsTable.css';
import LoadingPage from '../../utils/LoadingPage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Onecourse from './Onecourse';
import addIcon from '../../../images/addIcon.svg';


function ViewCoursePage() {

  const [courseData, setcourseData] = useState([])
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const history = useHistory()
  // useEffects
  useEffect(() => {
    unicall();
    return () => {
      setcourseData([]);
    };

  }, [])
 
 
  //  functions
  const unicall =async()=>{
    setLoading(true);
   
    try {
      const call1 = await axios.get(`https://flywise-admin2.herokuapp.com/api/allCourseByUniId/${param.id}`);
        setcourseData(call1.data.courses);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  }
console.log(courseData)
  return (
    <>
    <div className='artist-container'>
    
      {loading ? (
      <LoadingPage />
            ) : (<>
              <div className='artist-firstSection'>
                <div className='artist-addArtistDiv'>
                  <button
                    className='artist-addBtn'
                    onClick={() => history.push(`/Universities/addcourse/${param.id}`)}
                  >
                    <img src={addIcon} alt='add' className='artist-addIcon' />
                    <span>Add Course</span>
                  </button>
                </div>
            </div>
              
                    <div className='artist-tableSection'>
                    <div className='table-wrapper' id='#scrollBar'>
                      <table className='fl-table'>
                        <thead>
                          <tr>
                            <th>Course Name</th>
                            <th>Disciplines</th>
                            <th>Status</th>
                            <th>Application Fee (USD)</th>
                            <th>Program Fee (USD)</th>
                            <th>Department Email</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                              {
                                courseData.map((course,index)=>{
                                    return <Onecourse
                                      id={course._id}
                                      key = {index}
                                      name={course.name}
                                      discipline={course.discipline}
                                      activeStatus={course.activeStatus}
                                      applicationFees={course.applicationFees}
                                      programFees={course.programFees}
                                      departmentDetails={course.departmentDetails}
                                      courseid= {param.id}
                                    />
                                      })
                              }                        
                        </tbody>
                    </table>
                    </div>
                    </div>
                    </> 
    )}
    </div>
    </>
  )
}
// Search bar
    {/* <div className='artist-firstSection'>
            <div className='artist-searchDiv'>
              <img src={searchIcon} alt='search' className='searchIcon' />
              <input
                type='text'
                placeholder='Ex. Harvard University'
                className='artist-searchInput'
                id='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && fetchArtistList(searchInput)
                }
              />
            </div>
            <div className='artist-addArtistDiv'>
              <button
                className='artist-addBtn'
                onClick={() => history.push('/universities/add')}
              >
                <img src={addIcon} alt='add' className='artist-addIcon' />
                <span>Add University</span>
              </button>
            </div>
        </div> */}

export default ViewCoursePage