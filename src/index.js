import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className='desktopview'>
      <App />
    </div>
    <div className='MobileViewDisplay'>
      <h2>Bharat Seva</h2>
      <strong>Note:</strong>
      <p>
        Thank you for your interest in Bharat Seva! At the moment, our platform is optimized
        for desktop use, and a seamless experience on other devices is currently under development.
      </p>
      <p>For the best experience, we recommend accessing our website on a desktop.</p>
      <p>We appreciate your patience and understanding.</p>
    </div>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
