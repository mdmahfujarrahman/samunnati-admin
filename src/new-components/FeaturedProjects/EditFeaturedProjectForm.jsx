import React, { useEffect, useRef, useState } from 'react';
import '../../styles/newstyles/addBlogForm.css';
import { useParams, useHistory } from 'react-router-dom';
import { getProjectById, updateBlog, updateProperty } from '../../redux/api';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import LoadingPage from '../../new-components/utils/LoadingPage';
const EditFeaturedProjectForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const [spinn, setspinn] = useState(false);
  const [projectData, setprojectData] = useState({});

  const [error, setError] = useState({
    image: false,
  });
  const getProjectData = async () => {
    setLoading(true);
    try {
      const res = await getProjectById(id);
      const data = res.data.data;
      setprojectData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProjectData(id);
  }, []);

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
      await updateProperty(projectData);
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
        {loading ? (
          <LoadingPage />
        ) : (
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
                <div className="addblog-inputFieldDiv-image">
                  <img
                    src={projectData.image}
                    height="300px"
                    width="300px"
                    alt="product image"
                  />
                </div>
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
        )}
      </div>
    </form>
  );
};

export default EditFeaturedProjectForm;
