import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Header from '../components/Header'
import AuthContainer from './AuthContainer'

const Routes = props => (
  <div>
    <Header {...props} />
    <Switch>
      <Route exact path='/' component={() => <Home {...props} />} />
      <Route path='/login' component={() => <AuthContainer {...props} />} />
    </Switch>
  </div>

)


export default Routes
