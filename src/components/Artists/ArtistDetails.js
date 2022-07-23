import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ArtistOrdersTable from './ArtistOrdersTable';
import {
  getAnArtist,
  blockAndUnBlockArtist,
  deleteAnArtist,
  totalAndPendingOrdersForArtist,
  allPaymentForArtist,
  EditArtist,
} from '../../redux/api';
import paymentIcon from '../../images/paymentIcon.svg';
import editIcon from '../../images/editIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import '../../styles/ArtistDetails.css';

const ArtistDetails = (props) => {
  const history = useHistory();
  const [artistData, setArtistData] = useState({});
  // const [artistCommission, setArtistCommission] = useState(0);
  const [orderData, setOrderData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [paymentList, setPaymentList] = useState([]);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [boolVal, setBoolVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;

  const fetchArtist = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getAnArtist(id);
      // console.log(data);
      setArtistData(data);
      // setArtistCommission(parseInt(data.commission) / 100);
      setPaidAmount(parseInt(data.paid));
      fetchTotalIncome(parseInt(data.commission) / 100);
      fetchWeeklyIncome(parseInt(data.commission) / 100);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchTotalOrdersAndPending = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await totalAndPendingOrdersForArtist(id);
      setOrderData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchTotalIncome = async (comm) => {
    try {
      const { data } = await allPaymentForArtist(id);
      setPaymentList(data);
      let total = 0,
        pending = 0;
      data.forEach((d) => {
        if (d.status === 'pending') {
          pending += parseInt(d.amount);
        }
        total += parseInt(d.amount);
      });
      setPendingAmount(pending * comm);
      setTotalIncome(total * comm);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWeeklyIncome = async (comm) => {
    try {
      const { data } = await allPaymentForArtist(id);
      let today = new Date();

      let before = new Date(today);
      before.setDate(today.getDate() - 6);
      let total = 0;
      data.forEach((d) => {
        if (new Date(d.createdAt).getTime() >= before) {
          total += parseInt(d.amount);
        }
      });
      setWeeklyIncome(total * comm);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchArtist(id);
      fetchTotalOrdersAndPending(id);
      setBoolVal(true);
    }
  }, [boolVal, id]);

  const blockOrUnblock = async () => {
    try {
      await blockAndUnBlockArtist(id);
      fetchArtist(id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArtist = async () => {
    try {
      await deleteAnArtist(id);
      history.push('/artists');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      const { data } = await EditArtist(id);
      // window.localStorage.setItem('fanstarToken', data);
      window.open(`https://fanstar.app/artist/landing/${data}`, '_blank');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='artistDetails-container'>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className='artistDetails-personalInfoDiv'>
            <div className='artistDetails-leftDiv'>
              <div className='artistDetails-imageDiv'>
                <img
                  src={artistData.profilePhoto}
                  alt='profilePic'
                  className='artistDetails-image'
                />
              </div>
              <div className='artistDetails-infoDiv'>
                <div className='artistDetails-infoContent'>
                  <div className='artistDetails-personal'>
                    <p className='artistDetails-infoPara'>
                      {artistData.username ? artistData.username : ''},{' '}
                      <span className='artistDetails-infoSpan'>
                        {artistData.gender ? artistData.gender : ''}
                      </span>
                    </p>
                    <p className='artistDetails-infoPara'>
                      {artistData.phone ? artistData.phone : ''}
                    </p>
                    <p className='artistDetails-infoPara'>
                      {artistData.email ? artistData.email : ''}
                    </p>
                  </div>
                  <div className='artistDetails-account'>
                    <p className='artistDetails-infoPara'>
                      <span className='artistDetails-infoSpan'>
                        Account No:{' '}
                      </span>
                      {artistData.accountNo ? artistData.accountNo : 'NA'}
                    </p>
                    <p className='artistDetails-infoPara'>
                      <span className='artistDetails-infoSpan'>
                        IFSC Code:{' '}
                      </span>
                      {artistData.ifscCode ? artistData.ifscCode : 'NA'}
                    </p>
                    <p className='artistDetails-infoPara'>
                      <span className='artistDetails-infoSpan'>UPI Id: </span>
                      {artistData.upiId ? artistData.upiId : 'NA'}
                    </p>
                  </div>
                </div>
                <div className='artistDetails-leftBtnDiv'>
                  <button
                    className='artistDetails-leftBtns'
                    onClick={handleEdit}
                  >
                    Edit
                    <img src={editIcon} alt='edit' className='iconBtn' />
                  </button>
                  <CopyToClipboard
                    text={
                      artistData.appName
                        ? `https://fanstar.app/${artistData.appName
                            .split(' ')
                            .join('-')}`
                        : 'undefined'
                    }
                    onCopy={() => alert('Artist link copied!')}
                  >
                    <button className='artistDetails-leftBtns'>
                      Share
                      <img src={shareIcon} alt='edit' className='iconBtn' />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className='artistDetails-rightDiv'>
              <div className='artistDetails-rightBtnDiv'>
                {
                  <button
                    className='artistDetails-rightBtn block paymentBtn'
                    onClick={() =>
                      history.push({
                        pathname: `/artists/detail/${id}/pay`,
                        state: {
                          // requests: pendingWithdraw,
                          artistName: artistData.username,
                        },
                      })
                    }
                  >
                    <span>Payment</span>
                  </button>
                }
                <button
                  className='artistDetails-rightBtn block'
                  onClick={blockOrUnblock}
                >
                  {artistData.blocked ? 'Unblock' : 'Block'}
                </button>
                <button
                  className='artistDetails-rightBtn delete'
                  onClick={deleteArtist}
                >
                  Delete Account
                </button>
              </div>
              <div className='artist-orderDetailDiv'>
                <div className='artistDetails-ordersDiv'>
                  <h4 className='artistDetails-orderTitle'>Total Orders</h4>
                  <p className='artistDetails-order'>{orderData.totalOrders}</p>
                </div>
                <div className='artistDetails-ordersDiv'>
                  <h4 className='artistDetails-orderTitle'>Pending Orders</h4>
                  <p className='artistDetails-order'>
                    {orderData.pendingOrders}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='artistDetails-incomeSection'>
            <div className='artistDetails-incomeCardDiv'>
              <p className='artistDetails-incomeCardLabel'>Total Income</p>
              <div className='artistDetails-incomeCard'>
                <h3 className='artistDetails-incomeCardTitle'>Total Income</h3>
                <p className='artistDetails-income'>{`Rs ${totalIncome.toFixed(
                  2
                )}/-`}</p>
              </div>
            </div>
            <div className='artistDetails-incomeCardDiv'>
              <p className='artistDetails-incomeCardLabel'>Weekly Income</p>
              <div className='artistDetails-incomeCard'>
                <h3 className='artistDetails-incomeCardTitle'>Weekly Income</h3>
                <p className='artistDetails-income'>{`Rs ${weeklyIncome.toFixed(
                  2
                )}/-`}</p>
              </div>
            </div>
            <div className='artistDetails-incomeCardDiv'>
              <p className='artistDetails-incomeCardLabel'>Amount Paid</p>
              <div className='artistDetails-incomeCard'>
                <h3 className='artistDetails-incomeCardTitle'>Amount Paid</h3>
                <p className='artistDetails-income'>{`Rs ${paidAmount.toFixed(
                  2
                )}/-`}</p>
              </div>
            </div>
            <div className='artistDetails-incomeCardDiv'>
              <p className='artistDetails-incomeCardLabel'>
                Withdrawable Balance
              </p>
              <div className='artistDetails-incomeCard'>
                <h3 className='artistDetails-incomeCardTitle'>Balance</h3>
                <p className='artistDetails-income'>
                  {totalIncome - pendingAmount - paidAmount >= 0
                    ? `Rs ${(totalIncome - pendingAmount - paidAmount).toFixed(
                        2
                      )}/-`
                    : 'Rs 0/-'}
                </p>
              </div>
            </div>
          </div>
          <div className='artistDetails-tableSection'>
            <ArtistOrdersTable paymentList={paymentList} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ArtistDetails;
