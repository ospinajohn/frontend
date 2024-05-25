import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './routes/Routes.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Routes />
	</React.StrictMode>
);
