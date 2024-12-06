import React from 'react'
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react-pro'
import StyledDropzone from '../setting/StyledDropzone'

const MyCateUpdate = ({ setReFetch }) => {
  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100 position-relative">마이카테 관리</CAccordionHeader>
        <CAccordionBody>
          <CCard className="mt-2">
            <CCardHeader>엑셀 업로드</CCardHeader>
            <CCardBody>
              <StyledDropzone setReFetch={setReFetch} />
            </CCardBody>
          </CCard>
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default MyCateUpdate
