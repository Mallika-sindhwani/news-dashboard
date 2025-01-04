import React, { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import { getTopHeadlines } from './services/newsApi';
import './App.css';

const countries = {
  ae: 'UAE', ar: 'Argentina', at: 'Austria', au: 'Australia', be: 'Belgium',
  bg: 'Bulgaria', br: 'Brazil', ca: 'Canada', ch: 'Switzerland', cn: 'China',
  co: 'Colombia', cu: 'Cuba', cz: 'Czech Republic', de: 'Germany', eg: 'Egypt',
  fr: 'France', gb: 'UK', gr: 'Greece', hk: 'Hong Kong', hu: 'Hungary',
  id: 'Indonesia', ie: 'Ireland', il: 'Israel', in: 'India', it: 'Italy',
  jp: 'Japan', kr: 'South Korea', lt: 'Lithuania', lv: 'Latvia', ma: 'Morocco',
  mx: 'Mexico', my: 'Malaysia', ng: 'Nigeria', nl: 'Netherlands', no: 'Norway',
  nz: 'New Zealand', ph: 'Philippines', pl: 'Poland', pt: 'Portugal',
  ro: 'Romania', rs: 'Serbia', ru: 'Russia', sa: 'Saudi Arabia', se: 'Sweden',
  sg: 'Singapore', si: 'Slovenia', sk: 'Slovakia', th: 'Thailand', tr: 'Turkey',
  tw: 'Taiwan', ua: 'Ukraine', us: 'USA', ve: 'Venezuela', za: 'South Africa'
};

function App() {
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState('in');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews(country, category);
  }, [country, category]);

  const fetchNews = async (country, category) => {
    setIsLoading(true);
    setError(null);
    try {
      const articles = await getTopHeadlines(country, category);
      const filteredArticles = articles.filter(article => article.url);
      setNews(filteredArticles);
    } catch (error) {
      setError(`Failed to fetch news: ${error.message}`);
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Today News</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <CategoryNav onSelectCategory={setCategory} />
        <div className="filters">
          <div className="country-select">
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && news.length === 0 && (
          <p className="no-news">No news available for the selected country. Please try another country or category.</p>
        )}
        {!isLoading && !error && news.length > 0 && <div className="news-section"><NewsList news={news} /></div>}
      </main>
    </div>
  );
}

export default App;
