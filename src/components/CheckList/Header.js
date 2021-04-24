import React from 'react'
import { CardHeader } from '@material-ui/core'

export default function Header(props) {
  const { title } = props
  return (
    <CardHeader
      title={title}
    />
  )
}

Header.defaultProps = {
  title: 'My CheckList'
}
