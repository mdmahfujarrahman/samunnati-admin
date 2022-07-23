import React, { useState, useEffect, Fragment } from 'react';
// import printIcon from '../../images/printIcon.svg';
import filterIcon from '../../images/filterIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import UsersTable from './UsersTable';
import axios from 'axios';
import '../../styles/UserPage.css';
import LoadingPage from '../utils/LoadingPage';

const UserPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setsearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterData, setfilterData] = useState([])

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const userData = await axios.get("https://flywise-admin2.herokuapp.com/api/allUsers");
      setAllUsers(userData.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };




    useEffect(() => {
        fetchUserList();
    }, []);

    const searchItems = (searchValue) => {
      setsearchInput(searchValue)
      if(searchInput !== ''){
        let filteredData =  allUsers.filter((item) => {  
        return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
        })
        setfilterData(filteredData)
      }else{
        setfilterData(allUsers)
      }
    }

  return (
    <div className='user-container'>
      {loading ? (
        <LoadingPage />
      ) : (
        <Fragment>
          <div className='user-firstSection'>
            <div className='user-searchDiv'>
              <img src={searchIcon} alt='search' className='searchIcon' />
              <input
                type='text'
                placeholder='Enter A Name'
                className='artist-searchInput'
                id='searchInput'
                value={searchInput}
                onChange={(e)=>searchItems(e.target.value)}
              />
            </div>
            <div className='user-filterDiv'>
              <button className='user-filterBtn'>
                <img src={filterIcon} alt='print' className='user-filterIcon' />
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div className='user-tableSection'>
          { (searchInput.length > 1) ?(
            <UsersTable Users = {filterData} />
                                      ):(
            <UsersTable Users = {allUsers} />
                                        )
          }
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UserPage;
