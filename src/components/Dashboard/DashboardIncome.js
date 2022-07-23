import React, { useEffect, useState } from 'react';
import { getPaymentList, appVisits, totalSubscriptions } from '../../redux/api';
import LoadingPage from '../utils/LoadingPage';

const DashboardIncome = (props) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [totalAppVisits, setTotalAppVisits] = useState(0);
  const [totalSubscription, setTotalSubscription] = useState(0);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTotalIncome = async () => {
    try {
      setLoading(true);
      const { data } = await getPaymentList();
      // console.log(data);
      let total = 0,
        count = 0;
      if (data.length === 0) {
        setLoading(false);
      }
      data.forEach((d) => {
        count += 1;
        total +=
          parseInt(d.amount) *
          (1 -
            parseInt(d?.artistId?.commission ? d?.artistId?.commission : 0) /
              100);
        if (count === data.length) {
          setLoading(false);
          setTotalIncome(total);
        }
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchWeeklyIncome = async () => {
    try {
      // setLoading(true);
      const { data } = await getPaymentList();
      let today = new Date();

      let before = new Date(today);
      before.setDate(today.getDate() - 6);
      let total = 0;
      data.forEach((d) => {
        if (new Date(d.createdAt).getTime() >= before) {
          total +=
            parseInt(d.amount) *
            (1 -
              parseInt(d?.artistId?.commission ? d?.artistId?.commission : 0) /
                100);
        }
      });
      // setLoading(false);
      setWeeklyIncome(total);
    } catch (err) {
      // setLoading(false);
      console.log(err);
    }
  };

  const fetchAppVisits = async () => {
    try {
      // setLoading(true);
      const { data } = await appVisits();
      // setLoading(false);
      setTotalAppVisits(data);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  const fetchTotalSubscriptions = async () => {
    try {
      // setLoading(true);
      const { data } = await totalSubscriptions();
      // setLoading(false);
      setTotalSubscription(data);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchTotalIncome();
      fetchWeeklyIncome();
      fetchAppVisits();
      fetchTotalSubscriptions();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <div className='incomeCard-container'>
      <h3 className='incomeCard-title'>My Income</h3>
      <div className='cardDiv'>
        <div className='incomeCard-div'>
          <div className='incomeCard'>
            <div className='incomeCard-content'>
              <p className='income-label'>Total income</p>
              <h3 className='income-amount'>
                ₹ <span>{parseInt(totalIncome).toFixed(2)}</span>
              </h3>
            </div>
            <div className='incomeCard-content'>
              <p className='income-label'>Weekly income</p>
              <h3 className='income-amount'>
                ₹ <span>{parseInt(weeklyIncome).toFixed(2)}</span>
              </h3>
            </div>
          </div>
        </div>
        <div className='users-div'>
          <div className='user-content'>
            <p className='user-numbers'>{totalAppVisits}</p>
            <p className='user-label'>Total no. of app visits</p>
          </div>
          <div className='user-content'>
            <p className='user-numbers'>{totalSubscription}</p>
            <p className='user-label'>Total no. of subscribers</p>
          </div>
        </div>
      </div>
      {loading && <LoadingPage />}
    </div>
  );
};

export default DashboardIncome;
