import React, { useState, useEffect, useRef } from 'react';
import './NewsList.css';

function NewsList({ news }) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.animationPlayState = isHovering ? 'paused' : 'running';
    }
  }, [isHovering]);

  if (!news || news.length === 0) {
    return <p>No news available.</p>;
  }

  return (
    <div className="news-container">
      <div 
        className="news-scroll" 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={containerRef}
      >
        {news.filter(article => article.url).map((article, index) => (
          <div
            key={index}
            className="news-item"
            onClick={() => window.open(article.url, '_blank')}
          >
            <h2 className="news-title">{article.title}</h2>
            <p className="news-meta">{article.source.name} · {new Date(article.publishedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;