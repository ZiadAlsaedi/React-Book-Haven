import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    return validationErrors;
  };

  const login = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.get('https://6657369e9f970b3b36c865b0.mockapi.io/logIn');

        if (response.data.length > 0) {
          const foundUser = response.data.find(user => user.name === username && user.password === password);

          if (foundUser) {
            localStorage.setItem('userData', JSON.stringify(foundUser));
            navigate(`/Home/${foundUser.id}`);
          } else {
            setErrors({ general: "Please check your username and password." });
          }
        } else {
          setErrors({ general: "No users found. Please try again later." });
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrors({ general: "Error logging in. Please try again later." });
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-5 lg:p-0 font-serif">
      <div className="max-w-screen-xl sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-4xl text-amber-950 font-extrabold">
                Sign In
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 bg-white text-black mt-2 p-2 border border-black focus:outline-none rounded-lg font-medium placeholder-gray-500 text-sm focus:border-gray-400"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                <input
                  className="w-full px-5 py-3 bg-white text-black mt-2 p-2 border border-black focus:outline-none rounded-lg font-medium placeholder-gray-500 text-sm focus:border-gray-400"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                {errors.general && <p className="text-red-500 text-xs mt-1">{errors.general}</p>}
                <button
                  className="mt-5 tracking-wide bg-amber-800 shadow-lg hover:bg-amber-700 text-white font-semibold rounded-lg w-full py-4 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={login}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-black font-semibold">
                    Sign Up
                  </Link>
                </p>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  Want to go back to{" "}
                  <Link to="/" className="text-black font-semibold">
                    Home Page
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="w-full h-screen bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=800)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
