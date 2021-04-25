import React from 'react'
import { ListItemIcon, Checkbox } from '@material-ui/core'

export default function CheckBox() {
  return (
    <ListItemIcon>
      <Checkbox 
        edge="start"
        checked={false}
      />
    </ListItemIcon>
  )
}
