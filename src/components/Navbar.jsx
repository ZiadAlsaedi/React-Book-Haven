import React from 'react';
import {  useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('userData'); 
    navigate('/');
  };

  const isLoggedIn = localStorage.getItem('userData') !== null;

  return (
    <>
      <div className="navbar bg-white border-gray-200 dark:bg-gray-900">
        <div className="navbar-start">
        <div className="left bar">

      <ul
        tabIndex={0}
        className="flex items-left  mt-3 w-52 max-sm:w-20 p-2 "
      >
        {isLoggedIn && (
          <li>
            <Link to="/favorites">       <svg
                    viewBox="0 0 60 60"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-1"
                    fill="red"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <defs>
                        <style>
                          {`.cls-3 { fill: red; fill-rule: evenodd; }`}
                        </style>
                      </defs>
                      <path
                        className="cls-3"
                        d="M663.187,148.681a4.511,4.511,0,0,1-6.375,0S630,127.085,630,107a17,17,0,0,1,17-17c7.625,0,11.563,6.057,13,6.057S665.375,90,673,90a17,17,0,0,1,17,17C690,127.085,663.187,148.681,663.187,148.681Z"
                        id="favorite"
                        transform="translate(-630 -90)"
                      ></path>
                    </g>
                  </svg></Link>
        </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/Readed">                   <svg
                    version="1.1"
                    id="Uploaded_to_svgrepo.com"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    fill="black"
                    className="w-6 h-6 ml-5"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <defs>
                        <style>
                          {`.cls-4 { fill: black; fill-rule: evenodd; }`}
                        </style>
                      </defs>
                      <path
                        className="linesandangles_een"
                        d="M28,8V7.382l-0.553-0.276C27.356,7.061,25.187,6,21,6c-2.728,0-4.224,0.454-5,0.831 C15.224,6.454,13.728,6,11,6C6.812,6,4.644,7.061,4.553,7.105L4,7.382V9H3v16h10v1h6v-1h10V8H28z M26,8.685v12.914 C24.925,21.308,23.255,21,21,21c-1.841,0-3.122,0.207-4,0.457V8.569C17.516,8.349,18.696,8,21,8C23.522,8,25.197,8.421,26,8.685z M6,8.686C6.806,8.42,8.479,8,11,8c2.325,0,3.506,0.355,4,0.562v12.895C14.122,21.207,12.841,21,11,21c-2.255,0-3.925,0.308-5,0.599 V8.686z"
                      ></path>
                    </g>
                  </svg></Link>
          </li>
        )}
      </ul>
    </div>
    </div>
        <div className="navbar-center ">
          <Link to="/">
            <div className="flex items-center justify-center ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcGbRf2iqnJOSzt6fxIjI6onARwORb6G84HRqXNWT0HqIKVq8OybgtFTMvYEr5_NxG0Hg&usqp=CAU"
                className="h-8 "
                alt="Flowbite Logo"
              />
              <span className="self-center text-amber-950 text-2xl font-semibold whitespace-nowrap dark:text-white ml-2">
                Book Haven
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <button
              className="btn bg-amber-800 shadow-lg hover:bg-amber-700 font-semibold text-white btn-sm mr-10 max-sm:mr-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              {location.pathname !== '/Login' && (
                <Link to="/Login">
                  <button className="btn bg-amber-800 shadow-lg hover:bg-amber-700 font-semibold text-white btn-sm  ">
                    LogIn
                  </button>
                </Link>
              )}
              {location.pathname !== '/Signup' && (
                <Link to="/Signup" className="mx-4">
                  <button className="btn bg-amber-800 shadow-lg hover:bg-amber-700 font-semibold text-white  btn-sm">
                    SignUp
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
