import React from 'react'
import CheckListModal from './Modal'
import CheckListHeader from './Header'
import CheckListBody from './Body'
import CheckListFooter from './Footer'

export default function CheckList() {
  return (
    <CheckListModal>
      <CheckListHeader />
      <CheckListBody />
      <CheckListFooter />
    </CheckListModal>
  )
}
