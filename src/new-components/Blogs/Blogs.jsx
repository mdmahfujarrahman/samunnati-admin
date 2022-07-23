import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../utils/LoadingPage';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/newstyles/blogs.css';
import Btable from './AllBlogs/Btable';
import { getAllBlogs } from '../../redux/api';

const Blogs = () => {
  const history = useHistory();
  const [allblogData, setallblogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([]);

  const fetchblogList = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setallblogData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchblogList();
  }, []);

  const searchItems = (searchValue) => {
    setsearchInput(searchValue);
    if (searchValue !== '') {
      let filteredData = allblogData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setfilterData(filteredData);
    } else {
      setfilterData(allblogData);
    }
  };

  return (
    <div className="blogs-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="blogs-firstSection">
            <div className="blogs-searchDiv">
              <img src={searchIcon} alt="search" className="searchIcon" />
              <input
                type="text"
                placeholder="Enter a Title , Author or Category"
                className="blogs-searchInput"
                id="searchInput"
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className="blogs-addblogsDiv">
              <button
                className="blogs-addBtn"
                onClick={() => history.push('/blog/add')}
              >
                <img src={addIcon} alt="add" className="blogs-addIcon" />
                <span>Add Blogs</span>
              </button>
            </div>
          </div>
          <div className="blogs-tableSection">
            {searchInput.length ? (
              <Btable blogData={filterData} />
            ) : (
              <Btable blogData={allblogData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Blogs;
