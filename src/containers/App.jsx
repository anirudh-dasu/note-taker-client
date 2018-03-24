/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { graphql } from 'react-apollo'
import PropType from 'prop-types'
import Routes from './Routes'
import userQuery from '../graphql/queries/userQuery.graphql'

const App = (props) => {
  const { data } = props
  return (
    <div>
      <CssBaseline />
      {data.loading && <Routes />}
      {!data.loading && <Routes user={data.user} /> }
    </div>
  )
}

App.propTypes = {
  data: PropType.object.isRequired
}

const AppWithData = graphql(userQuery)(App)

export default AppWithData
