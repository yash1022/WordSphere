import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import '../CSS/FeedPage.css';
import HorizontalScrolling from './HorizontalScrolling';
import CreateBtn from './CreateBtn';

const FeedPage = ({ mode }) => {
    const textColorClass = mode === 'dark' ? 'text-white' : 'text-dark';      
    const posts = [
        { 
            id: 1, 
            user: { name: "User One", handle: "@userone", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the first post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 10, retweets: 5, comments: 2 } 
        },
        { 
            id: 2, 
            user: { name: "User Two", handle: "@usertwo", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the second post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 20, retweets: 15, comments: 3 } 
        },
        { 
            id: 3, 
            user: { name: "User Three", handle: "@userthree", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the third post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 5, retweets: 1, comments: 0 } 
        },
        { 
            id: 4, 
            user: { name: "User Four", handle: "@userfour", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the fourth post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 8, retweets: 4, comments: 1 } 
        },
        { 
            id: 5, 
            user: { name: "User Five", handle: "@userfive", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the fifth post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 12, retweets: 6, comments: 2 } 
        },
        { 
            id: 6, 
            user: { name: "User Six", handle: "@usersix", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the sixth post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 15, retweets: 9, comments: 4 } 
        },
        { 
            id: 7, 
            user: { name: "User Seven", handle: "@userseven", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the seventh post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 9, retweets: 2, comments: 1 } 
        },
        { 
            id: 8, 
            user: { name: "User Eight", handle: "@usereight", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the eighth post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 18, retweets: 7, comments: 3 } 
        },
        { 
            id: 9, 
            user: { name: "User Nine", handle: "@usernine", avatar: "https://via.placeholder.com/50" }, 
            content: "This is the ninth post!", 
            image: "https://via.placeholder.com/500x300", 
            stats: { likes: 22, retweets: 9, comments: 5 } 
        }
    ];
    
    return (
        <div className={`container my-5 bg-${mode}`}>
             <CreateBtn/>
            <h2 className={`text-center mb-4 ${textColorClass}`}>ALL POSTS</h2>
            <HorizontalScrolling/>
            <div className="row">
                {posts.map(post => (
                    <div key={post.id} className="col-md-4 mb-4">
                        <div className={`card shadow-sm border-0 bg-${mode} post-card`}>
                            <div className="card-body">
                                <div className="d-flex align-items-start mb-3">
                                    <img src={post.user.avatar} alt={post.user.name} className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <h5 className={`card-title mb-0 ${textColorClass}`}>
                                            {post.user.name} <small className="text-muted">{post.user.handle}</small>
                                        </h5>
                                    </div>
                                </div>
                                <p className={`card-text mb-2 ${textColorClass}`}>{post.content}</p>
                                <img src={post.image} alt="Post" className="img-fluid mb-2" style={{ borderRadius: '10px' }} />
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faThumbsUp} className="me-2" /> {post.stats.likes}
                                        <FontAwesomeIcon icon={faRetweet} className="me-2 ms-3" /> {post.stats.retweets}
                                        <FontAwesomeIcon icon={faComment} className="me-2 ms-3" /> {post.stats.comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedPage;
