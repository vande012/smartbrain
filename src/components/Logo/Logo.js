import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
    <div className='ma5 mt0' style={{ width: '100px' }}>
        <Tilt className='Tilt br4 shadow-5'>
            <div style={{ height: '100px', width:'100px' }}>
                <img style={{ height: '100px'}} src={logo} alt='smartbrain logo'/>
            </div>
        </Tilt>
    </div>
              
  )
}

export default Logo