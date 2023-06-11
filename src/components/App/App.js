import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import './App.css';
import Login from '../Authentication/Login'

class App extends React.Component {

  render() {
  return (
      <div>
        <Switch>
          <Route path='/' component={Login}/> 
          {/* <Route path='/dashboard' component={Dashboard} />  */}
        </Switch>
    </div>
  );
  }
}

export default App;