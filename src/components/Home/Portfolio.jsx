import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import './Portfolio.css';

function Portfolio() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products'); // เรียก API 
        const data = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      }
    };

    fetchPortfolioItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  return (
    <section className="portfolio">
      <h2>PORTFOLIO</h2>
      <div className="portfolio-items">
        {portfolioItems.map((item) => (
          <div key={item.id} className="portfolio-item" onClick={() => handleItemClick(item)}>
            <img
              src={item.image}
              alt={`Portfolio Item ${item.name}`}
              className="portfolio-icon"
            />
            <div className="plus-icon"></div>
            <p className="portfolio-name">{item.name}</p>
          </div>
        ))}
      </div>

      <Popup item={selectedItem} onClose={handleClosePopup} />
    </section>
  );
}

export default Portfolio;
