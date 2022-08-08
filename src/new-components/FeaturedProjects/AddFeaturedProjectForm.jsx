import React, { useEffect, useRef, useState } from 'react';
import '../../styles/newstyles/addProjectForm.css';
import { useHistory } from 'react-router-dom';
import { addProject } from '../../redux/api';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const AddFeaturedProjectForm = () => {
  const isFirstRender = useRef(true);
  const [spinn, setspinn] = useState(false);
  const history = useHistory();

  const [projectData, setprojectData] = useState({
    image: '',
  });

  const [error, setError] = useState({
    image: false,
  });
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
          setprojectData({ ...projectData, image: url });
        });
      }
    );
  };

  const handlerValidatedFormSubmit = async () => {
    try {
      await addProject(projectData);
      history.push('/featuredprojects');
      setspinn(false);
    } catch (error) {
      console.log(error);
      setspinn(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const updatedError = {
      image: projectData.image === '' ? true : false,
    };
    setError(updatedError);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      if (!error.image) {
        setspinn(true);
        handlerValidatedFormSubmit();
      }
    }
  }, [error]);

  return (
    <form>
      <div className="addproject-container">
        <div className="addproject-personalDetails">
          <div className="addproject-alignRow">
            <div className="addproject-textFieldDiv ">
              <label className="addproject-inputLabel">
                Featured Project{' '}
                <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
              </label>
              <input
                type="file"
                name="Featured Project"
                placeholder="Featured Project"
                className="addproject-inputField"
                onChange={handleFileInputchange('featuredProject')}
                id={error.authorPicture ? 'red-border' : ''}
              />
            </div>
          </div>
          <div className="addproject-submitDetailDiv">
            <button
              className="addproject-submitDetailBtn"
              onClick={handlesubmit}
            >
              Add Project
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

export default AddFeaturedProjectForm;
