import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { authContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';

function ProfilePage({ mode }) {
    const [data, setData] = useState({});
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (Auth.token) {
            fetchData(Auth.token, Auth.User);
        } else {
            navigate('/home');
        }
    }, [Auth.token, Auth.User, navigate]);

    async function fetchData(token, user_email) {
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token,
                    user: user_email,
                },
            });
            const data = await response.json();
            setData(data);
        } catch (e) {
            console.error("Error fetching data", e);
        }
    }

    const profileImage = data.profile_pic || "https://picsum.photos/200/300";

    // Determine colors based on the mode
    const textColor = mode === 'dark' ? 'white' : '#343a40';
    const bgColor = mode === 'dark' ? '#222' : '#e9ecef';
    const postBgColor = mode === 'dark' ? '#333' : '#ffffff';
    const secondaryTextColor = mode === 'dark' ? '#cccccc' : '#6c757d';
    const buttonColor = mode === 'dark' ? '#007bff' : '#343a40';

    return (
        <div className="container">
            <div className="profile-header d-flex align-items-center p-4" style={{ backgroundColor: bgColor, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <img src={profileImage} alt="Profile" className="profile-image rounded-circle mr-3" style={{ width: '100px', height: '100px', padding: '5px' }} />
                <div className="profile-details d-flex flex-column" style={{ marginRight: 'auto' }}>
                    <h2 style={{ margin: '0', color: textColor, fontWeight: 'bold' }}>{data.name}</h2>
                    <p style={{ margin: '1rem 0 0 0', color: secondaryTextColor }}>{data.bio || "This user has not set a bio."}</p>
                </div>
                <div className="d-flex">
                    <div className="text-center mx-3">
                        <h4 style={{ margin: '0', color: '#007bff' }}>{data.articles?.length || 0}</h4>
                        <p style={{ margin: '0', color: secondaryTextColor }}>Posts</p>
                    </div>
                    <div className="text-center mx-3">
                        <h4 style={{ margin: '0', color: '#007bff' }}>1000</h4>
                        <p style={{ margin: '0', color: secondaryTextColor }}>Followers</p>
                    </div>
                    <div className="text-center mx-3">
                        <h4 style={{ margin: '0', color: '#007bff' }}>500</h4>
                        <p style={{ margin: '0', color: secondaryTextColor }}>Following</p>
                    </div>
                </div>
            </div>

            {/* Navigation Options with Professional Styling */}
            <div className="profile-navigation mt-4 d-flex justify-content-around">
                <Link to="/liked" className="btn btn-professional">Likes</Link>
                <Link to="/fav" className="btn btn-professional">Favorites</Link>
            </div>

            {/* Posts Heading */}
            <h2 className="text-center mt-4" style={{ color: textColor }}>POSTS</h2>

            {/* Individual Posts */}
            <div className="mt-4">
                {data.articles?.map((post) => (
                    <div key={post.id} className="post border rounded p-3 mb-4" style={{ backgroundColor: postBgColor, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} onClick={() => { navigate('/post', { state: { post } }) }}>
                        <div className="d-flex justify-content-between">
                            <p className="text-muted" style={{ margin: '0', color: secondaryTextColor }}>Posted on {post.created_at}</p>
                        </div>
                        <img alt="Post" className="post-image img-fluid mb-3" />
                        <p style={{ color: textColor }}>{post.title}</p>
                        <div className="post-stats d-flex justify-content-around mt-3">
                            <div className="stat text-center">
                                <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '20px', color: textColor }} />
                                <p style={{ margin: '0', color: textColor }}>Likes</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional CSS for Professional Styling */}
            <style jsx>{`
                .btn-professional {
                    background-color: ${buttonColor};
                    color: white;
                    border-radius: 8px;
                    padding: 0.5rem 1.25rem;
                    font-weight: bold;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border: none;
                }

                .btn-professional:hover {
                    background-color: ${mode === 'dark' ? '#0056b3' : '#0056b3'};
                    transform: translateY(-3px);
                }

                .btn-professional:active {
                    background-color: ${mode === 'dark' ? '#004080' : '#004080'};
                    transform: translateY(1px);
                }
            `}</style>
        </div>
    );
}

export default ProfilePage;
