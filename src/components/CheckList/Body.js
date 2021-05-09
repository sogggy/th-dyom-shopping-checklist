import React from 'react'
import { CardContent } from '@material-ui/core'
import ItemList from '../ItemList'
import AddItemForm from '../AddItemForm'

export default function Body() {
  return (
    <CardContent>
      <AddItemForm />
      <ItemList />
    </CardContent>
  )
}
