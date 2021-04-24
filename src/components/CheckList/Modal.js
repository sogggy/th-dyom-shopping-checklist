import React from 'react'
import { Container, Card } from '@material-ui/core'

export default function Modal({children}) {
  return (
    <Container maxWidth='lg'>
      <Card>
        {children}
      </Card>
    </Container>
  )
}
