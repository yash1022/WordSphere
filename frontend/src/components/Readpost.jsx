import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import "../CSS/readpage.css"
import { authContext } from '../App';

export default function Readpost() {
    const location = useLocation();
    const post = location.state?.post;
    const Auth=useContext(authContext);
    const [Liked,SetLiked]=useState(false);
    const [LikeCount, SetLikeCount]=useState(0);
    const [Caller, Setcaller] = useState(false);
    



    useEffect(() => {
        responseData(post.id,Auth.User)
    },[Caller])


    async function responseData(id,user_id)
    {
        try{
            const response=await fetch('http://localhost:5000/api/info',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    
                    
                },

                body:JSON.stringify({
                    user:user_id,
                    article_id:id
                })
            })

            const res= await response.json();

            if(res===1)
            {
                SetLiked(true)
                
            }

            else 
            {
                SetLiked(false);
                
            }



        }catch(e)
        {
            console.log(e);
        }
    }


   async function handleLike(user,article_id) {

    


    try{

      const response=await fetch('http://localhost:5000/api/like',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                
                
            },
            body:JSON.stringify({
                user:user,
                article_id:article_id,
                like:Liked
            })
        })

        const res= await response.json();

        if(res===1)
        {
            Setcaller(!Caller)
            SetLikeCount((prev) => prev + (Liked ? -1 : 1));
        }

        
    }
    catch(e)
   
   {
    console.log(e);
   }
    
   }

  
   
    

    return (
        

<>
    <div className="postconttainer">
    <p className="title">{post?.title || post.article?.title}</p>
    <div className="metaDatapostconttainer">
     <img src={post.author?.profile_Pic || post.orginalAuthor?.profile_Pic} className="profilePic"/>
      <div className="metaDetails">
        <div className="maindetails">
          <span className="name">{post.author?.name || post.originalAuthor?.name}</span>
          
        </div>
        <div className="additionaldetails">
          <span className="published">Published on <strong>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
          
        </div>
      </div>
    </div>
    <div className="interactionBar">
    
    <div className="heart-container" title="Like">

    
    
        
            <input type="checkbox" className="checkbox" id="Give-It-An-Id" onChange={()=>{handleLike(Auth.User,post.id);  }}  />
            <div className="svg-container">

            
        
                
                <svg viewBox="0 0 24 24" className={`svg-outline ${Liked ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                
                <svg viewBox="0 0 24 24" className={`svg-filled ${Liked ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
               
            </div>
            {isNaN(post?.count)?0:post?.count+LikeCount}
        </div>
        <label className="ui-bookmark">
            <input type="checkbox"/>
            <div className="bookmark">
            <svg viewBox="0 0 32 32">
                <g>
                <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                </g>
            </svg>
            </div>
        </label>
    </div>
   
    <div className="content">
        <p>{post.content || post.article?.content}</p>
    </div>
   </div>

</>
)};



    




