import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footerLeft'>
        <span className='span-text'>created by @KyleHere</span>
      </div>
      <div className='footerRight'>
        <a href='https://github.com/KyleHere'>
          <img
            className='logo'
            src='https://i.imgur.com/ewkZOQq.png'
          />
        </a>
        <a href='https://www.linkedin.com/in/kyle-tseng-220614204/'>
          <img
            className='logo'
            src='https://i.imgur.com/SBMxqYW.png'
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer;
