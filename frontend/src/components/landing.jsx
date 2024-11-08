import React from 'react'
import '../CSS/Landingpage.css';
import image from '../CSS/solved-the-problem.svg'



export default function Landing() {

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
  return (


    <>
        

        <header id="home" className="section">
        <div className="content">
            <h1>Welcome to Our Blogging Platform</h1>
            <p>Where words connect and ideas thrive.</p>
            
            
            <button className="cta"
            >
              <span>Get Started</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
            
        </div>
    </header>

   
    <section id="about" className="section">
        <div className="content content-left">
            <h2>About Us</h2>
            <p>Our platform empowers writers and readers alike. We provide tools and resources to turn ideas into stories and stories into conversations.</p>
        </div>
        <img src="https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEi7vdOOCQiPdRlsZ1TeGySHnpsBwol0EV4xyOY2OBiPEawW99eYeZO7ZCmlfaV3k2bTkSdhSRghmiBFKVqmjVdIAs6CfE7CvEnflPmqo1c3amq5EO5yZ810sH8ulsZlCOb_rw2vgHdVwVQVejp_mz1tiMT0Hi4vSQzi/w1200"/>
        
    </section>

    
    <section id="features" className="section">
        <div className="content">
            <h2>Features</h2>
            <p>Discover our intuitive design, easy publishing, and community-driven features to elevate your blogging experience.</p>
        </div>
    </section>

    
    <section id="contact" className="section">
        <div className="content content-left">
            <h2>Contact Us</h2>
            <p>Ready to start blogging? Get in touch with us and join our community of creators.</p>
        </div>
        <img src="https://blogger.googleusercontent.com/img/b/U2hvZWJveA/AVvXsEglSeoZ-dLBYvKA1stO0YAB3WC9Ij94BvaEsSdN98EIgA9I4tEOA7g8m-HuJL9f7tQrU9eCueLgAldjPsV-IVZtxm_U75JvFA3AFaqdIOavISGc-7huKdgFPpZHLTw5e81yii5K1eKu2BJbR8VjXBaz7EZB1aqUKPo/w768" height="530px" widht="530px"/>
    </section>
    

   </>
  )
}
