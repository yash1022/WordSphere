import React from 'react';

export default function HorizontalScrolling({ mode }) {
    const styles = {
        container: {
            maxWidth: '100%',
            margin: '0 auto',
            padding: '20px',
            boxSizing: 'border-box',
        },
        scrollmenu: {
            backgroundColor: mode === "dark" ? "#333" : "white", // Dark mode background color
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: '10px 0',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE
        },
        link: {
            display: 'inline-block',
            color: mode === "dark" ? "white" : "black", // Dark mode text color
            textAlign: 'center',
            padding: '14px',
            textDecoration: 'none',
            marginRight: '10px',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
        },
        linkHover: {
            backgroundColor: '#777',
        },
        heading: {
            fontSize: '24px',
            fontWeight: '600',
            color: mode === "dark" ? "white" : "#333", // Dark mode heading color
            marginTop: '20px',
        },
        text: {
            fontSize: '16px',
            color: mode === "dark" ? "#ddd" : "#555", // Dark mode text color
            marginTop: '10px',
        }
    };

    return (
        <div>
            <div style={styles.container}>
                <div style={styles.scrollmenu}>
                    <a href="#Technology" style={styles.link}>Technology</a>
                    <a href="#Self-Improvement" style={styles.link}>Self Improvement</a>
                    <a href="#Health" style={styles.link}>Health</a>
                    <a href="#Psychology" style={styles.link}>Psychology</a>
                    <a href="#Mental-Health" style={styles.link}>Mental Health</a>
                    <a href="#Software-Development" style={styles.link}>Software Development</a>
                    <a href="#Relationships" style={styles.link}>Relationships</a>
                    <a href="#AWS" style={styles.link}>AWS</a>
                    <a href="#UX-Design" style={styles.link}>UX Design</a>
                    <a href="#home" style={styles.link}>Home</a>
                    <a href="#news" style={styles.link}>News</a>
                    <a href="#contact" style={styles.link}>Contact</a>
                    <a href="#about" style={styles.link}>About</a>
                    <a href="#support" style={styles.link}>Support</a>
                    <a href="#blog" style={styles.link}>Blog</a>
                    <a href="#tools" style={styles.link}>Tools</a>
                    <a href="#base" style={styles.link}>Base</a>
                    <a href="#custom" style={styles.link}>Custom</a>
                    <a href="#more" style={styles.link}>More</a>
                    <a href="#logo" style={styles.link}>Logo</a>
                    <a href="#friends" style={styles.link}>Friends</a>
                    <a href="#partners" style={styles.link}>Partners</a>
                    <a href="#people" style={styles.link}>People</a>
                    <a href="#work" style={styles.link}>Work</a>
                </div>
            </div>
        </div>
    );
}
