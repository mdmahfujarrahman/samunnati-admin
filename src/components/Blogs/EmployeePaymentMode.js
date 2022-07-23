import React from 'react';
import backTick from '../../images/backTick.png';
import '../../styles/AddEmployeeForm.css';

const EmployeePaymentMode = (props) => {
  const { page, setPage, mode, setMode } = props;
  return (
    <div className='employee-setPaymentContainer'>
      <div className='employee-commission'>
        <button
          className='employee-backBtnTick'
          onClick={() => setPage(page - 1)}
        >
          <img src={backTick} alt='back' className='backBtnIcon' />
        </button>
        <div className='employee-setPaymentHeader'>
          <h3 className='employee-heading'>Add comission for employee *</h3>
        </div>
        <input
          type='text'
          className='employee-cutInput'
          placeholder="Employee's commission"
        />
      </div>
      <div className='employee-setPayment'>
        <div className='employee-setPaymentHeader'>
          {/**<button className='backBtnTick' onClick={() => setPage(page - 1)}>
            <img src={backTick} alt='back' className='backBtnIcon' />
          </button> */}
          <h1 className='employee-setPaymentHeading'>Setup payment options</h1>
        </div>
        <div className='employee-paymentOptionsDiv'>
          <div className='employee-paymentOption'>
            <input
              type='radio'
              name='bankAcount'
              className='employee-radioBtn'
              checked={mode === 'account'}
              onChange={() => setMode('account')}
            />
            <p className='employee-btnPara'>Enter Bank Account</p>
          </div>
          <div className='employee-paymentOption'>
            <input
              type='radio'
              name='upiId'
              className='employee-radioBtn'
              checked={mode === 'upi'}
              onChange={() => setMode('upi')}
            />
            <p className='employee-btnPara'>Enter UPI Id</p>
          </div>
        </div>
        <div className='employee-setPaymentBtnDiv'>
          <button
            className='employee-setPaymentBtn'
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeePaymentMode;
