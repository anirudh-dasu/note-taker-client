/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropType from 'prop-types'
import Typography from 'material-ui/Typography'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Login from '../components/Auth/Login'
import SignUp from '../components/Auth/SignUp'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  margin: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '20px',
    width: '80%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: '20%',
    marginRight: '20%',
    width: '60%'
  },
  button: {
    width: '100%',
    height: '100%'
  },
  buttonProgress: {
    color: theme.loading,
    position: 'absolute',
    left: '50%',
    top: '5px'
  },
  wrapper: {
    marginTop: '20px',
    marginBottom: theme.spacing.unit,
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    position: 'relative',
    textAlign: 'center'
  },
  parent: {
    display: 'flex',
    flexDirection: 'row',
    flex: 'flex-grow'
  },
  child: {
    width: '50%',
    float: 'left'
  },
  divide: {
    marginTop: '200px'
  }
})

class AuthContainer extends React.Component {
  componentDidMount() {
    const { user, history } = this.props
    if (user) {
      history.push('/')
    }
  }


  render() {
    const { classes } = this.props
    return (
      <div className={classes.parent}>
        <div className={classes.child}>
          <Login {...this.props} />
        </div>
        <Typography className={classes.divide} variant='title'>
          Or
        </Typography>
        <div className={classes.child}>
          <SignUp {...this.props} />
        </div>
      </div>
    )
  }
}

AuthContainer.propTypes = {
  classes: PropType.object.isRequired,
  user: PropType.object,
  history: PropType.object.isRequired
}

AuthContainer.defaultProps = { user: null }

export default compose(withRouter, withStyles(styles))(AuthContainer)
