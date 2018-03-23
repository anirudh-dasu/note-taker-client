/* eslint react/forbid-prop-types: 0 */
/* eslint no-unused-vars:0 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import { compose, graphql } from 'react-apollo'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import signInMutation from '../graphql/signInMutation.graphql'
import { getDeviceId, getDeviceType } from '../utils'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '70%',
    marginLeft: '15%'
  },
  margin: {
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: '15%',
    marginRight: '15%',
    width: '70%'
  },
  button: {
    marginTop: '20px',
    marginBottom: theme.spacing.unit,
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%'
  }
})

const onSubmit = () => (values) => {
  // log.info(`Submit called with values ${values}`)
  window.alert(`Submit called with ${values}`)
}

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    const { classes } = props
    console.log(`Props are ${JSON.stringify(props)}`)
    this.classes = classes
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = () => (event) => {
    // alert(`Submit called with email ${this.state.email} and password ${
    //   this.state.password
    // }`)
    event.preventDefault()
    this.props.mutate({
      variables: {
        email: this.state.email, password: this.state.password, device_id: getDeviceId(), device_type: getDeviceType()
      }
    }).then(({ data }) => {
      console.log(`Data is ${JSON.stringify(data)}`)
    }).catch((error) => {
      console.log(`Error is ${error}`)
    })
  }

  render() {
    return (
      <div className={this.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6} className={this.classes.margin}>
            <Paper className={this.classes.paper}>
              <Typography variant='title' color='inherit'>
                Login
              </Typography>
              <form
                className={this.classes.container}
                onSubmit={this.handleSubmit()}
              >
                <TextField
                  id='email'
                  name='email'
                  label='Email'
                  type='email'
                  required
                  className={this.classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  autoComplete='current-email'
                />
                <TextField
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  required
                  className={this.classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  autoComplete='current-password'
                />
                <Button
                  variant='raised'
                  color='primary'
                  type='Submit'
                  className={this.classes.button}
                >
                  Login
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
  // isLoggedIn: PropTypes.bool.isRequired
}

export default compose(withStyles(styles), graphql(signInMutation))(Login)
