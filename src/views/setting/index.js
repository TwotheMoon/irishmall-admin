import React from 'react'
import { CAccordion } from '@coreui/react-pro'
import LinkList from './LinkList'

const Setting = () => {
  return (
    <>
      <CAccordion alwaysOpen activeItemKey={1}>
        <LinkList />
      </CAccordion>
    </>
  )
}

export default Setting
