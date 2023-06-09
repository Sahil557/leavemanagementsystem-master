import React from 'react';
import { Route, Switch} from 'react-router-dom';
// import Dashboard from './Dashboard';
import './App.css';
import Login from '../Authentication/Login'

class App extends React.Component {

  render() {
  return (
      <div>
        <Switch>
          {/* <Route path='/dashboard' component={Dashboard} />  */}
          <Route path='/' component={Login}/> 
        </Switch>
    </div>
  );
  }
}

export default App;