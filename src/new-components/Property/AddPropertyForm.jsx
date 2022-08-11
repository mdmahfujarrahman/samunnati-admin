import React, { useEffect, useRef, useState } from 'react';
import '../../styles/newstyles/addPropertyForm.css';
import { useHistory } from 'react-router-dom';
import { addProperty } from '../../redux/api';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
const AddPropertyForm = () => {
  const isFirstRender = useRef(true);
  const [spinn, setspinn] = useState(false);
  const history = useHistory();

  const [propertyData, setpropertyData] = useState({
    name: '',
    location: '',
    lat: '',
    lng: '',
    city: '',
    area: '',
    BHK: '',
    price: 'L',
    ready: '',
    unitsLeft: '',
    amenities: [],
    description: '',
    pictures: [],
    unitDetails: [
      // {
      //   bhk: '',
      //   detail: [
      //     {
      //       facing: '',
      //       floorPlan: '',
      //       size: '',
      //       price: '',
      //     },
      //   ],
      // },
    ],
  });

  const [error, setError] = useState({
    name: false,
    location: false,
    lat: false,
    lng: false,
    city: false,
    area: false,
    BHK: false,
    price: false,
    ready: false,
    unitsLeft: false,
    amenities: false,
    description: false,
    pictures: false,
    unitDetails: false,
  });

  const handleInputchange = (name) => (event) => {
    setpropertyData({ ...propertyData, [name]: event.target.value });
  };
  const handleTimeInputChange = (event) => {
    setpropertyData({
      ...propertyData,
      timeToRead: event.target.value + 'min',
    });
  };

  const handleFileInputchange = (name) => async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `${name}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setpropertyData({ ...propertyData, [name]: url });
        });
      }
    );
  };

  const handlerValidatedFormSubmit = async () => {
    try {
      const payloaddata = {
        ...propertyData,
        tags: propertyData.tags.split(' ').filter((t) => t.length), //later change to tags array
      };
      await addProperty(payloaddata);
      history.push('/property');
      setspinn(false);
    } catch (error) {
      console.log(error);
      setspinn(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const updatedError = {
      title: propertyData.title === '' ? true : false,
      picture: propertyData.picture === '' ? true : false,
      authorName: propertyData.authorName === '' ? true : false,
      authorPicture: propertyData.authorPicture === '' ? true : false,
      category: propertyData.category === '' ? true : false,
      timeToRead: propertyData.timeToRead === '' ? true : false,
      tags: propertyData.tags === '' ? true : false, //later change to tags array
      content: propertyData.content === '' ? true : false,
    };
    setError(updatedError);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      if (
        !error.title &&
        !error.picture &&
        !error.authorName &&
        !error.authorPicture &&
        !error.category &&
        !error.timeToRead &&
        !error.tags &&
        !error.content
      ) {
        setspinn(true);
        handlerValidatedFormSubmit();
      }
    }
  }, [error]);

  return (
    <form>
      <div className="addproperty-container">
        <div className="addproperty-personalDetails">
          {/* 1st row */}
          <div className="addproperty-alignRow">
            {/* aUthor Name */}
            <div className="addproperty-inputFieldDiv form-group">
              <label className="addproperty-inputLabel ">
                Property Name{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="Property Name"
                placeholder="Property Name"
                className="addproperty-inputField"
                id={error.name ? 'red-border' : ''}
                onChange={handleInputchange('authorName')}
              />
            </div>
            {/* Title */}
            <div className="addproperty-inputFieldDiv form-group">
              <label className="addproperty-inputLabel">
                Property Title{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                id={error.title ? 'red-border' : ''}
                name="Title"
                placeholder="Property Title"
                className="addproperty-inputField"
                onChange={handleInputchange('title')}
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="addproperty-alignRow">
            {/* Category */}
            <div className="addproperty-inputFieldDiv form-group">
              <label className="addproperty-inputLabel">
                Category{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="title"
                id={error.category ? 'red-border' : ''}
                placeholder="Title Tagling"
                className="addproperty-inputField"
                onChange={handleInputchange('category')}
              />
            </div>
            {/* TimetoRead */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Time To Read (Minutes){' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                name="minutes"
                id={error.timeToRead ? 'red-border' : ''}
                onChange={handleTimeInputChange}
                className="addproperty-inputField"
                type="number"
              />
            </div>
          </div>
          {/* 3rd row */}

          <div className="addproperty-alignRow">
            {/* Author PIctue */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Author Profile{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="file"
                name="profilePic"
                placeholder="Author Profile"
                className="addproperty-inputField"
                onChange={handleFileInputchange('authorPicture')}
                id={error.authorPicture ? 'red-border' : ''}
              />
            </div>
            {/* Property Picture */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Property Picture{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="file"
                name="thumbnail"
                placeholder="Thumbnail"
                className="addproperty-inputField"
                onChange={handleFileInputchange('picture')}
                id={error.picture ? 'red-border' : ''}
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="addproperty-alignRow">
            {/* Tags */}
            <div className="addproperty-textFieldDiv">
              <label className="addproperty-inputLabel">
                Tags <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                className="addproperty-inputField"
                onChange={handleInputchange('tags')}
                type="text"
                name="tag"
                id={error.tags ? 'red-border' : ''}
              />
            </div>
          </div>
          {/* 5th row */}
          <div className="addproperty-alignRow">
            {/*content*/}
            <div className="addproperty-textFieldDiv">
              <label className="addproperty-inputLabel">
                Content{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <textarea
                className="addproperty-textField"
                onChange={handleInputchange('content')}
                name="caption"
                id={error.content ? 'red-border' : ''}
              ></textarea>
            </div>
          </div>

          <div className="addproperty-submitDetailDiv">
            <button
              className="addproperty-submitDetailBtn"
              onClick={handlesubmit}
            >
              Add Property
              {spinn ? (
                <div
                  class="spinner-border spinner-border-sm text-white mx-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                ''
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddPropertyForm;
