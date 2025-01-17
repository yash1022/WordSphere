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
        console.log(data);
        
        
    }catch(e)
    {
        console.log(e)
    }
    }




   function handleClick(event)
    {
        Setcategory(event)
    }


  async function handleSave(authorId,articleId)
   {
      await fetch('http://localhost:5000/api/save',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            
        },

        body:JSON.stringify({
            user_id:Auth.User,
            org_author_id:authorId,
            article_id:articleId,
            


        })
      })
   }

   
   
   
   
    
    return (

        <>

<div className="container" >
            <div className={`scrollmenu ${mode === "dark" ? "dark" : "light"}`} style={{backgroundColor:'#fff'}}>
                {["Technology", "Self Improvement", "Health", "Psychology", "Mental Health", "Software Development", "Relationships", "AWS", "UX Design", "Home", "News", "Contact", "About", "Support", "Blog", "Tools", "Base", "Custom", "More", "Logo", "Friends", "Partners", "People", "Work"].map(cat => (
                    <span key={cat} className="link" onClick={() => handleClick(cat)}>
                        {cat}
                    </span>
                ))}

                
            </div>
            <hr style={{marginTop:'-17px'}}></hr>
</div>

    
        <div className={`container my-2 bg-${mode}`}>
             <CreateBtn/>
            
            
            <div className="row" style={{backgroundColor:'#fff', marginTop:'-20px'}}>
                {Data.map(post => (
                    <div key={post.id} className="col-md-4 mb-4" style={{backgroundColor:'#fff'}}>
                        <div className={`card shadow-sm border-0 bg-${mode} post-card` } style={{backgroundColor:'#fff'}}>
                            <div className="card-body">
                                <div className="d-flex align-items-start mb-3">
                                    <img src={post.author.profile_pic} alt={''} className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                                    <div>
                                        <h5 className={`card-title mb-0`} style={{color:'grey',fontSize:'17px',marginTop:'4px', fontFamily:'Montserrat, serif'}}>
                                        
                                            {post.author.name} &bull; {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </h5>
                                    </div>
                                    
                                </div>
                                <hr style={{marginTop:'-5px'}}></hr>
                                <p className={`card-text mb-2 `} style={{fontFamily:'Montserrat, serif', fontWeight:'700',fontSize:'28px'}}>{post.title}</p>
                                <img src={''}  className="img-fluid mb-2" style={{ borderRadius: '10px' }} />
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="d-flex align-items-center">
                                        {
                                            <button class="learn-more" onClick={()=>{navigate('/post',{state:{post}})}}>
                                            <span class="circle" aria-hidden="true">
                                            <span class="icon arrow"></span>
                                            </span>
                                            <span class="button-text">Read</span>
                                          </button>
                                        }
                                        {post.author.email !== Auth.User ? (

                                            /* From Uiverse.io by PriyanshuGupta28 */ 
                                            // <div class="checkbox-wrapper">
                                            //     <input id="_checkbox-26" type="checkbox" onClick={()=>{handleSave(post.author_id,post.id)}}/>
                                            //         <label for="_checkbox-26">
                                            //             <div class="tick_mark"></div>
                                            //         </label>
                                            // </div>

                                           
                                            /* From Uiverse.io by adamgiebl */ 
                                            <button class="cssbuttons-io-button" onClick={()=>{handleSave(post.author_id,post.id)}}>
                                                <svg
                                                    height="24"
                                                    width="24"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                                                </svg>
                                                <span>Save</span>
                                            </button>






                                        ):null}
                                            
                                        
                                        
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
