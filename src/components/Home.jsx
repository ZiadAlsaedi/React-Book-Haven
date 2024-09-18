import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=OuojNGu3rMA1MZBMReSOaeLSNcuuvGyD")
      .then((response) => {
        setBooks(response.data.results.books);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const goToInfoPage = (rank) => {
    navigate(`/BookInfo/${rank}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      axios
        .get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=OuojNGu3rMA1MZBMReSOaeLSNcuuvGyD")
        .then((response) => {
          setBooks(response.data.results.books);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <hr />
      <div className="flex justify-center mt-5 font-serif">
        <div className="flex w-[40vw] gap-4 justify-center items-center">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder='Search Book by title'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn rounded-md bg-amber-800 shadow-lg hover:bg-amber-700 font-semibold text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <h1 className='text-center font-bold mt-6 font-serif text-3xl '>All Books</h1>
      <div className='flex gap-3 p-8 max-sm:flex-col flex-wrap justify-center font-serif'>
        {books.map((book) => (
          <div key={book.rank} className="rounded-lg w-[30vw] max-sm:w-full bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <a href="#!">
              <img
                className="rounded-t-lg h-[40vh] w-full"
                src={book.book_image}
                alt={book.title}
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {book.title}
              </h5>
              <p className="mb-4 text-base h-[18vh] text-neutral-600 dark:text-neutral-200">
                {book.description}
              </p>
              <button
                type="button"
                onClick={() => goToInfoPage(book.rank)}
                className="inline-block w-full text-base bg-amber-800 shadow-lg hover:bg-amber-700 text-white rounded px-6 pb-2 pt-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                SHOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
