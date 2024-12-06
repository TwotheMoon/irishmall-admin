import React from 'react'
import { useRecoilState } from 'recoil'
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
import { commonCloseModal } from '../utils'
import { showModalAtom } from '../atom'

// 공통 모달
/* 모달 내의 input 값이 필요한 경우 CommonModal 해당 페이지 직접 호출 및 매개변수를 통해 값전달, 함수실행 */
/* 이외의 단순 confirm 모달의 경우 modalType default, error 사용 */
export const CommonModal = ({ inputValues, onInputChange, onConfirm }) => {
  const [showModal, setShowModal] = useRecoilState(showModalAtom)
  const modalType = showModal?.type

  return (
    <CModal
      alignment="center"
      visible={showModal.visible}
      onClose={() => commonCloseModal(setShowModal)}
    >
      <CModalHeader>
        <CModalTitle>{showModal?.title}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        {modalType === 'default' && showModal?.desc}
        {modalType === 'error' && `오류: ${showModal?.desc}`}
        {modalType === 'whitelist' && (
          <>
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
          </>
        )}
      </CModalBody>

      <CModalFooter>
        {showModal.isCancelVisible ? (
          <CButton color="secondary" onClick={() => commonCloseModal(setShowModal)}>
            취소
          </CButton>
        ) : null}
        <CButton
          color="primary"
          onClick={
            modalType === 'default' || modalType === 'error' ? showModal.onClick : () => onConfirm()
          }
        >
          확인
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
