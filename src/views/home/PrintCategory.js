/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { CFormInput } from '@coreui/react-pro'
import PrintMyCategory from './PrintMyCategory'
import CIcon from '@coreui/icons-react'
import { cilLevelUp } from '@coreui/icons'
import { handleCopy } from '../../utils'
import { useSetRecoilState } from 'recoil'
import { copyAlertAtom } from '../../atom'

const PrintCategory = ({ idx, props }) => {
  const cateNameRef = useRef(null)
  const naverCateRef = useRef(null)
  const [matchingCate, setMatchingCate] = useState()
  const setCopyAlert = useSetRecoilState(copyAlertAtom)

  const handleCopyAlert = () => {
    setCopyAlert(true)
    setTimeout(() => {
      setCopyAlert(false)
    }, 1000)
  }

  useEffect(() => {
    try {
      if (props) {
        const { id, matchingCate, wholeCategoryName } = props
        setMatchingCate(matchingCate)

        if (cateNameRef.current) {
          cateNameRef.current.value = wholeCategoryName || ''
        }
        if (naverCateRef.current) {
          naverCateRef.current.value = id || ''
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [props])

  return (
    <div className="mb-4">
      <div className="mb-2 d-flex justify-content-between">
        <div>{idx + 1}. 추천 카테고리</div>
        <div style={{ minWidth: '150px', textAlign: 'center' }}>네이버 카테고리</div>
      </div>
      <div className="d-flex w-100 gap-3 mb-2">
        <CFormInput
          ref={cateNameRef}
          type="text"
          size="sm"
          style={{
            borderColor: '#323a49',
            transition: 'border-color 0.15s ease--in-out',
          }}
          readOnly
        />
        <CFormInput
          ref={naverCateRef}
          onClick={() => {
            handleCopy(naverCateRef)
            handleCopyAlert()
            cateNameRef.current.style.borderColor = '#6261cc'
          }}
          onBlur={() => {
            cateNameRef.current.style.borderColor = '#323a49'
          }}
          style={{ minWidth: '100px', maxWidth: '150px', cursor: 'pointer', textAlign: 'center' }}
          className="bg-secondary"
          type="text"
          size="sm"
          readOnly
        />
      </div>
      <div>
        <div className="mb-1 mt-3 d-flex justify-content-between">
          <CIcon
            icon={cilLevelUp}
            style={{ marginLeft: '10px', width: '25px', height: '30px', rotate: '90deg' }}
          />
          <div style={{ minWidth: '150px', textAlign: 'center' }}>마이 카테고리</div>
        </div>
        {matchingCate?.map((data, idx) => {
          return (
            <React.Fragment key={`${matchingCate.naverCate}${idx}`}>
              <PrintMyCategory idx={idx} props={data}></PrintMyCategory>
            </React.Fragment>
          )
        })}
      </div>
      <hr className="mt-4" />
    </div>
  )
}

export default PrintCategory
