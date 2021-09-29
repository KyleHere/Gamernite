import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer_left'>
        <span className='span-text'>created by @KyleHere</span>
      </div>
      <div className='footer_right'>
        <a className="a_tag" target="_blank" href='https://github.com/KyleHere'>
          Github
        </a>
        <a className="a_tag" target="_blank" href='https://www.linkedin.com/in/kyle-tseng-220614204/'>
          LinkedIn
        </a>
      </div>
    </footer>
  )
}

export default Footer;
