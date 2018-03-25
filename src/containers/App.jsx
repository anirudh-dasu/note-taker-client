/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { graphql, withApollo, compose } from 'react-apollo'
import PropType from 'prop-types'
import { getAndDecryptUser } from '../utils'
import Routes from './Routes'
import userQuery from '../graphql/queries/userQuery.graphql'

class App extends React.Component {
  componentDidMount() {
    const user = getAndDecryptUser()
    if (user) {
      this.props.client.writeQuery({ query: userQuery, data: user })
    }
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <CssBaseline />
        {<Routes user={data.user} />}
      </div>
    )
  }
}

App.propTypes = {
  data: PropType.object.isRequired,
  client: PropType.object.isRequired
}

const AppWithData = compose(graphql(userQuery), withApollo)(App)

export default AppWithData
