import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { TextField } from '@material-ui/core'
import { addItem } from '../../services'

export default function AddItemForm() {
  const [isHidden, setIsHidden] = useState(true)

  const handleExpandOrMinimizeAddItemForm = () => {
    setIsHidden(!isHidden)
  }

  const handleAddItem = async(event) => {
    event.preventDefault()
    const res = await addItem()
  }

  return (
    <>
    {
      isHidden && 
      (
        <div>
          <Button onClick={handleExpandOrMinimizeAddItemForm}>
            Add Item
            <ExpandMoreIcon />
          </Button>
        </div>
      )
    }
    { !isHidden &&
      <div>
        <form>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <TextField id='outlined-basic' label='Name'/>
                <TextField id='outlined-basic' label='Price'/>
                <TextField id='outlined-basic' label='Quantity'/>
              </div>
            </div>
          <div style={{display: 'flex', justifyContent: 'space-between', margin: 20}}>
            <div>
              <Button onClick={event => handleAddItem(event)} type="submit">
                Submit
              </Button>
            </div>
            <div>
              <Button onClick={handleExpandOrMinimizeAddItemForm}>
                Close
                <ExpandLessIcon />
              </Button>
            </div>
          </div>
        </form>
      </div>
    }
    </>
  )
}
