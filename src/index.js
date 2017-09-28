import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Field from './myapp/Field';
import './myapp/css/animate.css';

ReactDOM.render(<Field />, document.getElementById('root'));
registerServiceWorker();
