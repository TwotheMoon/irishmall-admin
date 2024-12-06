import React from 'react'
import { CAccordion } from '@coreui/react-pro';
import LinkList from './LinkList';
import DbSetting from './DbSetting';

const Setting = () => {
  

  return (
    <>
    <CAccordion alwaysOpen activeItemKey={1}>
      <LinkList />
      <DbSetting />
    </CAccordion>
    </>
  )
}

export default Setting
