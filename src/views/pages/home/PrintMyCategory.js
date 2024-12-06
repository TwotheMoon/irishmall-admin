/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import { CFormInput } from '@coreui/react-pro'
import { copyAlertAtom } from '../../../atom'
import { handleCopy } from '../../../utils'
import { useSetRecoilState } from 'recoil'

const PrintMyCategory = ({ idx, props }) => {
  const myCateNameRef = useRef(null)
  const myCateRef = useRef(null)
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
        const { cateName, myCate } = props

        if (myCateNameRef.current) {
          myCateNameRef.current.value = cateName || ''
        }
        if (myCateRef.current) {
          myCateRef.current.value = myCate || ''
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [props])

  return (
    <>
      <div className="d-flex w-100 gap-3 mb-2">
        <div style={{ width: '30px' }}></div>
        <div>{idx + 1}.</div>
        <CFormInput
          ref={myCateNameRef}
          type="text"
          size="sm"
          style={{
            borderColor: '#323a49',
            transition: 'border-color 0.15s ease--in-out',
          }}
          readOnly
        />
        <CFormInput
          ref={myCateRef}
          style={{ minWidth: '100px', maxWidth: '150px', cursor: 'pointer', textAlign: 'center' }}
          className="bg-secondary"
          onClick={() => {
            handleCopy(myCateRef)
            handleCopyAlert()
            myCateNameRef.current.style.borderColor = '#249542'
          }}
          onBlur={() => {
            myCateNameRef.current.style.borderColor = '#323a49'
          }}
          type="text"
          size="sm"
          readOnly
        />
      </div>
    </>
  )
}

export default PrintMyCategory
