import React, { useState, useEffect, Fragment } from 'react';
import 'react-phone-number-input/style.css';
import '../../styles/AddArtistForm.css';
import LoadingPage from '../utils/LoadingPage';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {

  university: "",
  name: null,
  discipline: [
    { name: null }
  ],
  applicationFees: null,
  programFees: null,
  programLength: null,
  transcriptRequired: false,
  financialDocuRequired: false,
  thirdPartyRequired: false,
  minGpaRequired: null,
  gre: {
    greRequired: null,
    greWaiver: null,
    minVerbal: null,
    minQuant: null,
    minAWA: null,
    minTotal: null,
  },
  toefl: {
    toeflAccepted: false,
    total: null,
    minReading: null,
    minWriting: null,
    minSpeaking: null,
    minListening: null,
  },
  ielts: {
    ieltsAccepted: false,
    total: null,
    minReading: null,
    minWriting: null,
    minSpeaking: null,
    minListening: null,
  },
  duolingo: {
    duoLingoAccepted: false,
    total: null,
    minLiteracy: null,
    minComprehension: null,
    minConversation: null,
    minProduction: null,
  },
  pte: {
    pteAccepted: false,
    minScore: null
  },
  fallDeadline: {
    priority: null,
    final: null,
  },
  springDeadline: {
    priority: null,
    final: null,
  },
  summerDeadline: {
    priority: null,
    final: null,
  },
  nonITAccepted: false,
  preWaiverForNonIT: false,
  last60UnitsConsidered: false,
  programDetails: null,

  departmentDetails: {
    address: null,
    number: null,
    email: null
  },

  activeStatus: false,
  admissionOffice: {
    address: null,
    number: null,
    email: null
  },
  courseUrl:null,
  remarks:null,
  loanAssist:false,
  jobAssist:false,
  private: {},
  public: {}
};



const Addcoursepage = () => {
  const [courseData, setcourseData] = useState(initialState);
  const [mode, setMode] = useState('account');
  const [page, setPage] = useState(1);
  const [showgrebox, setshowgrebox] = useState(0);
  const [loading, setLoading] = useState(false);
  const [spinn, setspinn] = useState(false);

  //special waiver box

  const onbox = (e) => {
    if (showgrebox == 1) {
      setshowgrebox(0);
    } else {
      setshowgrebox(1);
    }
  }
  const nobox = () => {
    setshowgrebox(0);
  }


  //useeffects
  const params = useParams();
  const history =useHistory();

  useEffect(() => {
      setcourseData({...courseData,university:params.id})
  }, [])
  

    //functions

  const handleChange = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, [name]: e.target.value });
  };

  const handlegre = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, gre: { ...courseData.gre, [name]: e.target.value } })
  }

  const handletoefl = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, toefl: { ...courseData.toefl, [name]: e.target.value } })
  }

  const handleielts = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, ielts: { ...courseData.ielts, [name]: e.target.value } })
  }

  const handleduolingo = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, duolingo: { ...courseData.duolingo, [name]: e.target.value } })
  }

  const handlepte = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, pte: { ...courseData.pte, [name]: e.target.value } })
  }
  const handlefalldeadline = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, fallDeadline: { ...courseData.fallDeadline, [name]: e.target.value } })
  }
  const handlesummerdeadline = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, summerDeadline: { ...courseData.summerDeadline, [name]: e.target.value } })
  }
  const handlespringdeadline = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, springDeadline: { ...courseData.springDeadline, [name]: e.target.value } })
  }
  const handledepartment = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, departmentDetails: { ...courseData.departmentDetails, [name]: e.target.value } })
  }
  const handleadmissionoffice = (e) => {
    const { name } = e.target;
    setcourseData({ ...courseData, admissionOffice: { ...courseData.admissionOffice, [name]: e.target.value } })
  }



