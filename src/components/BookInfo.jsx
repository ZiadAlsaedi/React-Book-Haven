import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BookInfo = () => {
  const { rank } = useParams();
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/login');

      return;
    }

    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=OuojNGu3rMA1MZBMReSOaeLSNcuuvGyD`
        );
        const { results } = response.data;
        const bookRankData = results.books.find(
          (book) => book.rank === parseInt(rank)
        );
        setBookData(bookRankData);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers["retry-after"]) || 10;
          await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
          await fetchBookData();
        } else {
          setError("Error fetching data.");
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchBookData();
  }, [rank, navigate]);

  const handleFavorite = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/login');
      return;
    }

    const userId = userData.id; 
    let favoriteBooks = JSON.parse(localStorage.getItem(`favoriteBooks_${userId}`)) || [];
    const bookExists = favoriteBooks.some(book => book.rank === bookData.rank);

    if (!bookExists) {
      favoriteBooks.push(bookData);
      localStorage.setItem(`favoriteBooks_${userId}`, JSON.stringify(favoriteBooks));
      setToastMessage("Book marked as favorite!");
    } else {
      setToastMessage("This book is already marked as favorite.");
    }
  };

  const handleReadBook = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      setToastMessage("You Must Log in Frist !");
      navigate('/login');
      return;
    }

    const userId = userData.id;
    let readBooks = JSON.parse(localStorage.getItem(`readBooks_${userId}`)) || [];
    const bookExists = readBooks.some(book => book.rank === bookData.rank);

    if (!bookExists) {
      readBooks.push(bookData);
      localStorage.setItem(`readBooks_${userId}`, JSON.stringify(readBooks));
      setToastMessage("Book marked as read!");
    } else {
      setToastMessage("This book is already marked as read.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookData) {
    return <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <>
      <Navbar />
      {toastMessage && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center min-h-screen">
        <div className="p-6 max-w-5xl w-full">
          <div className="mt-6 sm:mt-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="w-full sm:w-1/2 overflow-hidden">
                <img
                  src={bookData.book_image}
                  alt="Product-Image"
                  className="w-full h-[80vh]"
                />
              </div>
              <div className="flex flex-col justify-between w-full sm:w-1/2 p-6 sm:pl-10">
                <div>
                  <h1 className="text-3xl text-amber-950 font-semibold sm:text-4xl">
                    {bookData.title}
                  </h1>
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                    {bookData.description}
                  </p>
                  <span className="block mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                    {bookData.author}
                  </span>
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                    Book Link:{" "}
                    <a
                      href={bookData.amazon_product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {bookData.amazon_product_url}
                    </a>
                  </p>
                </div>
                <button
                  className="mt-6 w-full py-3 px-4 bg-amber-800 shadow-lg hover:bg-amber-700 text-white text-md font-bold rounded-md ease-in-out duration-150 shadow-slate-600 inline-flex items-center justify-center"
                  onClick={handleReadBook}
                >
                  <svg
                    version="1.1"
                    id="Uploaded_to_svgrepo.com"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    fill="#ffffff"
                    className="w-6 h-6 mr-2"
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
                          {`.cls-1 { fill: ffffff; fill-rule: evenodd; }`}
                        </style>
                      </defs>
                      <path
                        className="linesandangles_een"
                        d="M28,8V7.382l-0.553-0.276C27.356,7.061,25.187,6,21,6c-2.728,0-4.224,0.454-5,0.831 C15.224,6.454,13.728,6,11,6C6.812,6,4.644,7.061,4.553,7.105L4,7.382V9H3v16h10v1h6v-1h10V8H28z M26,8.685v12.914 C24.925,21.308,23.255,21,21,21c-1.841,0-3.122,0.207-4,0.457V8.569C17.516,8.349,18.696,8,21,8C23.522,8,25.197,8.421,26,8.685z M6,8.686C6.806,8.42,8.479,8,11,8c2.325,0,3.506,0.355,4,0.562v12.895C14.122,21.207,12.841,21,11,21c-2.255,0-3.925,0.308-5,0.599 V8.686z"
                      ></path>
                    </g>
                  </svg>
                  READED BOOK
                </button>
                <button
                  className="mt-5 tracking-wide bg-amber-800 shadow-lg hover:bg-amber-700 text-white font-semibold rounded-lg w-full py-4 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleFavorite}
                >
                  <svg
                    viewBox="0 0 60 60"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 -ml-2"
                    fill="white"
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
                          {`.cls-1 { fill: white; fill-rule: evenodd; }`}
                        </style>
                      </defs>
                      <path
                        className="cls-1"
                        d="M663.187,148.681a4.511,4.511,0,0,1-6.375,0S630,127.085,630,107a17,17,0,0,1,17-17c7.625,0,11.563,6.057,13,6.057S665.375,90,673,90a17,17,0,0,1,17,17C690,127.085,663.187,148.681,663.187,148.681Z"
                        id="favorite"
                        transform="translate(-630 -90)"
                      ></path>
                    </g>
                  </svg>
                  <span className="ml-3">FAVORITE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfo;
