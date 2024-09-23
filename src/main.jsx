import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@mui/material';
import { MyProvider } from './MyProvider';
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Crear un tema personalizado


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <MyProvider>
      <CssBaseline />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MyProvider>
  </>
);