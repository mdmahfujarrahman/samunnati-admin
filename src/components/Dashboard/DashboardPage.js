import React, { useEffect, useState } from 'react';
import { getPaymentList } from '../../redux/api';
import DashboardTable from './DashboardTable';
import DashboardIncome from './DashboardIncome';
// import DashboardGraph from './DashboardGraph';
import filterIcon from '../../images/filterIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/DashboardPage.css';

const DashboardPage = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);

  const fetchPaymentList = async () => {
    try {
      const { data } = await getPaymentList();
      setPaymentList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchPaymentList();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-cards'>
        <DashboardIncome paymentList={paymentList} />
        {/**<DashboardGraph /> */}
      </div>
      <div className='dashboard-firstSection'>
        {/* <div className='dashboard-searchDiv'>
          <img src={searchIcon} alt='search' className='searchIcon' />
          <input
            type='text'
            placeholder='Ex. Order Id, Artist'
            className='dashboard-searchInput'
            id='searchInput'
          />
        </div> */}
        {/* <div className='dashboard-filterDiv'>
          <button className='dashboard-filterBtn'>
            <img
              src={filterIcon}
              alt='print'
              className='dashboard-filterIcon'
            />
            <span>Filter</span>
          </button>
        </div> */}
      </div>
      <div className='dashboard-tableSection'>
        <DashboardTable paymentList={paymentList} />
      </div>
    </div>
  );
};

export default DashboardPage;
