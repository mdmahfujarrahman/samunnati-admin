import React, { Fragment, useState } from 'react';
import backTick from '../../images/backTick.png';
import { createArtist } from '../../redux/api';
import '../../styles/AddArtistForm.css';
import LoadingPage from '../utils/LoadingPage';

const ArtistAccountDetails = (props) => {
  const { page, setPage, mode, formData, setFormData, handleChange } = props;
  const [confirmAccount, setConfirmAccount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePrevious = () => {
    setFormData({ ...formData, accountNo: '', upiId: '', ifscCode: '' });
    setConfirmAccount('');
    setPage(page - 1);
  };

  const handleNext = () => {
    if (mode === 'account') {
      if (formData.accountNo === confirmAccount) {
        if (formData.username && formData.phone && formData.appName) {
          handleSubmit();
        } else {
          alert('All fields are required');
        }
      } else {
        alert('Account number and confirm account number are different');
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await createArtist(formData);
      // console.log(data);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.error);
      alert(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : 'Something went wrong, Please try later!'
      );
    }
  };

  return (
    <div className='artist-accountDetailsDiv'>
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          {mode === 'account' ? (
            <Fragment>
              <div className='artist-accountDetailHeader'>
                <button className='backBtnTick' onClick={handlePrevious}>
                  <img src={backTick} alt='back' className='backBtnIcon' />
                </button>
                <h1 className='artist-accountDetailHeading'>
                  Add Payment Account
                </h1>
              </div>
              <div className='artist-accountFormDiv'>
                <div className='artist-accountInputDiv'>
                  <label className='artist-accountInputLabel'>NAME</label>
                  <input
                    type='text'
                    name='accountHolderName'
                    placeholder='Account holder name'
                    className='artist-accountInput'
                  />
                </div>
                <div className='artist-accountInputDiv'>
                  <label className='artist-accountInputLabel'>ACCOUNT NO</label>
                  <input
                    type='text'
                    name='accountNo'
                    value={formData.accountNo}
                    onChange={handleChange}
                    placeholder='Account number'
                    className='artist-accountInput'
                  />
                </div>
                <div className='artist-accountInputDiv'>
                  <label className='artist-accountInputLabel'>
                    CONFIRM ACCOUNT NO
                  </label>
                  <input
                    type='text'
                    name='confirmAccount'
                    value={confirmAccount}
                    onChange={(e) => setConfirmAccount(e.target.value)}
                    placeholder='Confirm account number'
                    className='artist-accountInput'
                  />
                </div>
                <div className='artist-accountInputDiv'>
                  <label className='artist-accountInputLabel'>IFSC Code</label>
                  <input
                    type='text'
                    name='ifscCode'
                    value={formData.ifscCode}
                    onChange={handleChange}
                    placeholder='IFSC code'
                    className='artist-accountInput'
                  />
                </div>
                <div className='artist-accountInputDiv'>
                  <label className='artist-accountInputLabel'>UPI Id</label>
                  <input
                    type='text'
                    name='upiId'
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder='UPI Id'
                    className='artist-accountInput'
                  />
                </div>
                <div className='artist-submitAccountDiv'>
                  <button className='artist-submitAccount' onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className='artist-accountDetailHeader'>
                <button
                  className='backBtnTick'
                  onClick={() => setPage(page - 1)}
                >
                  <img src={backTick} alt='back' className='backBtnIcon' />
                </button>
                <h1 className='artist-accountDetailHeading'>Add UPI ID</h1>
              </div>
              <div className='artist-accountFormDiv'>
                <div className='artist-accountInputDiv'>
                  <label className='artist-accountInputLabel'>UPI ID</label>
                  <input
                    type='text'
                    name='upiId'
                    value={formData.upiId}
                    placeholder='UPI ID'
                    onChange={handleChange}
                    className='artist-accountInput'
                  />
                </div>
                <div className='artist-submitAccountDiv'>
                  <button className='artist-submitAccount' onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ArtistAccountDetails;
