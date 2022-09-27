import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/unitdetails.css';
import Utable from './AllUser/Utable';
import { GetQuery, GetUsers } from '../../redux/api';

const User = () => {
  const history = useHistory();
  const { id } = useParams();
  const [UserData, setUserData] = useState([])
  const [loading, setLoading] = useState(true);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);

  useEffect(() => {
    getAllUser()
  }, []);

  // api call

  const getAllUser = async () => {
    try {
      const data = await GetUsers()
      setUserData(data?.data?.data)
      console.log(data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchValue !== '') {
      let filteredData = UserData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(UserData);
    }
  };

  return (
    <div className="unitdetails-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="unitdetails-firstSection">
            <div className="unitdetails-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Name , Description or More"
                className="unitdetails-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
          </div>
          <div className="unitdetails-tableSection">
            {searchInput.length ? (
              <Utable UserData={filterData} />
            ) : (
              <Utable UserData={UserData} />
            )
            }
          </div>
        </>
      )}
    </div>
  );
};
export default User;
