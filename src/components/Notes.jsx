/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import { graphql, withApollo, compose } from 'react-apollo'
import notesQuery from '../graphql/queries/notesQuery.graphql'

const styles = theme => ({
  topContainer: {
    height: '64px',
    padding: '12px',
    borderBottom: '1px solid black',
    float: 'left'
  },
  mainTitle: {
    fontWeight: '700',
    fontSize: '18px',
    textAlign: 'left',
    height: '40px',
    lineHeight: '40px',
    marginLeft: '32px',
    float: 'left'
  },
  noteItem: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column'
  },
  listContainer: {
    float: 'left',
    width: '100%'
  },
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 0 }
  }

  handleSelection = element => () => {
    const { data } = this.props
    const selected = data.notes.indexOf(element)
    this.setState({ selected })
  }

  render() {
    const { classes, data } = this.props
    const selected = this.state.selected
    console.log(`Data is ${JSON.stringify(data)}`)
    return (
      <div className={classes.mainContainer}>
        <div className={classes.topContainer}>
          <Typography className={classes.mainTitle}>NOTES</Typography>
        </div>
        <div className={classes.mainContainer}>
          {!data.loading && (
            <List>
              {data.notes.map((element, index) => {
                return (
                  <ListItem
                    key={element.id}
                    divider
                    className={[classes.listItem, classes.noteItem].join(' ')}
                    onClick={this.handleSelection(element)}
                    color={data.notes.indexOf(element) ? 'grey' : 'inherit'}
                  >
                    <div className={classes.listContainer}>
                      <Typography variant='headline'>{element.title}</Typography>
                    </div>
                    <div className={classes.listContainer}>
                      <Typography noWrap variant='body1'>{element.content}</Typography>
                    </div>
                  </ListItem>
                  )
              })}
            </List>
          )}
        </div>

      </div>
    )
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
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
