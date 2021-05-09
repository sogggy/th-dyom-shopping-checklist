import { Alert } from '@material-ui/lab';
import { Button, Collapse, IconButton, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: '10%',
    left: '40%',
    margin: '-70px 0 0 0',
  }
}))

export default function CheckoutButton() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const handleCheckout = () => {
    setIsOpen(true)
    setTimeout(() => setIsOpen(false), 3000)
  }

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleCheckout}
      >
        Checkout
      </Button>
      {
        isOpen && (
          <Alert
            className={classes.root}
            action={
              <IconButton
                size="small"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Checkout Summary - Total Price: $19.90
          </Alert>
        )
      }
    </>
  )
}
