import React from 'react'
import { CAccordion } from '@coreui/react-pro'
import WhiteList from './WhiteList'
import NasLog from './NasLog'

const DevSetting = () => {
  return (
    <>
      <CAccordion alwaysOpen activeItemKey={1}>
        <WhiteList />
        <NasLog />
      </CAccordion>
    </>
  )
}

export default DevSetting
