import React, { useEffect, useRef, useState } from 'react';
import '../../styles/newstyles/addBlogForm.css';
import { useParams, useHistory } from 'react-router-dom';
import { addBlog, getblog, updateBlog } from '../../redux/api';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import LoadingPage from '../../new-components/utils/LoadingPage';
const EditBlogForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const [spinn, setspinn] = useState(false);
  const [blogData, setblogData] = useState({});

  const [error, setError] = useState({
    title: false,
    picture: false,
    authorName: false,
    authorPicture: false,
    category: false,
    timeToRead: false,
    tags: false,
    content: false,
  });
  const getBlogData = async () => {
    setLoading(true);
    try {
      const res = await getblog(id);
      const bdata = res.data.data;
      setblogData({
        ...bdata,
        tags: bdata.tags.join(' '), //later change to tags array,
        timeToRead: bdata.timeToRead.slice(0, -3),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogData(id);
  }, []);

  const handleInputchange = (name) => (event) => {
    setblogData({ ...blogData, [name]: event.target.value });
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
          setblogData({ ...blogData, [name]: url });
        });
      }
    );
  };

  const handlerValidatedFormSubmit = async () => {
    try {
      const payloaddata = {
        ...blogData,
        tags: blogData.tags.split(' ').filter((t) => t.length), //later change to tags array
        timeToRead: blogData.timeToRead + 'min',
      };
      console.log(payloaddata);
      await updateBlog(payloaddata);
      history.push('/blogs');
      console.log('update complete');
      setspinn(false);
    } catch (error) {
      console.log(error);
      setspinn(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const updatedError = {
      title: blogData.title === '' ? true : false,
      picture: blogData.picture === '' ? true : false,
      authorName: blogData.authorName === '' ? true : false,
      authorPicture: blogData.authorPicture === '' ? true : false,
      category: blogData.category === '' ? true : false,
      timeToRead: blogData.timeToRead === '' ? true : false,
      tags: blogData.tags === '' ? true : false, //later change to tags array
      content: blogData.content === '' ? true : false,
    };
    setError(updatedError);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('first render');
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
        console.log('not first render-valid form');
        setspinn(true);
        handlerValidatedFormSubmit();
      }
    }
  }, [error]);

  return (
    <form>
      <div className="addblog-container">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="addblog-personalDetails">
            {/* 1st row */}
            <div className="addblog-alignRow">
              {/* aUthor Name */}
              <div className="addblog-inputFieldDiv form-group">
                <label className="addblog-inputLabel ">
                  Author Name{' '}
                  <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
                </label>
                <input
                  value={blogData.authorName}
                  type="text"
                  name="Author Name"
                  placeholder="Full Name"
                  className="addblog-inputField"
                  id={error.authorName ? 'red-border' : ''}
                  onChange={handleInputchange('authorName')}
                />
              </div>
              {/* Title */}
              <div className="addblog-inputFieldDiv form-group">
                <label className="addblog-inputLabel">
                  Blog Title{' '}
                  <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
                </label>
                <input
                  type="text"
                  value={blogData.title}
                  id={error.title ? 'red-border' : ''}
                  name="Title"
                  placeholder="Blog Title"
                  className="addblog-inputField"
                  onChange={handleInputchange('title')}
                />
              </div>
            </div>

            {/* 2nd row */}
            <div className="addblog-alignRow">
              {/* Category */}
              <div className="addblog-inputFieldDiv form-group">
                <label className="addblog-inputLabel">
                  Category{' '}
                  <span style={{ color: 'red', fontSize: '1.2rem' }}>*</span>{' '}
                </label>
                <input
                  type="text"
                  value={blogData.category}
                  name="title"
                  id={error.category ? 'red-border' : ''}
                  placeholder="Title Tagling"
                  className="addblog-inputField"
                  onChange={handleInputchange('category')}
                />
              </div>
              {/* TimetoRead */}
              <div className="addblog-inputFieldDiv">
                <label className="addblog-inputLabel">
                  Time To Read (Minutes)
                </label>
                <input
                  name="minutes"
                  value={blogData.timeToRead}
                  id={error.timeToRead ? 'red-border' : ''}
                  onChange={handleInputchange('timeToRead')}
                  className="addblog-inputField"
                  type="number"
                />
              </div>
            </div>

            {/* 3rd row */}
            <div className="addblog-alignRow">
              {/* Author PIctue */}
              <div className="addblog-inputFieldDiv">
                <label className="addblog-inputLabel">Author Profile</label>
                <input
                  type="file"
                  name="profilePic"
                  placeholder="Author Profile"
                  className="addblog-inputField"
                  onChange={handleFileInputchange('authorPicture')}
                  id={error.authorPicture ? 'red-border' : ''}
                />
                <div className="addblog-inputFieldDiv-image">
                  <img
                    src={blogData.authorPicture}
                    height="100px"
                    width="100px"
                    alt="product image"
                  />
                </div>
              </div>
              {/* Blog Picture */}
              <div className="addblog-inputFieldDiv">
                <label className="addblog-inputLabel">Blog Picture</label>
                <input
                  type="file"
                  name="thumbnail"
                  placeholder="Thumbnail"
                  className="addblog-inputField"
                  onChange={handleFileInputchange('picture')}
                  id={error.picture ? 'red-border' : ''}
                />
                <div className="addblog-inputFieldDiv-image">
                  <img
                    src={blogData.picture}
                    height="100px"
                    width="100px"
                    alt="product image"
                  />
                </div>
              </div>
            </div>

            {/* 4th row */}
            <div className="addblog-alignRow">
              {/* Tags */}
              <div className="addblog-textFieldDiv">
                <label className="addblog-inputLabel">Tags</label>
                <input
                  className="addblog-inputField"
                  value={blogData.tags}
                  onChange={handleInputchange('tags')}
                  type="text"
                  name="tag"
                  id={error.tags ? 'red-border' : ''}
                />
              </div>
            </div>

            {/* 5th row */}
            <div className="addblog-alignRow">
              {/*content*/}
              <div className="addblog-textFieldDiv">
                <label className="addblog-inputLabel">Content</label>
                <textarea
                  className="addblog-textField"
                  value={blogData.content}
                  onChange={handleInputchange('content')}
                  name="caption"
                  id={error.content ? 'red-border' : ''}
                ></textarea>
              </div>
            </div>

            <div className="addblog-submitDetailDiv">
              <button
                className="addblog-submitDetailBtn"
                onClick={handlesubmit}
              >
                Edit Blog
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

export default EditBlogForm;
