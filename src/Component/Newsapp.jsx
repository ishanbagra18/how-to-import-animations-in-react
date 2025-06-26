import React, { useState, useEffect } from 'react';
import Card from './Card';
import SplitText from './SplitText';
import '../styles.css';

const Newsapp = () => {
  const [search, setSearch] = useState('india');
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const getData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=9f6a1caad54b41bfa19c806af7c78f9b`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setNewsData(data.articles);
    } catch (error) {
      console.error('Failed to fetch news data:', error);
      setNewsData([]);
    }
    setLoading(false); // Stop loading
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleCategoryClick = (category) => {
    setSearch(category);
  };

  return (
    <div className={`transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <nav className={`flex items-center justify-around p-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-400'}`}>
        <div className="flex gap-2">
          <img className="w-10 h-10" src="./news-feed.png" alt="News Logo" />
          <h1 className="text-3xl font-bold">
            Trendy News <span className="text-xl font-semibold">.com</span>
          </h1>
        </div>

        {/* Animated Welcome Text */}
        <SplitText
          text="Welcome to Trendy News!"
          className="text-2xl font-semibold text-center"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />

        <div className="searchbar flex items-center gap-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="w-150 p-1 border border-gray-300 rounded"
            type="text"
            placeholder="Search news"
          />
          <button
            style={{ backgroundColor: '#CD4631' }}
            onClick={getData}
            className="p-1 rounded-lg text-white cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="sr-only peer"
          />
          <div className="w-20 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 
            after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center 
            after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"
          ></div>
        </label>
      </nav>

      {/* Heading */}
      <p className="text-center text-3xl p-4 mt-2 font-semibold tracking-widest">
        Stay Updated with Trendy News
      </p>

      {/* Categories */}
      <div className="category flex justify-center gap-11 mt-2">
        {['Sports', 'Health', 'Politics', 'Fitness', 'Entertainment'].map((category) => (
          <button
            key={category}
            className="button"
            onClick={() => handleCategoryClick(category.toLowerCase())}
          >
            {category}
            <div className="clip">
              <div className="leftTop corner"></div>
              <div className="rightBottom corner"></div>
              <div className="rightTop corner"></div>
              <div className="leftBottom corner"></div>
            </div>
            <span className="rightArrow arrow"></span>
            <span className="leftArrow arrow"></span>
          </button>
        ))}
      </div>

      {/* News Articles or Loader */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
          <Card newsdata={newsData} />
        )}
      </div>
    </div>
  );
};

export default Newsapp; 