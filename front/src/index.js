// == Import : npm
import React from 'react';
import { render } from 'react-dom';

// == Import : local
// Components
import App from './components/App';

// == Render
const rootReactElement = <App />;
const target = document.getElementById('root');
render(rootReactElement, target);
