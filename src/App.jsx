import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './views/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Login}/>
        
      </Switch>
    </Router>
  );
}

export default App;
