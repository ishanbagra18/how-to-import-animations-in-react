import React from 'react';

const Card = ({ newsdata }) => {
  if (!newsdata || newsdata.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No news articles available. Try searching for something else.
      </p>
    );
  }

  const readmore = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="card flex flex-wrap justify-center gap-6 p-6">
      {newsdata.map((curitem, index) => {
        // Check if the image exists
        if (!curitem.urlToImage) {
          return null; // Skip rendering if no image is present
        } else {
          return (
            <div
            style={{backgroundColor:'#EED1BE'}}
              className="cardinfo w-80  rounded shadow-md overflow-hidden"
              key={index}
            >
              <img
                className="w-full h-48 object-cover"
                src={curitem.urlToImage}
                alt={curitem.title || 'News Image'}
              />
              <div className="p-4">
                <a
                  className="title text-lg font-bold hover:underline"
                  href={curitem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {curitem.title}
                </a>
                <p className="text-gray-700 mt-2">{curitem.description}</p>
                <button
                style={{backgroundColor:'#CD4631'}}
                  onClick={() => readmore(curitem.url)}
                  className="mt-4 px-4 py-2  text-white rounded"
                >
                  Read more
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
