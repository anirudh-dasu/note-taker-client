import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'
import { MuiThemeProvider } from 'material-ui/styles'
import App from './containers/App'
import Client from './network/apollo_client'
import registerServiceWorker from './registerServiceWorker'
import theme from './styles/theme'


const apolloClient = new Client().client
const history = createHistory()

console.log(`Apollo client is ${JSON.stringify(apolloClient)}`)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient} >
      <Router history={history} >
        <App />
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
