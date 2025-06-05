import React from 'react'
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

  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100">키워드 도구</CAccordionHeader>
        <CAccordionBody>
          
        <CTabs activeItemKey="searchKeywordTab">
          <CTabList variant="tabs">
            <CTab itemKey="searchKeywordTab">키워드</CTab>
            <CTab itemKey="searchNaverTagTab">네이버태그</CTab>
          </CTabList>

          <CTabContent>
          {/* 키워드 검색 탭 */}
            <CTabPanel className="p-3" itemKey="searchKeywordTab">
              <SearchKeywordToolTab />
            </CTabPanel>

            {/* 네이버 태그 탭 */}
            <CTabPanel className="p-3" itemKey="searchNaverTagTab">
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
