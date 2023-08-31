import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { createRoot } from 'react-dom/client'

const refresh = () => window.location.reload(true)
createRoot(document.getElementById('app')).render(<App/>)
