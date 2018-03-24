import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Header from '../components/Header'
import Login from '../components/Login'

const Routes = props => (
  <div>
    <Header {...props} />
    <Switch>
      <Route exact path='/' component={() => <Home {...props} />} />
      <Route path='/login' component={() => <Login {...props} />} />
    </Switch>
  </div>

)


export default Routes
