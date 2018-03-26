/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropType from 'prop-types'
import Paper from 'material-ui/Paper'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Notes from '../components/Notes'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 'calc(100% - 64px)',
    margin: '32px',
    height: 'calc(100% - 128px)'
  },
  mainContainer: {
    color: '#fff'
  },
  scrollContainer: {
    overflow: 'scroll'
  },
  notesContainer: {
    width: '30%',
    backgroundColor: 'inherit',
    height: '1000px',
    borderRight: '2px solid black'
  }
})

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tag: '', offset: 0, keyword: 'test' }
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <div className={classes.notesContainer}>
          <Notes tag={this.state.tag} offset={this.state.offset} keyword={this.state.keyword} />
        </div>
      </Paper>
    )
  }
}

HomeContainer.propTypes = {
  classes: PropType.object.isRequired
}

export default compose(withRouter, withStyles(styles))(HomeContainer)
