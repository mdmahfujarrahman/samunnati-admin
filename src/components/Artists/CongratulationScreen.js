import React from 'react';
import { useHistory } from 'react-router-dom';
import congrats from '../../images/congrats.png';
import '../../styles/AddArtistForm.css';

const CongratulationScreen = () => {
  const history = useHistory();
  return (
    <div className='artist-congratsContainer'>
      <div className='artist-congratsImgDiv'>
        <img
          src={congrats}
          alt='congratulations'
          className='artist-congratsImg'
        />
      </div>
      <div className='artist-congratsContent'>
        <h3 className='artist-congratsHeading'>Artist account is created</h3>
        <p className='artist-congratsSubheading'>
          The new account will appear on top of artists page
        </p>
      </div>

      <button
        className='artist-goBackBtn'
        onClick={() => history.push('/artists')}
      >
        Go back
      </button>
    </div>
  );
};

export default CongratulationScreen;
