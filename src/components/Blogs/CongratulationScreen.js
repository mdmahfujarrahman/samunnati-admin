import React from 'react';
import { useHistory } from 'react-router-dom';
import congrats from '../../images/congrats.png';
import '../../styles/AddEmployeeForm.css';

const CongratulationScreen = () => {
  const history = useHistory();
  return (
    <div className='employee-congratsContainer'>
      <div className='employee-congratsImgDiv'>
        <img
          src={congrats}
          alt='congratulations'
          className='employee-congratsImg'
        />
      </div>
      <div className='employee-congratsContent'>
        <h3 className='employee-congratsHeading'>
          Employee account is created
        </h3>
        <p className='employee-congratsSubheading'>
          The new account will appear on top of employees page
        </p>
      </div>

      <button
        className='employee-goBackBtn'
        onClick={() => history.push('/employees')}
      >
        Go back
      </button>
    </div>
  );
};

export default CongratulationScreen;
