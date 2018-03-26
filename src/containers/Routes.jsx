import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './HomeContainer'
import Header from '../components/Common/Header'
import AuthContainer from './AuthContainer'

const Routes = props => (
  <div>
    <Header {...props} />
    <Switch>
      <Route exact path='/' component={() => <HomeContainer />} />
      <Route path='/login' component={() => <AuthContainer {...props} />} />
    </Switch>
  </div>)

export default (Routes)
