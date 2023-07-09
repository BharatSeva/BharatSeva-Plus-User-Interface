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
      <strong>NOTE:</strong>
      <p>I'm feeling glad that you have showed interest in my project but our Website is currently for Desktop View, It will take time for Other Devices.</p>
      <p>View Desktop Version for Better Experience.</p>
      <p>Thank You 😊</p>
    </div>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
