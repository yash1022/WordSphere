import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Readpost() {
    const location = useLocation();
    const post = location.state?.post;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{post?.title || "Untitled Article"}</h1>
            <div style={styles.metaDataContainer}>
                {post?.profile_Pic && (
                    <img src={post.profile_Pic} alt="Author" style={styles.profilePic} />
                )}
                <p style={styles.metaData}>
                    <span style={styles.author}>{post?.author.name || "Author Name"}</span> | 
                    <span style={styles.date}>{post?.created_at || "Date Published"}</span>
                </p>
            </div>
            <div style={styles.content}>
                {post?.content ? (
                    <p>{post.content}</p>
                ) : (
                    <p>No content available.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '40px 20px',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333333',
    },
    metaDataContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
    },
    profilePic: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    metaData: {
        fontSize: '1em',
        color: '#888888', // grey color for metadata
    },
    author: {
        fontWeight: '600',
    },
    date: {
        marginLeft: '10px',
    },
    content: {
        fontSize: '1.25em',
        lineHeight: '1.8',
        color: '#444444',
        whiteSpace: 'pre-line',
    },
};
