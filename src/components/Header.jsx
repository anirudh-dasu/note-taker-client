/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  margin: {
    marginLeft: '30px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}


const Header = (props) => {
  const { classes } = props

  // const logInLink = () => <Link to='/login' href='/login' />

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='title' color='inherit' >Notetaker</Typography>
          <Typography variant='subheading' color='inherit' className={[classes.flex, classes.margin].join(' ')}>A Graphql Client Demo</Typography>
          <Link className={classes.link} to='/login' href='/login'><Button color='inherit'>Login</Button></Link>
          <Button color='inherit'>Github</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
  // isLoggedIn: PropTypes.bool.isRequired
}


export default withStyles(styles)(Header)
