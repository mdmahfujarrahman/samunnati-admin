import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/unitdetails.css';
import Qtable from './AllQuery/Qtable';
import { GetQuery } from '../../redux/api';

const Query = () => {
  const history = useHistory();
  const { id } = useParams();
  const [QueryData, setQueryData] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);

  useEffect(() => {
    Query()
  }, []);

  // api call

  const Query = async () => {
    try {
      const data = await GetQuery()
      setQueryData(data?.data?.data)
      console.log(data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchValue !== '') {
      let filteredData = QueryData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(QueryData);
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
              <Qtable QueryData={filterData} />
            ) : (
              <Qtable QueryData={QueryData} />
            )
            }
          </div>
        </>
      )}
    </div>
  );
};
export default Query;
