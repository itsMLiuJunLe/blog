import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login.js';
import AdminIndex from './AdminIndex.js';

function Main() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/index/' component={AdminIndex} />
    </Router>
  )
}

export default Main;