const handlesubmit=async()=>{
  setspinn(true)
    try {
        await axios.post("https://flywise-admin2.herokuapp.com/api/createCourse",courseData);
        history.push('/Universities')
    setspinn(false)
        
    } catch (error) {
        console.log(error);
        setspinn(false)

    }
}

  return (
    <div className='addArtist-container'>
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          {page === 1 && (
            <div className='addArtist-personalDetails'>

              {/* 1 row */}

              <div className='addArtist-alignRow'>
                  
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>Course Name <span style={{color:"red",fontSize:"1.2rem"}}>*</span></label>
                    <input
                      type='text'
                      name='name'
                      onChange={handleChange}
                      id={courseData?.name?.length ? "" : "red-border"}
                      placeholder='Course Name'
                      className='addArtist-inputField'
                    />
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Discipline 
                    </label>
                    <select
                      className='addArtist-selectField'
                      defaultValue="Select A Country"
                      onChange={(e) => { setcourseData({ ...courseData, discipline: { name: e.target.value } }) }}>
                      <option value="">Choose a discipline</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information System">Information System</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Business Analytics">Business Analytics</option>
                    </select>
                  </div>

              </div>



              {/* 2th row */}

              <div className='addArtist-alignRow'>
                  
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Application Fee (USD) 
                    </label>
                    <input
                      type='number'
                      min="0"
                      max="200"
                      maxLength="3"
                      name='applicationFees'
                      onChange={handleChange}
                      placeholder='Between 0-200 USD'
                      className='addArtist-inputField'
                    />
                  </div>
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Program Fee (USD) 
                    </label>
                    <input
                      type='number'
                      min="1000"
                      max="100000"
                      name='programFees'
                      onChange={handleChange}
                      placeholder='1000-100000 USD'
                      className='addArtist-inputField'
                    />
                  </div>

              </div>



              {/* 3th row */}

              <div className='addArtist-alignRow'>
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Physical Transcript requirement 
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="transcriptRequired"
                      row
                      onChange={handleChange}
                      className='addArtist-inputField'
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>
                
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Financial Documents Requirement Review 
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="financialDocuRequired"
                      onChange={handleChange}
                      className='addArtist-inputField'
                      row>
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>
              </div>


              {/* 4th row */}

              <div className='addArtist-alignRow'>
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Third Party Transcript evaluation 
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="thirdPartyRequired"
                      row
                      onChange={handleChange}
                      className='addArtist-inputField'
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Minimum GPA Requirement 
                    </label>
                    <input
                      type='number'
                      min="0"
                      max="4.0"
                      name='minGpaRequired'
                      onChange={handleChange}
                      placeholder='for ex: 2.5 , 3.0'
                      className='addArtist-inputField'
                    />
                  </div>

              </div>



              {/* 5th row */}

              <div className='addArtist-alignRow'>
                  <div  className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      GRE Test Requirement 
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      name="greRequired"
                      row
                      onChange={handlegre}
                      className='addArtist-inputField'
                    >
                      <FormControlLabel value="true" onClick={nobox} control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" onClick={nobox} control={<Radio />} label="No" />
                      <FormControlLabel onClick={onbox} value="specialwaiver" control={<Radio />} label="Special Waiver" />
                      {showgrebox ? (<input type="text" onChange={handlegre} name="greWaiver" placeholder='Describe special waiver' className='addArtist-inputField' />
                      ) : ("")}
                    </RadioGroup>
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      GRE Minimum Score Requirement
                    </label>
                    {
                      (courseData?.gre?.greRequired == "false") ? (
                        <input type="text" onChange={handleChange}  value="N/A" className='addArtist-inputField' />
                      ) : (
                        <div className='addArtist-inputField'>

                          <div className='Greverbal'>
                            <h3 > Total</h3>
                            <label>Score </label>
                            <input onChange={handlegre} min="260" name="minTotal" max="340" placeholder='260 - 340' type="number" id="" />
                          </div>
                          <div className='Greverbal'>
                            <h3 > Verbal</h3>
                            <label>Score </label>
                            <input name="minVerbal" onChange={handlegre} min="130" max="170" placeholder='130 - 170' type="number" id="" />
                          </div>

                          <div className='Greverbal'>
                            <h3 > Quant</h3>
                            <label>Score </label>
                            <input name="minQuant" onChange={handlegre} min="130" max="170" type="number" placeholder='130 - 170' id="" />
                          </div>

                          <div className='Greverbal'>
                            <h3 > AWA</h3>
                            <label>Score </label>
                            <input name="minAWA" onChange={handlegre} min="0" max="6.0" placeholder=' 0 - 6' type="number" id="" />
                          </div>
                        </div>
                      )
                    }
                  </div>
              </div>


              {/* 6th row */}

              <div className='addArtist-alignRow'>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    Toefl Accepted ? 
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-row-controlled-radio-buttons-group"
                    row
                    onChange={handletoefl}
                    name="toeflAccepted"
                    className='addArtist-inputField'
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </div>

                <div className='addArtist-inputFieldDiv'>
                  <label className='addArtist-inputLabel'>
                    TOEFL Minimum Score Requirement
                  </label>
                {  
                  (courseData?.toefl?.toeflAccepted == "false") ? (
                        <input type="text" onChange={handleChange}  value="N/A" className='addArtist-inputField' />
                      ) : (
                  <div className='addArtist-inputField'>
                    <div className='toefl-category-box'>
                      <div className='toefl-category-box-single'>
                        <label >Total Score</label>
                        <input type="number" onChange={handletoefl} name="total" placeholder="< 120" max="120" min="0" />
                      </div>
                      <div className='toefl-category-box-single'>
                        <label >Reading</label>
                        <input type="number" onChange={handletoefl} name="minReading" placeholder='< 30' min="0" max="30" />
                      </div>
                      <div className='toefl-category-box-single'>
                        <label >Writing</label>
                        <input type="number" onChange={handletoefl} name="minWriting" placeholder='< 30' min="0" max="30" />
                      </div>
                      <div className='toefl-category-box-single'>
                        <label >Speaking</label>
                        <input type="number" onChange={handletoefl} name="minSpeaking" placeholder='< 30' min="0" max="30" />
                      </div>
                      <div className='toefl-category-box-single'>
                        <label >Listening</label>
                        <input type="number" onChange={handletoefl} name="minListening" placeholder='< 30' min="0" max="30" />
                      </div>
                    </div>
                  </div>
                  )}
                </div>

              </div>

                   
                   
                {/* 7th row */}


              <div className='addArtist-alignRow'>

                      <div className='addArtist-inputFieldDiv'>
                        <label className='addArtist-inputLabel'>
                          IELTS Accepted ? 
                        </label>
                        <RadioGroup
                          aria-labelledby="demo-row-controlled-radio-buttons-group"
                          row
                          onChange={handleielts}
                          name="ieltsAccepted"
                          className='addArtist-inputField'
                        >
                          <FormControlLabel value="true" control={<Radio />} label="Yes" />
                          <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                      </div>


                      <div className='addArtist-inputFieldDiv'>
                        <label className='addArtist-inputLabel'>
                          IELTS Minimum Score Requirement
                        </label>
              {  
                  (courseData?.ielts?.ieltsAccepted == "false") ? (
                        <input type="text" onChange={handleChange}  value="N/A" className='addArtist-inputField' />
                      ) : (  
                        <div className='addArtist-inputField'>

                          <div className='toefl-category-box'>
                            <div className='toefl-category-box-single'>
                              <label >Total Score</label>
                              <input type="number" onChange={handleielts} name="total" min="0" max="9" placeholder='< 9' />
                            </div>
                            <div className='toefl-category-box-single'>
                              <label >Reading</label>
                              <input type="number" onChange={handleielts} name="minReading" placeholder='< 9' min="0" max="9.0" />
                            </div>
                            <div className='toefl-category-box-single'>
                              <label >Writing</label>
                              <input type="number" onChange={handleielts} name="minWriting" placeholder='< 9' min="0" max="9.0" />
                            </div>
                            <div className='toefl-category-box-single'>
                              <label >Speaking</label>
                              <input type="number" onChange={handleielts} placeholder='< 9' min="0" max="9.0" name='minSpeaking' />
                            </div>
                            <div className='toefl-category-box-single'>
                              <label >Listening</label>
                              <input type="number" onChange={handleielts} placeholder='< 9' min="0" max="9.0" name='minListening' />
                            </div>
                          </div>
                        </div>
                        )}
                    </div>
              </div>

                {/* 8th Row */}


                <div className='addArtist-alignRow'>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Duolingo Accepted ? 
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        row
                        onChange={handleduolingo}
                        name="duoLingoAccepted"
                        className='addArtist-inputField'
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Duolingo Score Requirement 
                      </label>
                {  
                  (courseData?.duolingo?.duoLingoAccepted == "false") ? (
                        <input type="text" onChange={handleChange}  value="N/A" className='addArtist-inputField' />
                      ) : (  
                      <div className='addArtist-inputField'>

                        <div className='toefl-category-box'>
                          <div className='toefl-category-box-single'>
                            <label >Total Score</label>
                            <input type="number" onChange={handleduolingo} name="total" min="0" max="160" placeholder='< 160' />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Literacy</label>
                            <input type="number" onChange={handleduolingo} name="minLiteracy" placeholder='< 160' min="0" max="160" />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Comprehension</label>
                            <input type="number" onChange={handleduolingo} name="minComprehension" placeholder='< 160' min="0" max="160" />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Conversation</label>
                            <input type="number" onChange={handleduolingo} placeholder='< 160' min="0" max="160" name='minConversation' />
                          </div>
                          <div className='toefl-category-box-single'>
                            <label >Production</label>
                            <input type="number" onChange={handleduolingo} placeholder='< 160' min="0" max="160" name='minProduction' />
                          </div>
                        </div>
                      </div>
                      )}
                     </div>
                
                </div>


                    {/* 9th row */}

                <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      PTE Accepted ? 
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-row-controlled-radio-buttons-group"
                      row
                      onChange={handlepte}
                      name="pteAccepted"
                      className='addArtist-inputField'
                    >
                      <FormControlLabel value="true" control={<Radio />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>PTE</label>
                    {  
                  (courseData?.pte?.pteAccepted == "false") ? (
                        <input type="text" onChange={handleChange}  value="N/A" className='addArtist-inputField' />
                      ) : (  
                    <input
                      type='number'
                      name='minScore'
                      onChange={handlepte}
                      placeholder='< 90'
                      min="0"
                      max="90"
                      className='addArtist-inputField'
                    />
                    )}
                  </div>
                </div>


                {/* 10th row */}

                <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Fall Deadline
                    </label>

                    <div className='addArtist-inputField deadline-boxes'>
                      <div className='deadline-boxes-single'>
                        <a href='#'>Priority</a>
                        <input type="date" onChange={handlefalldeadline}
                          name='priority' className='addArtist-inputField'
                        />
                      </div>
                      <div className='deadline-boxes-single'>
                        <a href='#'>Final</a>
                        <input type="date" onChange={handlefalldeadline}
                          name='final' className='addArtist-inputField' />
                      </div>
                    </div>
                  </div>


                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Spring Deadline
                    </label>
                    <div className='addArtist-inputField deadline-boxes'>
                      <div className='deadline-boxes-single'>
                        <a href='#'>Priority</a>
                        <input type="date" onChange={handlespringdeadline}
                          name='priority' className='addArtist-inputField' />

                      </div>
                      <div className='deadline-boxes-single'>
                        <a href='#'>Final</a>
                        <input type="date" onChange={handlespringdeadline}
                          name='final' className='addArtist-inputField' />
                      </div>
                    </div>
                  </div>
                </div>


                {/* 11th row    */}


                <div className='addArtist-alignRow'>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Summer Deadline
                      </label>
                      <div className='addArtist-inputField deadline-boxes'>
                        <div className='deadline-boxes-single'>
                          <a href='#'>Priority</a>
                          <input type="date" onChange={handlesummerdeadline}
                            name='priority' className='addArtist-inputField' />
                        </div>
                        <div className='deadline-boxes-single'>
                          <a href='#'>Final</a>
                          <input type="date" onChange={handlesummerdeadline}
                            name='final'
                            className='addArtist-inputField' />
                        </div>
                      </div>
                    </div>


                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Non IT Background ?
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        name="nonITAccepted"
                        onChange={handleChange}
                        className='addArtist-inputField'
                        row
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>

                </div>


                {/* 12th row */}


                <div className='addArtist-alignRow'>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Pre Requisites Waiver for Non IT Background Students
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        name="preWaiverForNonIT"
                        onChange={handleChange}
                        className='addArtist-inputField'
                        row
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Last 60 Semester Units Consideration
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        name="last60UnitsConsidered"
                        onChange={handleChange}
                        className='addArtist-inputField'
                        row
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>

                </div>


                {/* 13th row */}
                <div className='addArtist-alignRow'>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Department Details
                      </label>
                      <div className='addArtist-inputField'>
                        <div className='department-details'>

                          <div className='department-details-single'>
                            <label >Email</label>
                            <input type="email" onChange={handledepartment} name="email" id="" />
                          </div>
                          <div className='department-details-single'>
                            <label>Address</label>
                            <input type="text" onChange={handledepartment} name='address' />
                          </div>
                          <div className='department-details-single'>
                            <label>Phone</label>
                            <input type="tel" onChange={handledepartment} name='number' />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Activity Status
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        name="activeStatus"
                        onChange={handleChange}
                        className='addArtist-inputField'
                        row>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>

              </div>


                {/* 14th row */}


                <div className='addArtist-alignRow'>

                  <div className='addArtist-inputFieldDiv'>
                        <label className='addArtist-inputLabel'>
                          Admission Office
                        </label>
                        <div className='addArtist-inputField'>
                          <div className='department-details'>

                            <div className='department-details-single'>
                              <label >Email</label>
                              <input type="email" onChange={handleadmissionoffice} name="email" id="" />
                            </div>
                            <div className='department-details-single'>
                              <label>Address</label>
                              <input type="text" onChange={handleadmissionoffice} name='address' />
                            </div>
                            <div className='department-details-single'>
                              <label>Phone</label>
                              <input type="tel" onChange={handleadmissionoffice} name='number' />
                            </div>
                          </div>
                        </div>
                      </div>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Program Length  (Months)
                      </label>
                      <input
                        type='number'
                        min="1"
                        max="60"
                        name='programLength'
                        onChange={handleChange}
                        placeholder='Enter a number'
                        className='addArtist-inputField'
                      />
                  </div>

                </div>

                <div className='addArtist-alignRow'>
                <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                        Loan Asistance
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        name="loanAssist"
                        onChange={handleChange}
                        className='addArtist-inputField'
                        row>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>

                    <div className='addArtist-inputFieldDiv'>
                      <label className='addArtist-inputLabel'>
                       Job Assistance
                      </label>
                      <RadioGroup
                        aria-labelledby="demo-row-controlled-radio-buttons-group"
                        name="jobAssist"
                        onChange={handleChange}
                        className='addArtist-inputField'
                        row>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </div>
                </div>



                <div className='addArtist-alignRow'>
                  
                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Course Link
                    </label>
                    <input
                      type='text'
                      name='courseUrl'
                      onChange={handleChange}
                      placeholder='Drop The Link Here'
                      className='addArtist-inputField'
                    />
                  </div>

                  <div className='addArtist-inputFieldDiv'>
                    <label className='addArtist-inputLabel'>
                      Remarks
                    </label>
                    <input
                      type='text'
                      name='remarks'
                      onChange={handleChange}
                      placeholder='Give Remarks to the course'
                      className='addArtist-inputField'
                    />
                  </div>
              </div>

                <div className='addArtist-submitDetailDiv'>
                  <button
                    className='addArtist-submitDetailBtn'
                    onClick={ handlesubmit }
                  >
                    Add Course
                    {
                        spinn ? (
                          <div class="spinner-border spinner-border-sm text-white mx-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>    
                        ) : ("")
                      }
                  </button>
                </div>
              </div>
          )}

            </Fragment>
          )}
        </div>
      );
};

      export default Addcoursepage;
