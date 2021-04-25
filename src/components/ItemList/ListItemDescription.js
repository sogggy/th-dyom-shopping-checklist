import React from 'react'
import { ListItemText, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  description: {
    flexBasis: '33%',
  }
})

export default function ListItemDescription(props) {
  const classes = useStyles()
  const { id, name, price, quantity } = props 
  const descriptionArr = [name, price, quantity]
  return (
    <div className={classes.root}>
      {descriptionArr.map((description, idx) => {
        return (
          <ListItemText key={idx} id={id} primary={description} className={classes.description}/>
        )
      })}
    </div>
  )
}
