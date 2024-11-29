import React from 'react'
import { CAccordion } from '@coreui/react';
import CateSetting from './CateSetting';
import LinkList from './LinkList';
import DevSetting from './devSetting';

const Setting = () => {
  

  return (
    <>
    <CAccordion alwaysOpen activeItemKey={1}>
      <CateSetting />
      <LinkList />
      <DevSetting />
    </CAccordion>
    </>
  )
}

export default Setting
