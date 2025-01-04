import React, { useState } from 'react';
import './CategoryNav.css';

function CategoryNav({ onSelectCategory }) {
  const categories = ['Academic', 'Human & Environment', 'Sports', 'Political', 'Music', 'Financial Market', 'Other'];
  const [activeCategory, setActiveCategory] = useState('');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <nav className="category-nav">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <button
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNav;
