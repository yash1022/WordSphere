import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { authContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';


function ProfilePage() {

    const [data, setData] = useState({});

    const Auth = useContext(authContext)
    const navigate= useNavigate()

    useEffect(()=>{

        if(Auth.token){

            fetchdata(Auth.token,Auth.User)

        }

         else
        {
             navigate('/home')
        }


        
      
        
 },[Auth.token,Auth.User,navigate])

    async function fetchdata(token,user_email)
    {  
        try{
            const response= await fetch('http://localhost:5000/api/profile',{
                method: 'POST',
                headers:{
                'Content-Type': 'application/json',
                 authorization: 'Bearer '+ token,
                 user:user_email

                }
            })

            const data= await response.json();
            
            setData(data);
            
        }
        catch(e)
        {
            console.error("Error fetching data",e);
        }
    }

    const profileImage=data.profile_pic;
    console.log(profileImage)
    const postImage = "https://picsum.photos/200/300";

    const navOptions = [
        "Posts",
        "Likes",
        "Favorites"
    ];

    // Sample data for posts
    

    // Calculate total likes, shares, and saves
    

    return (
        <div className="container">
            <div className="profile-header d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f5f5f5' }}>
                <img src={data.profile_pic||postImage} alt="Profile" className="profile-image rounded-circle mr-3" style={{ width: '100px', height: '100px' }} />
                <div className="d-flex">
                    <div className="text-center mx-3">
                        { <h4>{data.articles?.length||0}</h4>}
                        <p>Posts</p>
                    </div>
                    <div className="text-center mx-3">
                        <h4>1000</h4>
                        <p>Followers</p>
                    </div>
                    <div className="text-center mx-3">
                        <h4>500</h4>
                        <p>Following</p>
                    </div>
                </div>
            </div>

            <div className="profile-content mt-4 text-center">
                <h2>{data.name}</h2>
                
            </div>

            {/* Navigation Options */}
            <div className="profile-navigation mt-4 d-flex justify-content-around">
                {navOptions.map((option, index) => (
                    <div key={index} className="nav-option" style={{ cursor: 'pointer', color: 'black' }}>
                        {option}
                    </div>
                ))}
            </div>

            {/* Total Post Statistics */}
            {/* <div className="post-stats mt-4 d-flex justify-content-around">
                <div className="stat text-center">
                    <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '24px', color: 'black' }} />
                    <h4>{totalStats.likes}</h4>
                    <p>Total Likes</p>
                </div>
                <div className="stat text-center">
                    <FontAwesomeIcon icon={faShare} style={{ fontSize: '24px', color: 'black' }} />
                    <h4>{totalStats.shares}</h4>
                    <p>Total Shares</p>
                </div>
                <div className="stat text-center">
                    <FontAwesomeIcon icon={faBookmark} style={{ fontSize: '24px', color: 'black' }} />
                    <h4>{totalStats.saves}</h4>
                    <p>Total Saves</p>
                </div>
            </div> */}

            {/* Individual Posts */}
            <div className="mt-4">
                {data.articles?.map((post) => (
                    <div key={post.id} className="post border rounded p-3 mb-4">
                        <div className="d-flex justify-content-between">
                            
                            <p>Posted on {post.created_at}</p>
                        </div>
                        <img  alt="Post" className="post-image img-fluid mb-3" />
                            <p>{post.title}</p>
                        <div className="post-stats d-flex justify-content-around mt-3">
                            <div className="stat text-center">
                                <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '20px', color: 'black' }} />
                                {/* <h5>{post.stats.likes}</h5> */}
                                <p>Likes</p>
                            </div>
                           
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>

        
)}

export default ProfilePage;