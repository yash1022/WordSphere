import React, { useEffect } from 'react'
import { useContext } from 'react'
import { authContext } from '../App'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "../CSS/fav.css"

export default function Fav() {

  const Auth= useContext(authContext)
  const [data,setdata]= useState([])
  const navigate= useNavigate();

  useEffect(()=>{

    fetch_posts(Auth.User)

  },[])

  async function fetch_posts(user_id)
  {
         const response = await fetch('http://localhost:5000/api/getsaved',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },

          body: JSON.stringify({
            user:user_id,
            
          })
        })

       const res= await response.json();
       console.log(res);
       setdata(Array.isArray(res) ? res : []);
  
}


async function handle_delete(id)
{
  try {
    const response = await fetch('http://localhost:5000/api/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: Auth.User, article_id: id }),
    });

    if (!response.ok) throw new Error('Failed to delete article');

    setdata((prevData) => prevData.filter((post) => post.article.id !== id));

    fetch_posts(Auth.User);
} catch (error) {
    console.error('Error deleting article:', error);
}
}
  return (
    <>

<div className='head' style={{fontFamily:'Montserrat, serif',fontWeight:'600', fontSize:'30px', marginTop:'20px', marginLeft:'10px',color:'gray'}}>Saved Articles</div>
<hr style={{marginTop:'2px'}}></hr>

<div className="row">
                {data.map(post => (
                    <div key={post.article.id} className="col-md-4 mb-4 my-4">
                        <div className={`card shadow-sm border-0  post-card` }>
                            <div className="card-body">
                                <div className="d-flex align-items-start mb-3">
                                    <img src={post.originalAuthor.profile_pic}  alt={''} className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                                    <div>
                                        <h5 className={`card-title mb-0`} style={{color:'grey',fontSize:'17px',marginTop:'4px', fontFamily:'Montserrat, serif'}}>
                                        
                                            {post.originalAuthor.name} &bull; {new Date(post.article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </h5>
                                    </div>
                                    
                                </div>
                                <hr style={{marginTop:'-5px'}}></hr>
                                <p className={`card-text mb-2 `} style={{fontFamily:'Montserrat, serif', fontWeight:'700',fontSize:'28px'}}>{post.article.title}</p>
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




                            <button class="button" onClick={()=>{handle_delete(post.article.id)}}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 69 14"
                                class="svgIcon bin-top"
                              >
                                <g clip-path="url(#clip0_35_24)">
                                  <path
                                    fill="black"
                                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_35_24">
                                    <rect fill="white" height="14" width="69"></rect>
                                  </clipPath>
                                </defs>
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 69 57"
                                class="svgIcon bin-bottom"
                              >
                                <g clip-path="url(#clip0_35_22)">
                                  <path
                                    fill="black"
                                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_35_22">
                                    <rect fill="white" height="57" width="69"></rect>
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>

                                        
                                            
                                        
                                        
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                ))}
            </div>




    
    
    
    
    
    
  </>
  )
}
