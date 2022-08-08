import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/featuredproject.css';
import FPtable from './AllProjects/FPtable';
import { getAllProject } from '../../redux/api';

const FeaturedProject = () => {
  const history = useHistory();
  const [allProjectData, setallProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);

  const fetchProjectList = async () => {
    setLoading(true);
    try {
      const res = await getAllProject();
      setallProjectData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjectList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchValue !== '') {
      let filteredData = allProjectData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allProjectData);
    }
  };

  return (
    <div className="project-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="project-firstSection">
            <div className="project-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Name , Description or More"
                className="project-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="project-addprojectDiv">
              <button
                className="project-addBtn"
                onClick={() => history.push('/featuredprojects/add')}
              >
                <img src={addIcon} alt="add" className="project-addIcon" />
                <span>Add Project</span>
              </button>
            </div>
          </div>
          <div className="project-tableSection">
            {searchInput.length ? (
              <FPtable projectData={filterData} />
            ) : (
              <FPtable projectData={allProjectData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default FeaturedProject;
