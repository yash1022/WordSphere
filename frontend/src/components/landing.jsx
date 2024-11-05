import React from 'react'
import '../CSS/Landingpage.css';
import image from '../CSS/solved-the-problem.svg'


export default function Landing() {
  return (


    <>
      <div className="homepage">
      <div className="homepage-text">
        <h1>Unleash Your Voice with <span>MindScribe</span></h1>
        <p>Your platform to share, explore, and inspire through your words.</p>
      </div>
      <div className="homepage-image">

      <img src={image} alt="Homepage Illustration" className="img-fluid rounded" />
        
      </div>
     </div> 
    

   </>
  )
}
