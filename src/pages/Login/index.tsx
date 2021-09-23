import React from 'react';
import LandingPageLogo from '../../assets/LandingPageLogo';
import Login from './Login';

const index = () => (
  <>
    <div style={{ width: '50%' }} className="middle-login">
      <Login />
    </div>
    <div style={{ width: '50%' }} className="middle-login">
      <LandingPageLogo />
    </div>
  </>
);

export default index;
