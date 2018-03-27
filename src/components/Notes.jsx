/* eslint react/forbid-prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import AddNoteIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import { graphql, withApollo, compose } from 'react-apollo'
import DeleteIcon from 'material-ui-icons/Delete'
import notesQuery from '../graphql/queries/notesQuery.graphql'

const styles = theme => ({
  topContainer: {
    height: '64px',
    padding: '12px',
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    float: 'left'
  },
  mainTitle: {
    fontWeight: '900',
    fontSize: '16px',
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
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  selectedItem: {
    backgroundColor: theme.palette.text.light
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  root: {
    maxWidth: '100%'
  },
  secondary: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical'
  }
})

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 0 }
  }

  handleSelection = index => () => {
    this.setState({ selected: index })
  }

  render() {
    const { classes, data } = this.props
    const { selected } = this.state
    console.log(`Data is ${JSON.stringify(data)}`)
    return (
      <div className={classes.mainContainer}>
        <div className={classes.topContainer}>
          <Typography className={classes.mainTitle}>NOTES</Typography>
          <Button className={classes.button} variant='raised' color='primary'>
            New
            <AddNoteIcon className={classes.rightIcon} />
          </Button>
        </div>
        <div className={classes.mainContainer}>
          {!data.loading &&
            data.notes && (
              <List>
                {data.notes.map((element, index) => {
                  const itemClass =
                    index === selected ? classes.selectedItem : ''
                  return (
                    <ListItem
                      key={element.id}
                      divider
                      button
                      className={[
                        classes.listItem,
                        classes.noteItem,
                        itemClass
                      ].join(' ')}
                      onClick={this.handleSelection(index)}
                    >
                      <ListItemText
                        primary={element.title}
                        secondary={element.content}
                        classes={{ root: classes.root, secondary: classes.secondary }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label='Delete'>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
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
