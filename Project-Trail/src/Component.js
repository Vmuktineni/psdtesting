import React, { useEffect, useState } from "react";
import "./Component.css";
import axios from "axios";
import { API_URL } from "./Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/Actions/UserActions";


const userObj = {
  name: '',
  contactId: '',
  email: '',
  address: '',
  zipCode: '',
  userName: '',
  password: '',
  confirmPassword: '',
  isTNC: false
}


function Signupandsignin() {
  const [signIn, toggleSignIn] = useState(true);
  const [user, setUser] = useState(userObj);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromRedux = useSelector(state => state?.userInfo?.user);

  useEffect(() => {
    if(userFromRedux) {
      navigate("/dashboard");
    }
  }, [userFromRedux]);

  
  const toggleForm = () => {
    toggleSignIn(!signIn);
  };

  const handleChange = (e)=>{
    setUser({...user,...{[e.target.id]:e.target.value}});
  }
  
  const handleRegisterSubmit = (e)=>{
    e.preventDefault();
    const _userObj = {   
      "Name" : user.name,
      "ContactId" : user.contactId, 
      "Email" : user.email,
      "Address" : user.address ,
      "ZipCode" : user.zipCode,
      "UserName" : user.userName,
      "Password" : user.password
    }
    axios.post(API_URL+"/register",_userObj).then(res=>{
      if(res && res.data && res.data.issuccess){
        toggleForm();
      }
      else{
        window.alert("FAILURE");
      }
    }).catch(err=>{
      console.log(err);
      window.alert("FAILURE");
    })
  }

  const handleLoginSubmit=(e)=>{
    e.preventDefault();
    const _userLogin ={
      "UserName" : user.userName,
      "Password" : user.password
    } 
    axios.post(API_URL+"/login",_userLogin).then((res) => {
      if (res && res.data && res.data.userName) {
        saveUser(res.data);
        navigate("/dashboard");
      } 
      else {
        window.alert("Login Failed");
      }
    })
    .catch((err) => {
      console.log(err);
      window.alert("Login Failed");
    });
  }

  const saveUser = (data)=>{
    dispatch(addUser(data));
  }

  return (
    <div className="container">
      <div className={`signup-container ${signIn ? "signin" : ""}`}>
        <form>
          <h1>REGISTER</h1>
          <input type="text" placeholder="Name" id='name' value={user.name} onChange={handleChange} />
          <input type="text" placeholder="Phone Number" id='contactId' value={user.contactId} onChange={handleChange} />
          <input type="email" placeholder="Email" id='email' value={user.email} onChange={handleChange} />
          <input type="text" placeholder="Address" id='address' value={user.address} onChange={handleChange} />
          <input type="text" placeholder="Zip Code" id='zipCode' value={user.zipCode} onChange={handleChange} />
          <input type="text" placeholder="UserName" id='userName' value={user.userName} onChange={handleChange} />
          <input type="password" placeholder="Password" id='password' value={user.password} onChange={handleChange} />
          <input type="password" placeholder="Re-enter Password" id='confirmPassword' value={user.confirmPassword} onChange={handleChange}  />
          <label className="terms-label"><input type="checkbox" /><span>I agree to the Terms and Conditions</span></label>
          <button onClick={handleRegisterSubmit}>Sign Up</button>
        </form>
      </div>

      <div className={`signin-container ${signIn ? "" : "signin"}`}>
        <form>
          <h1>SIGN-IN</h1>
          <input type="text" placeholder="Username" id="userName" value={user.userName} onChange={handleChange} />
          <input type="password" placeholder="Password" id="password" value={user.password} onChange={handleChange} />
          <button onClick={handleLoginSubmit}>Sign In</button>
          
        </form>
      </div>

      <div className={`overlay-container ${signIn ? "signin" : ""}`}>
        <div className={`overlay ${signIn ? "signin" : ""}`}>
          <div className="overlay-panel left-overlay-panel">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info</p>
            <p>Don't have an Account</p>
            <button className="ghost-button" onClick={toggleForm}>
              Sign up
            </button>
          </div>

          <div className="overlay-panel right-overlay-panel">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <p>Already have an Account</p>
            <button className="ghost-button" onClick={toggleForm}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signupandsignin;
