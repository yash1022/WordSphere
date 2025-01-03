import React from 'react';
import '../CSS/Landingpage.css';
import image from '../CSS/solved-the-problem.svg'; // Local image import
import orange from '../Images/one.png'
import image2 from '../Images/second.png'
import image3 from '../Images/red2.png'
import { useNavigate } from 'react-router-dom';

export default function Landing() {

    const navigate= useNavigate();

  // Scroll to a section
  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }

  // Scroll-triggered animations
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".section").forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const viewHeight = window.innerHeight;
      
      if (sectionPosition < viewHeight - 500) {
        section.classList.add("active");
      }
    });
  });

  // Force reload of external images by adding a timestamp
  const externalImageUrl = "https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEi7vdOOCQiPdRlsZ1TeGySHnpsBwol0EV4xyOY2OBiPEawW99eYeZO7ZCmlfaV3k2bTkSdhSRghmiBFKVqmjVdIAs6CfE7CvEnflPmqo1c3amq5EO5yZ810sH8ulsZlCOb_rw2vgHdVwVQVejp_mz1tiMT0Hi4vSQzi/w1200";
  const imageUrlWithTimestamp = `${externalImageUrl}?timestamp=${new Date().getTime()}`;

  return (
    <>
      {/* Header Section */}
      <header id="home">
        <div className="contents" style={{marginBottom :"19rem"}} >
          <h1>Welcome to wordSphere</h1>
        </div>
        <button className="cta" style={{marginBottom :"22rem"}} onClick={()=>{navigate('/feed')}}>
          <span>Get Started</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </header>

      {/* About Section */}
      <section id="about" className="section">
        <div className="contents">
          <div className="left-content">
            <h2>About Us</h2>
            <p>Our platform empowers writers and readers alike. We provide tools and resources to turn ideas into stories and stories into conversations.</p>
          </div>
          <div className="right-content" style={{ width: '50%', maxWidth: '1000px', margin: '0 auto', padding: '10px' }}>
  <img src={orange} alt="solved the problem" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="contents">
          <div className="left-content" style={{width :'50%',paddingLeft:'7rem'}}>
            <h2>Features</h2>
            <p>Discover our intuitive design, easy publishing, and community-driven features to elevate your blogging experience.</p>
          </div>
        </div>
        <div className="right-content" style={{ width: '50%', maxWidth: '700px', margin: '0 auto', padding: '10px' }}>
  <img src={image} alt="solved the problem" style={{ width:'1000rem',paddingRight:"7rem"  }} />
</div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="contents">
          <div className="left-content">
            <h2>Contact Us</h2>
            <p>Ready to start blogging? Get in touch with us and join our community of creators.</p>
          </div>
          <div className="right-content">
          <img src={image3} alt="solved the problem" />
          </div>
        </div>
      </section>
    </>
  );
}
