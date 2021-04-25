import React from 'react'
import { IconButton } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export default function DeleteItemButton(props) {
  const { 
    id,
    handleDelete
  } = props
  return (
    <IconButton
      onClick={() => handleDelete(id)}
    >
      <DeleteOutlineIcon />
    </IconButton>
  )
}
