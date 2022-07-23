import React, { Fragment, useState } from 'react';
import backTick from '../../images/backTick.png';
import { createEmployee } from '../../redux/api';
import '../../styles/AddEmployeeForm.css';
import LoadingPage from '../utils/LoadingPage';

const EmployeeAccountDetails = (props) => {
  const { page, setPage, mode, formData, handleChange, setFormData } = props;
  const [confirmAccount, setConfirmAccount] = useState('');
  const [loading, setLoading] = useState(false);
  // const [show, setShow] = useState(mode === 'account' ? false : true);

  const handleBack = () => {
    setFormData({ ...formData, accountNo: '', ifscCode: '', upiId: '' });
    setConfirmAccount('');
    setPage(page - 1);
  };

  const handleNext = () => {
    if (mode === 'account') {
      if (formData.accountNo === confirmAccount) {
        // setPage(page + 1);
        handleSubmit();
      } else {
        alert('Account number and confirm account number are different');
      }
    } else {
      handleSubmit();
      // setPage(page + 1);
    }
  };

  const handleSubmit = async () => {
    // console.log(formData);
    setLoading(true);
    try {
      const { data } = await createEmployee(formData);
      console.log(data);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className='employee-accountDetailsDiv'>
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          {mode === 'account' ? (
            <Fragment>
              <div className='employee-accountDetailHeader'>
                <button className='backBtnTick' onClick={handleBack}>
                  <img src={backTick} alt='back' className='backBtnIcon' />
                </button>
                <h1 className='employee-accountDetailHeading'>
                  Add Payment Account
                </h1>
              </div>
              <div className='employee-accountFormDiv'>
                <div className='employee-accountInputDiv'>
                  <label className='employee-accountInputLabel'>NAME</label>
                  <input
                    type='text'
                    name='fullName'
                    placeholder='Account holder name'
                    className='employee-accountInput'
                  />
                </div>
                <div className='employee-accountInputDiv'>
                  <label className='employee-accountInputLabel'>
                    ACCOUNT NO
                  </label>
                  <input
                    type='text'
                    name='accountNo'
                    placeholder='Account number'
                    className='employee-accountInput'
                    onChange={handleChange}
                    value={formData.accountNo}
                  />
                </div>
                <div className='employee-accountInputDiv'>
                  <label className='employee-accountInputLabel'>
                    CONFIRM ACCOUNT NO
                  </label>
                  <input
                    type='text'
                    name='confirmAccount'
                    value={confirmAccount}
                    onChange={(e) => setConfirmAccount(e.target.value)}
                    placeholder='Confirm account number'
                    className='employee-accountInput'
                  />
                </div>
                <div className='employee-accountInputDiv'>
                  <label className='employee-accountInputLabel'>
                    IFSC Code
                  </label>
                  <input
                    type='text'
                    name='ifscCode'
                    onChange={handleChange}
                    value={formData.ifscCode}
                    placeholder='IFSC code'
                    className='employee-accountInput'
                  />
                </div>
                <div className='employee-accountInputDiv'>
                  <label className='employee-accountInputLabel'>UPI ID</label>
                  <input
                    type='text'
                    name='upiId'
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder='UPI ID'
                    className='employee-accountInput'
                  />
                </div>
                <div className='employee-submitAccountDiv'>
                  <button
                    className='employee-submitAccount'
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className='employee-accountDetailHeader'>
                <button
                  className='backBtnTick'
                  onClick={() => setPage(page - 1)}
                >
                  <img src={backTick} alt='back' className='backBtnIcon' />
                </button>
                <h1 className='employee-accountDetailHeading'>Add UPI ID</h1>
              </div>
              <div className='employee-accountFormDiv'>
                <div className='employee-accountInputDiv'>
                  <label className='employee-accountInputLabel'>UPI ID</label>
                  <input
                    type='text'
                    name='upiId'
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder='UPI ID'
                    className='employee-accountInput'
                  />
                </div>
                <div className='employee-submitAccountDiv'>
                  <button
                    className='employee-submitAccount'
                    onClick={handleNext}
                  >
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

export default EmployeeAccountDetails;
