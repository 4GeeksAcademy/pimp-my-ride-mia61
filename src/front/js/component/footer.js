import React from 'react';
import "../../styles/Footer.css";
import { Button } from '../pages/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Subscribe to get updates on our vehicle services and exclusive deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button type='submit' className='btn btn--outline'>Subscribe</button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/demo'>Demo</Link>
            <Link to='/services'>Services</Link>
            <Link to='/products'>Products</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Quick Links</h2>
            <Link to='/user-log-in'>Owner Login</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/customerpage'>Customer Page</Link>
            <Link to='/customer-signup'>Sign Up</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Progress Tracking</h2>
            <Link to='/progressbar'>Progress Bar</Link>
            <Link to='/user-customer-details'>User Customer Details</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Follow Us</h2>
            {/* Replace # with your actual social media links */}
            <Link to='#'>Instagram</Link>
            <Link to='#'>Facebook</Link>
            <Link to='#'>YouTube</Link>
            <Link to='#'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              PIMP MY RIDE
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>PIMP MY RIDE © {new Date().getFullYear()}</small>
          <div className='social-icons'>
            {/* Update these links to your shop's social media profiles */}
            <a
              className='social-icon-link facebook'
              href='#'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </a>
            <a
              className='social-icon-link instagram'
              href='#'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a>
            <a
              className='social-icon-link youtube'
              href='#'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </a>
            <a
              className='social-icon-link twitter'
              href='#'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;