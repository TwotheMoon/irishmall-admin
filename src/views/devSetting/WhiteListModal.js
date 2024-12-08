import React from 'react'
import {
  CButton,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'

const WhiteListModal = ({
  visible,
  title,
  inputValues,
  onInputChange,
  onConfirm,
  onClose,
}) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormLabel htmlFor="whitelistInputDomain">도메인</CFormLabel>
          <CFormInput
            type="text"
            id="whitelistInputDomain"
            placeholder="https://example.com"
            value={inputValues?.domain || ''}
            onChange={(e) => onInputChange('domain', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="whitelistDesc">설명</CFormLabel>
          <CFormInput
            type="text"
            id="whitelistDesc"
            placeholder="설명입력"
            value={inputValues?.desc || ''}
            onChange={(e) => onInputChange('desc', e.target.value)}
          />
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          취소
        </CButton>
        <CButton color="primary" onClick={onConfirm}>
          확인
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default WhiteListModal 