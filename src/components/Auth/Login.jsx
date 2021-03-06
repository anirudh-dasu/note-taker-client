/* eslint react/forbid-prop-types: 0 */
/* eslint no-unused-vars:0 */

import React from 'react'
import { graphql } from 'react-apollo'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import signInMutation from '../../graphql/mutations/signInMutation.graphql'
import { getDeviceId, getDeviceType, encryptAndStoreUser } from '../../utils'
import userQuery from '../../graphql/queries/userQuery.graphql'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      success: false,
      error: false,
      errorMessage: 'Incorrect details provided',
      loading: false
    }
  }

  handleResponse = (data) => {
    if (!data.user || !data.userDevice) {
      this.setState({
        errorMessage: data.messages[0].message,
        error: true,
        password: '',
        success: false,
        loading: false
      })
      return
    }
    localStorage.setItem('note-taker-token', data.userDevice.jwt)
    encryptAndStoreUser(data)
    const { history } = this.props
    history.push('/')
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = () => (event) => {
    const { signIn } = this.props
    this.setState({ success: false, error: false, loading: true })
    event.preventDefault()
    signIn(this.state.email, this.state.password)
      .then(({ data }) => {
        this.handleResponse(data.signIn)
      })
      .catch((error) => {
        this.setState({
          error: true,
          loading: false,
          success: false,
          errorMessage: error.message
        })
      })
  }

  render() {
    const { success, error, loading } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item className={classes.margin}>
            <Paper className={classes.paper}>
              <Typography variant='title' color='inherit'>
                Login
              </Typography>
              <form
                className={classes.container}
                onSubmit={this.handleSubmit()}
              >
                <TextField
                  name='email'
                  label='Email'
                  type='email'
                  required
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  autoComplete='current-email'
                />
                <TextField
                  name='password'
                  label='Password'
                  type='password'
                  required
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  autoComplete='current-password'
                />
                <div className={classes.wrapper}>
                  <Button
                    variant='raised'
                    color='primary'
                    type='Submit'
                    className={classes.button}
                    disabled={this.state.loading}
                  >
                    Login
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
                {!loading &&
                  error && (
                    <div className={classes.wrapper}>
                      <Typography color='error' variant='body1'>
                        {this.state.errorMessage}
                      </Typography>
                    </div>
                  )}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const LoginWithData = graphql(signInMutation, {
  props: ({ ownProps, mutate }) => ({
    signIn: (email, password) =>
      mutate({
        variables: {
          email,
          password,
          device_id: getDeviceId(),
          device_type: getDeviceType()
        },
        update: (store, { data: { signIn: { user, userDevice } } }) => {
          if (user && userDevice) {
            const data = store.readQuery({ query: userQuery })
            data.user = user
            data.user.userDevices = []
            data.user.userDevices.push(userDevice)
            store.writeQuery({ query: userQuery, data })
          }
        }
      })
  })
})(Login)

export default LoginWithData
