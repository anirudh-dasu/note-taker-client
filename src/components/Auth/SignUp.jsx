/* eslint react/forbid-prop-types: 0 */
/* eslint no-unused-vars:0 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'
import signUpMutation from '../../graphql/mutations/signUpMutation.graphql'
import { getDeviceId, getDeviceType } from '../../utils'
import userQuery from '../../graphql/queries/userQuery.graphql'


class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
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
        success: false,
        loading: false
      })
      return
    }
    localStorage.setItem('note-taker-token', data.userDevice.jwt)
    const { history } = this.props
    history.push('/')
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = () => (event) => {
    const { signUp } = this.props
    this.setState({ success: false, error: false, loading: true })
    event.preventDefault()
    signUp(this.state.email, this.state.password, this.state.passwordConfirmation, this.state.username)
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
                Sign up
              </Typography>
              <form
                className={classes.container}
                onSubmit={this.handleSubmit()}
                autoComplete='nope'
              >
                <TextField
                  name='email'
                  label='Email'
                  type='email'
                  required
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
                <TextField
                  name='password'
                  label='Password'
                  type='password'
                  required
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
                <TextField
                  name='passwordConfirmation'
                  label='Password Confirmation'
                  type='password'
                  required
                  className={classes.textField}
                  value={this.state.passwordConfirmation}
                  onChange={this.handleChange('passwordConfirmation')}
                />
                <TextField
                  name='username'
                  label='Username'
                  type='text'
                  required
                  className={classes.textField}
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                />
                <div className={classes.wrapper}>
                  <Button
                    variant='raised'
                    color='primary'
                    type='Submit'
                    className={classes.button}
                    disabled={this.state.loading}
                  >
                    Sign up
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const SignUpWithData = graphql(signUpMutation, {
  props: ({ ownProps, mutate }) => ({
    signUp: (email, password, passwordConfirmation, username) =>
      mutate({
        variables: {
          email,
          password,
          password_confirmation: passwordConfirmation,
          username,
          device_id: getDeviceId(),
          device_type: getDeviceType()
        },
        update: (store, { data: { signUp: { user, userDevice } } }) => {
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
})(SignUp)

export default SignUpWithData
