import React, { useState } from 'react';
import Popup from './Popup';
import './Portfolio.css'; // ไฟล์ CSS ของ Portfolio

function Portfolio() {
  const [selectedItem, setSelectedItem] = useState(null);

  const portfolioItems = [
    {
      id: 1,
      name: 'Nut',
      image: `${process.env.PUBLIC_URL}/image/nn.svg`,
      description: 'A nut is a mechanical fastener with a threaded hole. It is typically used in conjunction with a mating bolt or screw to fasten multiple parts together securely. The nut and bolt work together, with the bolt providing the male thread and the nut providing the female thread.'
    },
    {
      id: 2,
      name: 'Screw',
      image: `${process.env.PUBLIC_URL}/image/nn.svg`,
      description: 'A screw is a type of fastener, typically made of metal, characterized by a helical ridge, known as a male thread.'
    },
    {
      id: 3,
      name: 'J-bolt',
      image: `${process.env.PUBLIC_URL}/image/nn.svg`,
      description: 'A J-bolt is a fastener shaped like the letter J.'
    },
    {
      id: 4,
      name: 'U-bolt',
      image: `${process.env.PUBLIC_URL}/image/nn.svg`,
      description: 'A U-bolt is a bolt in the shape of the letter U with screw threads on both ends.'
    },
    {
      id: 5,
      name: 'Nut',
      image: `${process.env.PUBLIC_URL}/image/nn.svg`,
      description: 'A nut is a mechanical fastener with a threaded hole.'
    },
  ];

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
            <div className="plus-icon"></div> {/* เพิ่มรูปบวก */}
            <p className="portfolio-name">{item.name}</p>
          </div>
        ))}
      </div>

      <Popup item={selectedItem} onClose={handleClosePopup} />
    </section>
  );
}

export default Portfolio;
