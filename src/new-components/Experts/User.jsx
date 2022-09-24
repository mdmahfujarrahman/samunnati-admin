import React, { useState, useEffect } from 'react';
import LoadingPage from '../utils/LoadingPage';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/expert.css';
import Utable from './AllExperts/Utable';
import { getAllExperts, GetUsers } from '../../redux/api';

const User = () => {
  const [allexpertData, setallexpertData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);

  const fetchexpertList = async () => {
    setLoading(true);
    try {
      const res = await GetUsers();
      console.log(res)
      setallexpertData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchexpertList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchValue !== '') {
      let filteredData = allexpertData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allexpertData);
    }
  };

  return (
    <div className="expert-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="expert-firstSection">
            <div className="expert-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Title , Author or Category"
                className="expert-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
          </div>
          <div className="expert-tableSection">
            {searchInput.length ? (
              <Utable expertData={filterData} />
            ) : (
              <Utable expertData={allexpertData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default User;
