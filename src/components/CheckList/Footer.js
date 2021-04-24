import React from 'react'
import { CardActions } from '@material-ui/core'
import CheckoutButton from '../CheckoutButton'

export default function Footer() {
  return (
    <CardActions>
      <CheckoutButton />
    </CardActions>
  )
}
