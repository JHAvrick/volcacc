import React from 'react';
import GithubIconPNG from '../../assets/icons/github-icon.png';
import LinkedInIconPNG from '../../assets/icons/linkedin-icon.png';
import ContactIconPNG from '../../assets/icons/contact-icon.png';
import "./footer.css";

/**
 * This component appears on mobile browsers or when a desktop browser is 
 * scaled too small for the app to be displayed properly. 
 */
function Footer() {
    return(
        <div className="footer_wrapper"> 
            <div className="footer_profile">
                <div className="footer_social-media"> 
                    <a href="https://github.com/JHAvrick/volcacc" target="_blank" rel="noopener noreferrer">
                        <img alt="Github" src={GithubIconPNG}></img> 
                    </a>
                    <a href="https://www.linkedin.com/in/joshavrick/" target="_blank" rel="noopener noreferrer">
                        <img alt="LinkedIn" src={LinkedInIconPNG}></img> 
                    </a>
                    <a href="mailto:josh@avrick.dev" target="_blank" rel="noopener noreferrer">
                        <img alt="Contact" src={ContactIconPNG}></img> 
                    </a>
                </div>
                <p>Created by Joshua Avrick </p>
            </div>
            
        </div>
    );
}

export default Footer;