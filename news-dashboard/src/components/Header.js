import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">News Dashboard</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#daily-news">Daily News</a></li>
            <li><a href="#features">Features</a></li>
          </ul>
        </nav>
        <button className="contact-btn">Contact Us</button>
      </div>
    </header>
  );
}

export default Header;
