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
    price: '',
    ready: '',
    unitsLeft: '',
    amenities: '',
    pictures: [],
    description: '',
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
    pictures: false,
    description: false,
  });

  const handleInputchange = (name) => (event) => {
    setpropertyData({ ...propertyData, [name]: event.target.value });
  };

  async function uploadImageAsPromise(file) {
    const storageRef = ref(storage, `PropertyPictures/${file.name}`);
    return new Promise(function (resolve, reject) {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        function error(err) {
          reject(err);
        },
        async function complete() {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  }
  const handleFileInputchange = async (e) => {
    e.preventDefault();
    const promises = [];
    for (const file of e.target.files) {
      promises.push(uploadImageAsPromise(file));
    }
    const data = await Promise.all(promises);
    setpropertyData({ ...propertyData, pictures: data });
  };

  const handlerValidatedFormSubmit = async () => {
    try {
      const payloaddata = {
        ...propertyData,
        ready: propertyData.ready === 'YES' ? true : false,
        amenities: propertyData.amenities.split(' ').filter((t) => t.length),
        area: propertyData.area + 'sqft',
        developer: {},
        unitDetails: [],
      };
      console.log(payloaddata);
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
      name: propertyData.name == '' ? true : false,
      location: propertyData.location == '' ? true : false,
      lat: propertyData.lat == '' ? true : false,
      lng: propertyData.lng == '' ? true : false,
      city: propertyData.city == '' ? true : false,
      area: propertyData.area == '' ? true : false,
      BHK: propertyData.BHK == '' ? true : false,
      price: propertyData.price == '' ? true : false,
      ready: propertyData.ready == '' ? true : false,
      unitsLeft: propertyData.unitsLeft == '' ? true : false,
      amenities: propertyData.amenities == '' ? true : false,
      pictures: !propertyData.pictures.length ? true : false,
      description: propertyData.description == '' ? true : false,
    };
    setError(updatedError);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      if (
        !error.name &&
        !error.location &&
        !error.lat &&
        !error.log &&
        !error.city &&
        !error.area &&
        !error.BHK &&
        !error.price &&
        !error.ready &&
        !error.unitsLeft &&
        !error.amenities &&
        !error.description &&
        !error.pictures
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
            {/* Property Name */}
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
                onChange={handleInputchange('name')}
              />
            </div>
            {/* Location */}
            <div className="addproperty-inputFieldDiv form-group">
              <label className="addproperty-inputLabel">
                Property Location{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                id={error.location ? 'red-border' : ''}
                name="Property Location"
                placeholder="Property Location"
                className="addproperty-inputField"
                onChange={handleInputchange('location')}
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="addproperty-alignRow">
            {/* Location Latitude */}
            <div className="addproperty-inputFieldDiv form-group">
              <label className="addproperty-inputLabel">
                Location Latitude{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="Location Latitude"
                id={error.lat ? 'red-border' : ''}
                placeholder="Location Latitude"
                className="addproperty-inputField"
                onChange={handleInputchange('lat')}
              />
            </div>
            {/* Location Longitude */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Location Longitude{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                name="Location Longitude"
                id={error.lng ? 'red-border' : ''}
                onChange={handleInputchange('lng')}
                placeholder="Location Longitude"
                className="addproperty-inputField"
                type="text"
              />
            </div>
          </div>
          {/* 3rd row */}

          <div className="addproperty-alignRow">
            {/* City */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                City <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="City"
                placeholder="City"
                className="addproperty-inputField"
                onChange={handleInputchange('city')}
                id={error.city ? 'red-border' : ''}
              />
            </div>
            {/* Area */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Area <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="Area"
                placeholder="Area"
                className="addproperty-inputField"
                onChange={handleInputchange('area')}
                id={error.area ? 'red-border' : ''}
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="addproperty-alignRow">
            {/* BHK */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                BHK <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="number"
                name="BHK"
                placeholder="BHK"
                className="addproperty-inputField"
                onChange={handleInputchange('BHK')}
                id={error.BHK ? 'red-border' : ''}
              />
            </div>
            {/* Price */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Price{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="Price"
                placeholder="(xx L-yy L)"
                className="addproperty-inputField"
                onChange={handleInputchange('price')}
                id={error.price ? 'red-border' : ''}
              />
            </div>
          </div>
          {/* 5th row */}
          <div className="addproperty-alignRow">
            {/* Property Ready To Move In*/}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Ready To Move In{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <div onChange={handleInputchange('ready')}>
                <input type="radio" value="YES" name="city" /> YES
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" value="NO" name="city" /> NO
              </div>
            </div>
            {/* Units Left */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Units Left{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="number"
                name="Units Left"
                placeholder="Units Left"
                className="addproperty-inputField"
                onChange={handleInputchange('unitsLeft')}
                id={error.area ? 'red-border' : ''}
              />
            </div>
          </div>

          {/* 6th row */}
          <div className="addproperty-alignRow">
            {/* Amenities */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Amenities{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                className="addproperty-inputField"
                onChange={handleInputchange('amenities')}
                type="text"
                name="amenities"
                id={error.amenities ? 'red-border' : ''}
              />
            </div>

            {/* Property  Pictures */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Property Pictures{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="file"
                name="thumbnail"
                placeholder="Thumbnail"
                className="addproperty-inputField"
                onChange={(e) => handleFileInputchange(e)}
                id={error.pictures ? 'red-border' : ''}
                multiple
              />
            </div>
          </div>

          {/* 7th row */}
          <div className="addproperty-alignRow">
            {/*Description*/}
            <div className="addproperty-textFieldDiv">
              <label className="addproperty-inputLabel">
                Description{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <textarea
                className="addproperty-textField"
                onChange={handleInputchange('description')}
                name="Description"
                placeholder="Property Description"
                id={error.description ? 'red-border' : ''}
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
