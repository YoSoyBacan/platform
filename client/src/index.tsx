import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './common/serviceWorker';
import { AuthProvider } from './context';

// Service worker
// App
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>, 
document.getElementById('root'));

serviceWorker.unregister();
