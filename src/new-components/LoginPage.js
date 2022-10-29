import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from '../new-components/utils/LoadingPage';
import { Login } from '../redux/api';
import '../styles/LoginPage.css';

const initialData = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };
  const handleLogin = async () => {
    if (formData.email && formData.password) {
      setLoading(true);
      try {
        const loginInfo = {
          email: formData.email,
          password: formData.password,
        }
        const user = await Login(loginInfo);
        console.log(user?.data?.authToken);
        localStorage.setItem("userInfo", JSON.stringify(user?.data.result));
        localStorage.setItem("token", JSON.stringify(user?.data?.authToken));
        history.push('/users');
      } catch (error) {
       
        setLoading(false);
        setError("Invalid login");
      }
    } else {
      setError("Both fields required");
    }
  };

  return (
      <div className="loginPage-container">
          {loading ? (
              <LoadingPage />
          ) : (
              <div className="loginPage-formDiv">
                  <div className="loginPage-formHeaderDiv">
                      <div className="logoContainer">
                          {/* <img src={logo} alt="logo" className="logoImage" /> */}
                      </div>
                      <div className="loginPage-headerContent">
                          <h3 className="loginPage-headerTitle">
                              Log In to Dashboard{" "}
                          </h3>
                          <p className="loginPage-headerSub">
                              Enter your email and password below
                          </p>
                      </div>
                  </div>

                  <div className="loginPage-formContent">
                      <div className="loginPage-formFieldDiv">
                          <label className="loginPage-inputLabel">Email</label>
                          <input
                              type="email"
                              name="email"
                              className="loginPage-inputField"
                              placeholder="Email address"
                              value={formData.email}
                              onChange={handleChange}
                          />
                      </div>

                      <div className="loginPage-formFieldDiv">
                          <div className="loginPage-passDiv">
                              <label className="loginPage-inputLabel">
                                  Password
                              </label>
                              <label className="loginPage-inputLabel forgotPass">
                                  Forgot password?
                              </label>
                          </div>

                          <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={handleChange}
                              value={formData.password}
                              className="loginPage-inputField"
                          />
                      </div>
                      <div className="loginPage-submitBtnDiv">
                          <button
                              className="loginPage-submitBtn"
                              onClick={handleLogin}
                          >
                              Log In
                          </button>
                      </div>
                      {error && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
                  </div>
              </div>
          )}
      </div>
  );
};

export default LoginPage;
