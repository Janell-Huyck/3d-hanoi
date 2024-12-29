import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global styling (html, body, root)
import './styles'; // All component-specific styles (imported via barrel file)
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
