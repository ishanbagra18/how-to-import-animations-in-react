import React, { useState, useEffect } from 'react';
import Card from './Card';
import SplitText from './SplitText';



const Newsapp = () => {
  const [search, setSearch] = useState('india');
  const [newsData, setNewsData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=9f6a1caad54b41bfa19c806af7c78f9b`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.articles);
      setNewsData(data.articles);
    } catch (error) {
      console.error('Failed to fetch news data:', error);
      setNewsData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [search]); // Fetch news when 'search' changes

  const handleCategoryClick = (category) => {
    setSearch(category);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-around p-6 bg-blue-400">
        <div className="flex gap-2">
          <img className="w-10 h-10" src="./news-feed.png" alt="News Logo" />
          <h1 className="text-3xl font-bold">
            Trendy News <span className="text-xl font-semibold">.com</span>
          </h1>
        </div>

        {/* Animated Welcome Text */}
        <SplitText
          text="Welcome to Trendy News!"
          className="text-2xl font-semibold text-center text-white"
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
      </nav>

      {/* Heading */}
      <p className="text-center text-3xl p-4 mt-2 font-semibold tracking-widest">
        Stay Updated with Trendy News
      </p>

      {/* Categories */}
      {/* <div className="category flex justify-center gap-11 mt-2">
        {['Sports', 'Health', 'Politics', 'Fitness', 'Entertainment'].map((category) => (
          <button
            key={category}
            style={{ backgroundColor: '#CD4631' }}
            className="p-2 text-white rounded"
            onClick={() => handleCategoryClick(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div> */}



  <div className="category flex justify-center gap-11 mt-2">
    {['Sports', 'Health', 'Politics', 'Fitness', 'Entertainment'].map((category) => (
      <button
        key={category}
        style={{ backgroundColor: '#CD4631' }}
        className="p-2 text-white rounded"
        onClick={() => handleCategoryClick(category.toLowerCase())}
      >
        {category}
      </button>
    ))}
  </div>


      {/* News Articles */}
      <div>
        <Card newsdata={newsData} />
      </div>
    </div>
  );
};

export default Newsapp;
