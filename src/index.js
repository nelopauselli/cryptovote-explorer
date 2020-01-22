import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import style from './style.css';

render(
    <div>
        <App />
    </div>,
    document.getElementById("app")
)