import React, { useRef } from 'react';
import About from './About';
import Contact from './Contact';
import './Home.css';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Services from './Services';
import Content from './content';



function Home() {


  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
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

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContent = () => {
    ContentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAlmost = () => {
    almostRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="home-container">
      {/* <div ref={almostRef}>
        <Almost />
      </div> */}
       <Navbar 
        scrollToServices={scrollToServices}
        scrollToPortfolio={scrollToPortfolio}
        scrollToAbout={scrollToAbout}
        scrollToContact={scrollToContact}
      />
      <main>
        <div className="home-container-container">
        <h1>Welcome to Screw D Company.</h1>
        <h2>IT'S NICE TO MEET YOU</h2>
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
      <div id="contact" ref={contactRef}>
        <Contact />
      </div>
      <div ref={contactRef}>
        <Content />
      </div>
    </div>  
  );
}

export default Home;