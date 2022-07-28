import React, { useEffect, useRef, useState } from 'react';
import '../../styles/newstyles/addCareerForm.css';
import { useHistory } from 'react-router-dom';
import { addCareer } from '../../redux/api';

const AddCareerForm = () => {
  const isFirstRender = useRef(true);
  const [spinn, setspinn] = useState(false);
  const history = useHistory();

  const [careerData, setCareerData] = useState({
    location: '',
    description: '',
    department: '',
    name: '',
    experience: '',
    salary: '',
  });

  const [error, setError] = useState({
    location: false,
    description: false,
    department: false,
    name: false,
    experience: false,
    salary: false,
  });

  const handleInputchange = (name) => (event) => {
    setCareerData({ ...careerData, [name]: event.target.value });
  };
  const handleSalaryInputChange = (event) => {
    setCareerData({ ...careerData, salary: event.target.value + 'L' });
  };

  const handlerValidatedFormSubmit = async () => {
    try {
      await addCareer(careerData);
      history.push('/career');
      setspinn(false);
    } catch (error) {
      console.log(error);
      setspinn(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const updatedError = {
      location: careerData.location === '' ? true : false,
      description: careerData.description === '' ? true : false,
      department: careerData.department === '' ? true : false,
      name: careerData.name === '' ? true : false,
      experience: careerData.experience === '' ? true : false,
      salary: careerData.salary === '' ? true : false,
    };
    setError(updatedError);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      if (
        !error.location &&
        !error.description &&
        !error.department &&
        !error.name &&
        !error.experience &&
        !error.salary
      ) {
        setspinn(true);
        handlerValidatedFormSubmit();
      }
    }
  }, [error]);

  return (
    <form>
      <div className="addcareer-container">
        <div className="addcareer-personalDetails">
          {/* 1st row */}
          <div className="addcareer-alignRow">
            {/* Career Name */}
            <div className="addcareer-inputFieldDiv form-group">
              <label className="addcareer-inputLabel ">
                Career Name{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="Career Name"
                placeholder="Career Name"
                className="addcareer-inputField"
                id={error.name ? 'red-border' : ''}
                onChange={handleInputchange('name')}
              />
            </div>
            {/* Department*/}
            <div className="addcareer-inputFieldDiv form-group">
              <label className="addcareer-inputLabel">
                Department{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                id={error.department ? 'red-border' : ''}
                name="Title"
                placeholder="Department Name"
                className="addcareer-inputField"
                onChange={handleInputchange('department')}
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="addcareer-alignRow">
            {/* Location */}
            <div className="addcareer-inputFieldDiv form-group">
              <label className="addcareer-inputLabel">
                Location{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="location"
                id={error.location ? 'red-border' : ''}
                placeholder="Location"
                className="addcareer-inputField"
                onChange={handleInputchange('location')}
              />
            </div>
            {/* Salary (in Lpa)*/}
            <div className="addcareer-inputFieldDiv">
              <label className="addcareer-inputLabel">
                Salary (in Lpa){' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                name="salary"
                id={error.salary ? 'red-border' : ''}
                onChange={handleSalaryInputChange}
                className="addcareer-inputField"
                placeholder="Salary"
                type="text"
              />
            </div>
          </div>
          {/* 3rd row */}

          <div className="addcareer-alignRow">
            {/* Author PIctue */}
            <div className="addcareer-inputFieldDiv form-group">
              <label className="addcareer-inputLabel">
                Experience{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="experience"
                id={error.experience ? 'red-border' : ''}
                placeholder="Experience"
                className="addcareer-inputField"
                onChange={handleInputchange('experience')}
              />
            </div>
          </div>
          {/* 4th Row  */}
          <div className="addcareer-alignRow">
            <div className="addcareer-textFieldDiv">
              <label className="addcareer-inputLabel">
                Description{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <textarea
                className="addcareer-textField"
                value={careerData.description}
                onChange={handleInputchange('description')}
                name="description"
                id={error.description ? 'red-border' : ''}
              ></textarea>
            </div>
          </div>
          {/* Submit */}
          <div className="addcareer-submitDetailDiv">
            <button
              className="addcareer-submitDetailBtn"
              onClick={handlesubmit}
            >
              Add career
              {spinn ? (
                <div
                  class="spinner-border spinner-border-sm text-white mx-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                ''
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCareerForm;
