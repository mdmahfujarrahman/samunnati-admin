import React, { useEffect, useRef, useState } from 'react';
import '../../styles/newstyles/addPropertyForm.css';
import { useHistory } from 'react-router-dom';
import { addProperty } from '../../redux/api';
import { storage } from '../../firebase';
import Select from 'react-select';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
const AddPropertyForm = () => {
  const isFirstRender = useRef(true);
  const [spinn, setspinn] = useState(false);
  const [selectedAmenities, setselectedAmenities] = useState([]);
  const history = useHistory();
  const amenitiesoptions = [
    { value: 'Car parking', label: 'Car parking' },
    { value: 'Security services', label: 'Security services' },
    { value: 'CCTV', label: 'CCTV' },
    { value: 'Water supply', label: 'Water supply' },
    { value: 'Elevators', label: 'Elevators' },
    { value: 'Power backup', label: 'Power backup' },
    { value: '24-hour maintenance', label: '24-hour maintenance' },
    { value: 'Walking/Jogging track', label: 'Walking/Jogging track' },
    { value: 'Play area', label: 'Play area' },
    { value: 'Clubhouse', label: 'Clubhouse' },
    { value: 'Swimming pool', label: 'Swimming pool' },
    { value: 'Gym', label: 'Gym' },
    { value: 'Rooftop garden/Terrace', label: 'Rooftop garden/Terrace' },
    { value: 'Private Terrace', label: 'Private Terrace' },
    { value: 'Balcony', label: 'Balcony' },
    { value: 'Indoor Games', label: 'Indoor Games' },
    { value: 'Outdoor Play area', label: 'Outdoor Play area' },
    { value: 'Kids Play area', label: 'Kids Play area' },
    { value: 'Basketball court', label: 'Basketball court' },
    { value: 'Badminton Court', label: 'Badminton Court' },
    { value: 'Elderly Sitting Area', label: 'Elderly Sitting Area' },
    { value: 'Open deck', label: 'Open deck' },
    { value: 'Sky lounge', label: 'Sky lounge' },
    { value: 'Spa/salon', label: 'Spa/salon' },
    { value: 'Cafeteria', label: 'Cafeteria' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Party hall', label: 'Party hall' },
    { value: 'Multi-purpose Hall', label: 'Multi-purpose Hall' },
    {
      value: 'Temple and religious activity place',
      label: 'Temple and religious activity place',
    },
    { value: 'Cinema hal', label: 'Cinema hal' },
    { value: 'Amphitheater', label: 'Amphitheater' },
    { value: 'Wi-Fi connectivity', label: 'Wi-Fi connectivity' },
    { value: 'Provision Shops', label: 'Provision Shops' },
    { value: 'Kids Swimming Pool', label: 'Kids Swimming Pool' },
    { value: 'Others', label: 'Others' },
  ];
  const [propertyData, setpropertyData] = useState({
    name: '',
    location: '',
    lat: '',
    lng: '',
    city: '',
    area: '',
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
  const handleInputAmenitieschange = (value) => {
    setselectedAmenities(value);
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
            console.log(url);
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
        amenities: selectedAmenities.map((amen) => amen.value),
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
      price: propertyData.price == '' ? true : false,
      ready: propertyData.ready == '' ? true : false,
      unitsLeft: propertyData.unitsLeft == '' ? true : false,
      amenities: !selectedAmenities.length ? true : false,
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
                Video Title{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="title"
                placeholder="Video Title"
                className="addproperty-inputField"
                id={error.name ? 'red-border' : ''}
                onChange={handleInputchange('name')}
              />
            </div>
            {/* Location */}
            <div className="addproperty-inputFieldDiv form-group">
              <label className="addproperty-inputLabel">
                Uploaded By{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                id={error.location ? 'red-border' : ''}
                name="Property Location"
                placeholder="Uploaded By"
                className="addproperty-inputField"
                onChange={handleInputchange('location')}
              />
            </div>
          </div>

          {/* 3rd row */}

          <div className="addproperty-alignRow">
            {/* City */}
            <div className="addproperty-inputFieldDiv">
              <label className="addproperty-inputLabel">
                Date <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="date"
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
                Length <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="text"
                name="City"
                placeholder="Length"
                className="addproperty-inputField"
                onChange={handleInputchange('city')}
                id={error.city ? 'red-border' : ''}
              />
            </div>
 
          </div>

          <div className="addproperty-alignRow">
            {/* Amenities */}
            <div className="addproperty-textFieldDiv">
            <label className="addproperty-inputLabel">
                File <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="file"
                name="City"
                placeholder="Upload Video"
                className="addproperty-inputField"
                onChange={handleInputchange('city')}
                id={error.city ? 'red-border' : ''}
              />
            </div>
 
          </div>



          {/* 6th row */}
          <div className="addproperty-alignRow">
            {/* Amenities */}
            <div className="addproperty-textFieldDiv">
              <label className="addproperty-inputLabel">
                Categories{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <Select
                options={amenitiesoptions}
                isMulti
                className="addproperty-inputField"
                id={error.amenities ? 'red-border' : ''}
                onChange={(e) => handleInputAmenitieschange(e)}
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
                placeholder="Video Description"
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
