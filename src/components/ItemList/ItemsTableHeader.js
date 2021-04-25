import React from 'react'
import { ListItem, Divider} from '@material-ui/core'
import ListItemDescription from './ListItemDescription'

export default function ItemsTableHeader() {
  const headerInfo = {
    name: 'Name',
    price: 'Price',
    quantity: 'Quantity',
  }

  return (
    <>
      <ListItem
        button
        // onClick={handleToggle(index)}
      >
        <ListItemDescription 
          {...headerInfo}
        />
      </ListItem>
      <Divider />
    </>
  )
}
