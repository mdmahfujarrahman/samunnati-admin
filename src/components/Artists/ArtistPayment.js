import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { payToArtist } from '../../redux/api';
import ConfirmationScreen from './ConfirmationScreen';
import '../../styles/ArtistPayment.css';

const ArtistPayment = (props) => {
  const history = useHistory();
  const [amount, setAmount] = useState('');
  const [confirmScreen, setConfirmScreen] = useState(false);
  const state = props.location.state;
  const id = props.match.params.id;
  if (!state) {
    history.push(`/artists/detail/${id}`);
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePay = async () => {
    try {
      await payToArtist({
        // withdrawId: state.requests[state.requests.length - 1]._id,
        artistId: id,
        amount: amount,
      });
      alert('Amount Paid!');
      history.push(`/artists/detail/${id}`);
      setConfirmScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openConfirm = () => {
    if (amount > 0) {
      setConfirmScreen(true);
    } else {
      alert('Please add some amount');
    }
  };

  return (
    <div className='artistPay-container'>
      <h3 className='artistPay-heading'>{`Pay to ${state.artistName}`}</h3>
      {/**<p className='artistPay-content'>Payment requested</p>
      <p className='artistPay-amount'>
        {`Rs ${state.requests[state.requests.length - 1].amount}/-`}
      </p> */}
      <input
        type='number'
        min='0'
        onChange={handleChange}
        className='artistPay-inputField'
        value={amount}
        placeholder='Ex. 500'
      />
      <button className='artistPay-btn' onClick={openConfirm}>
        Pay
      </button>
      {confirmScreen && (
        <ConfirmationScreen
          close={() => setConfirmScreen(false)}
          proceedPay={handlePay}
        />
      )}
    </div>
  );
};

export default ArtistPayment;
