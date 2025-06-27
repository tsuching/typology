import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Adjust to './App.js' if your file is named App.js
import './index.css' // <--- THIS LINE IS CRUCIAL FOR YOUR STYLES

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)