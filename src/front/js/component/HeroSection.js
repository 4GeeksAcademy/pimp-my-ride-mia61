import React from 'react';
import "../../styles/App.css";
import { Button } from '../pages/Button';
import "../../styles/HeroSection.css";
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='https://videos.pexels.com/video-files/4488717/4488717-uhd_4096_2160_25fps.mp4' autoPlay loop muted />
      <h1>EXCEPTIONAL CAR CARE</h1>
      <p>Track your vehicle's progress in real-time</p>
      <div className='hero-btns'>
        <Link to='/customer-log-in'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            LOG IN
          </Button>
        </Link>
        <Link to='/quick-search'>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={() => console.log('Quick Search')}
          >
            QUICK SEARCH <i className='far fa-play-circle' />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
