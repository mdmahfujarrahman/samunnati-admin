import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/unitdetails.css';
import { getAllLoan } from '../../redux/api';
// import UDtable from './AllUnitDetails/UDtable';

const UnitDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [allUnitDetailsData, setallUnitDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);
  const getUnitDetailsData = async () => {
    setLoading(true);
    try {
      const res = await getById(id);
      const ldata = res.data.data;
      setLoanData(ldata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getLoanData(id);
  }, []);
  const fetchCarrerList = async () => {
    setLoading(true);
    try {
      const res = await getAllLoan();
      setallUnitDetailsData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCarrerList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchValue !== '') {
      let filteredData = allUnitDetailsData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allUnitDetailsData);
    }
  };

  return (
    <div className="unidetails-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="unidetails-firstSection">
            <div className="unidetails-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Name , Description or More"
                className="unidetails-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="unidetails-addloanDiv">
              <button
                className="unidetails-addBtn"
                onClick={() => history.push('/trendingloans/add')}
              >
                <img src={addIcon} alt="add" className="unidetails-addIcon" />
                <span>Add Loan</span>
              </button>
            </div>
          </div>
          <div className="unidetails-tableSection">
            {searchInput.length ? (
              <TLtable loanData={filterData} />
            ) : (
              <TLtable loanData={allUnitDetailsData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default UnitDetails;
