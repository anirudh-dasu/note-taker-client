/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropType from 'prop-types'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Notes from '../components/Notes'


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  parent: {
    display: 'flex',
    flexDirection: 'row',
    flex: 'flex-grow'
  },
  notes: {
    width: '70%',
    float: 'left'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '30px'
  }
})

const HomeContainer = (props) => {
  const { classes } = props
  return (
    <div className={classes.parent}>
      <div className={classes.notes}>
        <Paper className={classes.paper} >
          <Notes {...props} />
        </Paper>
      </div>
    </div>
  )
}

HomeContainer.propTypes = {
  classes: PropType.object.isRequired
}

export default compose(withRouter, withStyles(styles))(HomeContainer)

