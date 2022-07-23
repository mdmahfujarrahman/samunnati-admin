import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import EmployeeOrdersTable from './EmployeeOrdersTable';
// import demoProfile from '../../images/demoProfile.png';
import {
  getAnEmployee,
  blockAndUnBlockEmployee,
  deleteAnEmployee,
  getArtistsOfAnEmployee,
  allPaymentForEmployee,
} from '../../redux/api';
import '../../styles/EmployeeDetails.css';

const EmployeeDetails = (props) => {
  const history = useHistory();
  const [employeeData, setEmployeeData] = useState({});
  const [linkedArtists, setLinkedArtists] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [totalArtist, setTotalArtist] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [boolVal, setBoolVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;

  const fetchTotalIncome = async (id) => {
    try {
      const { data } = await allPaymentForEmployee(id);
      setPaymentList(data);
      let totalIncome = 0;
      let totalOrder = 0;
      data.forEach((artist) => {
        if (artist?.paymentsOfArtist?.length > 0) {
          totalOrder += artist.paymentsOfArtist.length;
          artist.paymentsOfArtist.forEach((d) => {
            totalIncome += parseInt(d.amount);
          });
        }
      });
      setTotalOrders(totalOrder);
      setTotalIncome(totalIncome);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWeeklyIncome = async (id) => {
    try {
      const { data } = await allPaymentForEmployee(id);
      // console.log(data);
      let today = new Date();
      let before = new Date(today);
      before.setDate(today.getDate() - 6);
      let totalIncome = 0;

      data.forEach((artist) => {
        if (artist?.paymentsOfArtist?.length > 0) {
          artist.paymentsOfArtist.forEach((d) => {
            if (new Date(d.createdAt).getTime() >= before) {
              totalIncome += parseInt(d.amount);
            }
          });
        }
      });
      setWeeklyIncome(totalIncome);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployee = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getAnEmployee(id);
      // console.log(data);
      setEmployeeData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchArtists = async (id) => {
    try {
      const { data } = await getArtistsOfAnEmployee(id);
      setLinkedArtists(data);
      setTotalArtist(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchTotalIncome(id);
      fetchWeeklyIncome(id);
      fetchEmployee(id);
      fetchArtists(id);
      setBoolVal(true);
    }
  }, [boolVal, id]);

  const blockOrUnblock = async () => {
    try {
      await blockAndUnBlockEmployee(id);
      fetchEmployee(id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async () => {
    try {
      await deleteAnEmployee(id);
      history.push('/employees');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='employeeDetails-container'>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className='employeeDetails-personalInfoDiv'>
            <div className='employeeDetails-leftDiv'>
              <div className='employeeDetails-imageDiv'>
                <img
                  src={employeeData.profilePhoto}
                  alt='profilePic'
                  className='employeeDetails-image'
                />
              </div>
              <div className='employeeDetails-infoDiv'>
                <div className='employeeDetails-infoContent'>
                  <div className='employeeDetails-personal'>
                    <p className='employeeDetails-infoPara'>
                      {employeeData.username ? employeeData.username : ''},{' '}
                      <span className='employeeDetails-infoSpan'>
                        {employeeData.gender ? employeeData.gender : ''}
                      </span>
                    </p>
                    <p className='employeeDetails-infoPara'>
                      {employeeData.phone ? employeeData.phone : ''}
                    </p>
                    <p className='employeeDetails-infoPara'>
                      {employeeData.email ? employeeData.email : ''}
                    </p>
                  </div>
                  <div className='employeeDetails-account'>
                    <p className='employeeDetails-infoPara'>
                      <span className='employeeDetails-infoSpan'>
                        Account No:{' '}
                      </span>
                      {employeeData.accountNo ? employeeData.accountNo : 'NA'}
                    </p>
                    <p className='employeeDetails-infoPara'>
                      <span className='employeeDetails-infoSpan'>
                        IFSC Code:{' '}
                      </span>
                      {employeeData.ifscCode ? employeeData.ifscCode : 'NA'}
                    </p>
                    <p className='employeeDetails-infoPara'>
                      <span className='employeeDetails-infoSpan'>UPI Id: </span>
                      {employeeData.upiId ? employeeData.upiId : 'NA'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='employeeDetails-rightDiv'>
              <div className='employeeDetails-rightBtnDiv'>
                {id !== '6213c73e2d17e52c165d6c80' && (
                  <button
                    className='employeeDetails-rightBtn block'
                    onClick={blockOrUnblock}
                  >
                    {employeeData.blocked ? 'Unblock' : 'Block'}
                  </button>
                )}

                {id !== '6213c73e2d17e52c165d6c80' && (
                  <button
                    className='employeeDetails-rightBtn delete'
                    onClick={deleteEmployee}
                  >
                    Delete Account
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='employeeDetails-incomeSection'>
            <div className='employeeDetails-incomeCardDiv'>
              <p className='employeeDetails-incomeCardLabel'>Total Income</p>
              <div className='employeeDetails-incomeCard'>
                <h3 className='employeeDetails-incomeCardTitle'>
                  Total Income
                </h3>
                <p className='employeeDetails-income'>{`Rs ${totalIncome.toFixed(
                  2
                )}/-`}</p>
              </div>
            </div>
            <div className='employeeDetails-incomeCardDiv'>
              <p className='employeeDetails-incomeCardLabel'>Weekly Income</p>
              <div className='employeeDetails-incomeCard'>
                <h3 className='employeeDetails-incomeCardTitle'>
                  Weekly Income
                </h3>
                <p className='employeeDetails-income'>{`Rs ${weeklyIncome.toFixed(
                  2
                )}/-`}</p>
              </div>
            </div>
            <div className='employeeDetails-ordersDiv'>
              <h4 className='employeeDetails-orderTitle'>Total Artists</h4>
              <p className='employeeDetails-order'>{totalArtist}</p>
            </div>
            <div className='employeeDetails-ordersDiv'>
              <h4 className='employeeDetails-orderTitle'>Total Orders</h4>
              <p className='employeeDetails-order'>{totalOrders}</p>
            </div>
          </div>
          <div className='employeeDetails-tableSection'>
            <EmployeeOrdersTable
              linkedArtists={linkedArtists}
              paymentList={paymentList}
              setBoolVal={setBoolVal}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default EmployeeDetails;
