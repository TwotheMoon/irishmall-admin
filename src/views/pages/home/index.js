import React, { useEffect } from 'react'
import { CAccordion } from '@coreui/react-pro'
import FindCategory from './FindCategory'
import CommaConversion from './CommaConversion'
import SearchKeywordTool from './SearchKeywordTool'

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log('와치타워 실행')
    }, 2000)
  }, [])

  return (
    <>
      <CAccordion alwaysOpen activeItemKey={1}>
        <FindCategory />
        <CommaConversion />
        <SearchKeywordTool />
      </CAccordion>
    </>
  )
}

export default Home
