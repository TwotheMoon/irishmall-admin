import React, { useState } from 'react'
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import SearchKeywordToolTab from './SearchKeywordToolTab'
import SearchNaverTagTab from './SearchNaverTagsTab'

const SearchKeywordTool = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100">키워드 도구</CAccordionHeader>
        <CAccordionBody>
          
        <CTabs activeItemKey={activeTab} onChange={setActiveTab} defaultActiveItemKey={1} >
          <CTabList variant="tabs">
            <CTab itemKey={1}>키워드</CTab>
            <CTab itemKey={2}>네이버태그</CTab>
          </CTabList>

          <CTabContent>
          {/* 키워드 검색 탭 */}
            <CTabPanel className="p-3" itemKey={1}>
              <SearchKeywordToolTab />
            </CTabPanel>

            {/* 네이버 태그 탭 */}
            <CTabPanel className="p-3" itemKey={2}>
              <SearchNaverTagTab />           
            </CTabPanel>
          </CTabContent>
        </CTabs>
          
        </CAccordionBody>
      </CAccordionItem>

    </>
  )
}

export default SearchKeywordTool
