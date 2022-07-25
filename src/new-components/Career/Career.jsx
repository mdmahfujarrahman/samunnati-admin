import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/career.css';
import Ctable from './AllCareers/Ctable';
import { getAllCareer } from '../../redux/api';

const Career = () => {
  const history = useHistory();
  const [allCareerData, setallCareerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);

  const fetchCarrerList = async () => {
    setLoading(true);
    try {
      const res = await getAllCareer();
      setallCareerData(res.data.data);
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
      let filteredData = allCareerData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allCareerData);
    }
  };

  return (
    <div className="career-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="career-firstSection">
            <div className="career-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Name , Description or More"
                className="career-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="career-addcareerDiv">
              <button
                className="career-addBtn"
                onClick={() => history.push('/career/add')}
              >
                <img src={addIcon} alt="add" className="career-addIcon" />
                <span>Add Career</span>
              </button>
            </div>
          </div>
          <div className="career-tableSection">
            {searchInput.length ? (
              <Ctable careerData={filterData} />
            ) : (
              <Ctable careerData={allCareerData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Career;
