import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/login');
      return;
    }

    const userId = userData.id;
    const favorites = JSON.parse(localStorage.getItem(`favoriteBooks_${userId}`)) || [];
    setFavoriteBooks(favorites);
  }, [navigate]);

  if (favoriteBooks.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center min-h-screen">
          <div className="p-6 max-w-5xl w-full">
            <h1 className="text-3xl text-amber-950 font-semibold sm:text-4xl">No favorite books</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen">
        <div className="p-6 max-w-5xl w-full">
          <h1 className="text-3xl text-amber-950 font-semibold sm:text-4xl">Favorite Books</h1>
          <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteBooks.map((book, index) => (
              <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden">
                <img
                  src={book.book_image}
                  alt="Book-Image"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl text-amber-950 font-semibold">
                    {book.title}
                  </h2>
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left">
                    {book.author}
                  </p>
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left">
                    {book.description}
                  </p>
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left">
                    <a
                      href={book.amazon_product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Buy on Amazon
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
