import React, { useEffect, useRef, useState } from 'react';
import About from './About';
import Contact from './Contact';
import './Home.css';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Services from './Services';
import Content from './content';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagePaths = [
    '/image/logo/ll.jpg',
    '/image/logo/gg.jpg',
    '/image/logo/Untitleddesign.png',
    '/image/logo/hh.jpg',
  ];

  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  // const contactRef = useRef(null);
  const ContentRef = useRef(null);
  const almostRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    portfolioRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // const scrollToContact = () => {
  //   contactRef.current.scrollIntoView({ behavior: 'smooth' });
  // };

  const scrollToContent = () => {
    ContentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAlmost = () => {
    almostRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [imagePaths.length]);

  return (
    <div className="home-container" style={{ backgroundImage: `url(${imagePaths[currentImageIndex]})` }}>
      <Navbar 
        scrollToServices={scrollToServices}
        scrollToPortfolio={scrollToPortfolio}
        scrollToAbout={scrollToAbout}
        // scrollToContact={scrollToContact}
      />
      <main>
        <div className="home-container-container">
          <h1>Welcome to Screw D Company.</h1>
          <h7>IT'S NICE TO MEET YOU</h7>
        </div>
        <button onClick={scrollToServices}>TELL ME MORE</button>
      </main>
      <div id="services" ref={servicesRef}>
        <Services />
      </div>
      <div id="portfolio" ref={portfolioRef}>
        <Portfolio />
      </div>
      <div id="about" ref={aboutRef}>
        <About />
      </div>
     {/* <div id="contact" ref={contactRef}>
         <Contact /> 
      </div>  */}
      <div>
        <Content />
      </div>
    </div>  
  );
}

export default Home;



