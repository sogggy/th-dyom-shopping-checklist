import React from 'react'
import { ListItem, ListItemSecondaryAction, Divider } from '@material-ui/core'
import DeleteItemButton from './DeleteItemButton'
import ListItemDescription from './ListItemDescription'
import ItemsTableHeader from './ItemsTableHeader'

export default function ItemsCheckList(props) {
  const { items: shoppingListItems } = props
  
  return (
  <React.Fragment>
    <ItemsTableHeader />
    {
      //items table info
      shoppingListItems.map((item) => {
        const { id } = item
        return(
          <div key={id}>
            <ListItem
              button
              // onClick={handleToggle(index)}
            >
              <ListItemDescription 
                {...item}
              />
              <ListItemSecondaryAction>
                <DeleteItemButton {...item} {...props}/>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        )
      })
    }
  </React.Fragment>
  )
}
