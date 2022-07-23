import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { getArtistList, addArtistAccount } from '../../redux/api';
import backTick from '../../images/backTick.png';
import LoadingPage from '../utils/LoadingPage';
// import ArtistAccountDetails from './ArtistAccountDetails';
// import CongratulationScreen from './CongratulationScreen';

const initialState = {
  accountNo: '',
  ifscCode: '',
  upiId: '',
  artistId: '',
};

const AddArtistAccount = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState('account');
  const [artistList, setArtistList] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [confirmAccount, setConfirmAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [boolVal, setBoolVal] = useState(false);

  const fetchArtistList = async () => {
    setLoading(true);
    try {
      const { data } = await getArtistList();
      // console.log(data);
      setArtistList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Something went wrong, please try later!');
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchArtistList();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = async () => {
    console.log(formData);
    if (formData.accountNo === confirmAccount) {
      if (
        (formData.accountNo !== '' && formData.ifscCode !== '') ||
        formData.upiId !== ''
      ) {
        try {
          setLoading(true);
          const { data } = await addArtistAccount(formData.artistId, {
            accountNo: formData.accountNo,
            ifscCode: formData.ifscCode,
            upiId: formData.upiId,
          });
          alert('Account details added!');
          setLoading(false);
          console.log(data);
        } catch (error) {
          alert('Something went wrong, please try later!');
          setLoading(false);
          console.log(error);
        }
      } else {
        alert('Please add account no. and ifsc code or UPI id');
      }
    } else {
      alert('Account number and confirm account number are not matching');
    }
  };

  return (
    <div className='addArtist-container '>
      <Fragment>
        {page === 1 && (
          <div className='artist-setPaymentContainer'>
            <div className='artist-setCommissionDiv'>
              <div className='artist-commissionHeader'>
                <button
                  className='backBtnTick'
                  onClick={() => history.push('/artists')}
                >
                  <img src={backTick} alt='back' className='backBtnIcon' />
                </button>
                <h3 className='artist-setCommissionHead'>Select Artist *</h3>
              </div>
              <div className='artist-commissionInputDiv'>
                <select
                  className='addArtist-selectField'
                  name='artistId'
                  value={formData.artistId}
                  onChange={handleChange}
                >
                  <option value='' selected={formData.artistId === ''}>
                    No select
                  </option>
                  {artistList?.map((artist) => (
                    <option value={artist.artistId}>{artist.artistName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='artist-setPayment'>
              <div className='artist-setPaymentHeader'>
                {/**<button className='backBtnTick' onClick={() => setPage(page - 1)}>
              <img src={backTick} alt='back' className='backBtnIcon' />
            </button> */}
                <h1 className='artist-setPaymentHeading'>
                  Setup payment options
                </h1>
              </div>
              <div className='artist-paymentOptionsDiv'>
                <div className='artist-paymentOption'>
                  <input
                    type='radio'
                    name='bankAcount'
                    className='artist-radioBtn'
                    checked={mode === 'account'}
                    onChange={() => setMode('account')}
                  />
                  <p className='artist-btnPara'>Enter Bank Account</p>
                </div>
                <div className='artist-paymentOption'>
                  <input
                    type='radio'
                    name='upiId'
                    className='artist-radioBtn'
                    checked={mode === 'upi'}
                    onChange={() => setMode('upi')}
                  />
                  <p className='artist-btnPara'>Enter UPI Id</p>
                </div>
              </div>
              <div className='artist-setPaymentBtnDiv'>
                <button
                  className='artist-setPaymentBtn'
                  onClick={() => {
                    if (formData.artistId !== '') {
                      setPage(page + 1);
                    } else {
                      alert('Please select artist');
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {page === 2 && (
          <div style={{ width: '50%', margin: 'auto' }}>
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
                    <label className='artist-accountInputLabel'>
                      ACCOUNT NO
                    </label>
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
                    <label className='artist-accountInputLabel'>
                      IFSC Code
                    </label>
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
                    <button
                      className='artist-submitAccount'
                      onClick={handleNext}
                    >
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
                    <button
                      className='artist-submitAccount'
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </Fragment>
      {loading && <LoadingPage />}
    </div>
  );
};

export default AddArtistAccount;
