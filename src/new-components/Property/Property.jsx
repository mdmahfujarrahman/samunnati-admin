import React,{useEffect,useState} from 'react'
import LoadingPage from '../utils/LoadingPage';
import '../../styles/ArtistPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import addIcon from '../../images/addIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Ptable from './Ptable';

function Property() {
    const [loading, setLoading] = useState(false);
      const [searchInput, setsearchInput] = useState('');

    const history= useHistory();



    //api call
    const unicall =async()=>{
        setLoading(true);
       
        try {

          setLoading(false);
        } catch (error) {
          setLoading(false);
            console.log(error);
          }
        }

            // searchIcon

            
  const searchItems = (searchValue) => {
    setsearchInput(searchValue)
    // if(searchInput !== ''){
    //   let filteredData =  universityData.filter((item) => {  
    //   return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
    //   })
    //   setfilterData(filteredData)
    // }else{
    //   setfilterData(universityData)
    // }
  }
  
    return (
    <>
        <div className='artist-container'>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className='artist-firstSection'>
            <div className='artist-searchDiv'>
              <img src={searchIcon} alt='search' className='searchIcon' />
              <input
                type='text'
                placeholder='Ex. Harvard University'
                className='artist-searchInput'
                id='searchInput'
                value={searchInput}
                onChange={(e)=>searchItems(e.target.value)}
              />
            </div>
            <div className='artist-addArtistDiv'>
              <button
                className='artist-addBtn'
                onClick={() => history.push('/universities/add')}
              >
                <img src={addIcon} alt='add' className='artist-addIcon' />
                <span>Add University</span>
              </button>
            </div>
        </div>
          <div className='artist-tableSection'>
          <Ptable/>
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default Property