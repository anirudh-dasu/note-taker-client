/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { graphql, withApollo, compose } from 'react-apollo'
import notesQuery from '../graphql/queries/notesQuery.graphql'

const styles = theme => ({
  topContainer: {
    height: '64px',
    padding: '12px',
    borderBottom: '1px solid black'
  },
  mainTitle: {
    fontWeight: '700',
    fontSize: '18px',
    textAlign: 'left',
    height: '40px',
    lineHeight: '40px',
    marginLeft: '32px',
    float: 'left'
  }
})

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tag: '', offset: 0, keyword: 'test' }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.topContainer}>
        <Typography className={classes.mainTitle}>NOTES</Typography>
      </div>
    )
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired
}

const NotesWithData = compose(
  withStyles(styles),
  graphql(notesQuery, {
    options: ownProps => ({
      variables: {
        tag: ownProps.tag,
        offset: ownProps.offset,
        keyword: ownProps.keyword
      }
    })
  })
)(Notes)

export default NotesWithData
