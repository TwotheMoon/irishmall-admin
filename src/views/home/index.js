import React from 'react'
import { CAccordion } from '@coreui/react-pro'
import FindCategory from './FindCategory'
import SearchKeywordTool from './SearchKeywordTool'

const Home = () => {
  return (
    <>
      <CAccordion alwaysOpen activeItemKey={1}>
        <FindCategory />
        <SearchKeywordTool />
      </CAccordion>
    </>
  )
}

export default Home
