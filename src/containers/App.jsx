/* eslint react/forbid-prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import Routes from './Routes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoggedIn: false }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const isLoggedIn = token !== null
    this.state = { isLoggedIn }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Routes isLoggedIn={this.state.isLoggedIn} />
      </div>)
  }
}


export default App
