import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './componentes/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <p><App /></p>  
    </div>
  </React.StrictMode>
);

