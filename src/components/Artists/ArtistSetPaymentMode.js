import React from 'react';
import backTick from '../../images/backTick.png';
import '../../styles/AddArtistForm.css';

const ArtistSetPaymentMode = (props) => {
  const { page, setPage, mode, setMode, formData, setFormData } = props;
  return (
    <div className='artist-setPaymentContainer'>
      <div className='artist-setCommissionDiv'>
        <div className='artist-commissionHeader'>
          <button className='backBtnTick' onClick={() => setPage(page - 1)}>
            <img src={backTick} alt='back' className='backBtnIcon' />
          </button>
          <h3 className='artist-setCommissionHead'>
            Add comission for artist *
          </h3>
        </div>
        <div className='artist-commissionInputDiv'>
          <input
            type='text'
            value={formData.commission}
            placeholder='(in percentage)'
            className='artist-commissionInput'
            onChange={(e) =>
              setFormData({ ...formData, commission: e.target.value })
            }
          />
        </div>
      </div>
      <div className='artist-setPayment'>
        <div className='artist-setPaymentHeader'>
          {/**<button className='backBtnTick' onClick={() => setPage(page - 1)}>
            <img src={backTick} alt='back' className='backBtnIcon' />
          </button> */}
          <h1 className='artist-setPaymentHeading'>Setup payment options</h1>
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
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistSetPaymentMode;
