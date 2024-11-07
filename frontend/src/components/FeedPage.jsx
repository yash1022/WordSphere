import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import '../CSS/FeedPage.css';
import '../CSS/Hovercomp.css'

import CreateBtn from './CreateBtn';
import { authContext } from '../App';
import { useNavigate } from 'react-router-dom';

const FeedPage = ({ mode }) => {
    const textColorClass = mode === 'dark' ? 'text-white' : 'text-dark'; 
    const [Category, Setcategory]=useState(' ');
    const[Data, setData]= useState([]);
    const Auth= useContext(authContext);  
    const navigate = useNavigate() 
    
    


    useEffect(()=>{

      
        getposts();
      
        

    },[Auth.token,Category])

    async function getposts()
    {
        try{
        const response = await fetch('http://localhost:5000/api/feed',{

            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':'Bearer '+ Auth.token,
                
            },

            body:JSON.stringify({
                user:Auth.User,
                category:Category,
            })

           
        


        })
        const data = await response.json();
        setData(data);
    }catch(e)
    {
        console.log(e)
    }
    }




   function handleClick(event)
    {
        Setcategory(event)
    }
    
    return (

        <>

<div className="container">
            <div className={`scrollmenu ${mode === "dark" ? "dark" : "light"}`}>
                {["Technology", "Self Improvement", "Health", "Psychology", "Mental Health", "Software Development", "Relationships", "AWS", "UX Design", "Home", "News", "Contact", "About", "Support", "Blog", "Tools", "Base", "Custom", "More", "Logo", "Friends", "Partners", "People", "Work"].map(cat => (
                    <span key={cat} className="link" onClick={() => handleClick(cat)}>
                        {cat}
                    </span>
                ))}
            </div>
        </div>

    
        <div className={`container my-5 bg-${mode}`}>
             <CreateBtn/>
            <h2 className={`text-center mb-4 ${textColorClass}`}>ALL POSTS</h2>
            
            <div className="row">
                {Data.map(post => (
                    <div key={post.id} className="col-md-4 mb-4" onClick={()=>{navigate('/post',{state:{post}})}}>
                        <div className={`card shadow-sm border-0 bg-${mode} post-card`}>
                            <div className="card-body">
                                <div className="d-flex align-items-start mb-3">
                                    <img src={post.author.profile_pic} alt={''} className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <h5 className={`card-title mb-0 ${textColorClass}`}>
                                            {post.author.name} <small className="text-muted">{}</small>
                                        </h5>
                                    </div>
                                </div>
                                <p className={`card-text mb-2 ${textColorClass}`}>{post.title}</p>
                                <img src={''}  className="img-fluid mb-2" style={{ borderRadius: '10px' }} />
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="d-flex align-items-center">
                                        {/* <FontAwesomeIcon icon={faThumbsUp} className="me-2" /> {post.stats.likes}
                                        <FontAwesomeIcon icon={faRetweet} className="me-2 ms-3" /> {post.stats.retweets}
                                        <FontAwesomeIcon icon={faComment} className="me-2 ms-3" /> {post.stats.comments} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </>
    );
};

export default FeedPage;
