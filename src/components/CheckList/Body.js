import React from 'react'
import { CardContent, Typography } from '@material-ui/core'
import ItemList from '../ItemList'

export default function Body() {
  return (
    <CardContent>
      <Typography variant="h5">
        Hello
      </Typography>
      <ItemList />
    </CardContent>
  )
}
