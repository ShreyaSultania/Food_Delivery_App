import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

function LoginPopUp({ setShowLogin }) {
  const { url, setToken, fetchUserProfile } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign-up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }
  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data)
    if (response.data.success) {
      const token = response.data.token;
      setToken(token)
      localStorage.setItem("token", token);
      // Fetch user profile after login
      await fetchUserProfile(token);
      setShowLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

        {/* Form Card */}
        <form className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-fadeIn" onSubmit={onLogin}>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{currState}</h2>
            <img
              src={assets.cross_icon}
              alt="close"
              className="w-6 cursor-pointer hover:scale-110 transition"
              onClick={() => setShowLogin(false)}
            />
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-4 mb-6">

            {currState === "Login" ? null : (
              <input
                type="text" name="name"
                onChange={onChangeHandler} value={data.name} placeholder="Enter your name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            )}

            <input
              type="email" name="email"
              onChange={onChangeHandler} value={data.email}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />

            <input
              type="password" name="password" value={data.password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all"
          >
            {currState === "Sign-up" ? "Create Account" : "Login"}
          </button>

          {/* Terms */}
          <div className="flex items-start gap-3 mt-4">
            <input type="checkbox" required className="mt-1" />
            <p className="text-sm text-gray-600">
              By continuing, I agree to the Terms of Use and Privacy Policy.
            </p>
          </div>

          {/* Switch Login / Signup */}
          {currState === "Sign-up" ? (
            <p className="text-center mt-4 text-sm">
              Already have an account?
              <span
                className="text-orange-600 font-semibold cursor-pointer ml-1 hover:underline"
                onClick={() => setCurrState("Login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-center mt-4 text-sm">
              Create a new account?
              <span
                className="text-orange-600 font-semibold cursor-pointer ml-1 hover:underline"
                onClick={() => setCurrState("Sign-up")}
              >
                Click here
              </span>
            </p>
          )}

        </form>
      </div>
    </>
  );
}

export default LoginPopUp;
