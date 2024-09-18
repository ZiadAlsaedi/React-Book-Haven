import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email address is invalid";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (!/^(?:\+966|0)?5\d{8}$/.test(phone)) {
      validationErrors.phone = "Phone number must be in the format +966500000000 or 0500000000";
    }

    return validationErrors;
  };

  const sign = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`https://6657369e9f970b3b36c865b0.mockapi.io/logIn`, {
          name: name,
          email: email,
          password: password,
          phone: phone,
        });
        navigate('/login');
      } catch (error) {
        console.error("There was an error adding the user!", error);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-5 lg:p-0 font-serif">
      <div className="max-w-screen-xl sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-3 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-4xl text-amber-950 font-extrabold">
                Sign up
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 bg-white text-black mt-2 p-2 border border-black focus:outline-none rounded-lg font-medium placeholder-gray-500 text-sm focus:border-gray-400"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                <input
                  className="w-full px-5 py-3 bg-white text-black mt-2 p-2 border border-black focus:outline-none rounded-lg font-medium placeholder-gray-500 text-sm focus:border-gray-400"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                <input
                  className="w-full px-5 py-3 bg-white text-black mt-2 p-2 border border-black focus:outline-none rounded-lg font-medium placeholder-gray-500 text-sm focus:border-gray-400"
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                <input
                  className="w-full px-5 py-3 bg-white text-black mt-2 p-2 border border-black focus:outline-none rounded-lg font-medium placeholder-gray-500 text-sm focus:border-gray-400"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <button
                  className="mt-2 tracking-wide bg-amber-800 shadow-lg hover:bg-amber-700 text-white font-semibold rounded-lg w-full py-4 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={sign}
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
                    <path d="M16 21v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-black font-semibold">
                    Sign in
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

export default Signup;
