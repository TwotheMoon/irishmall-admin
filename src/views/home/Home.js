/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'

const Home = () => {
  const txArea1Ref = useRef();
  const txArea2Ref = useRef();
  const [txBoxSize] = useState(550);
  const [showAlert, setShowAlert] = useState(false);

  
  const Conversion = () => {
    const keywords = txArea1Ref.current.value;
    const conversionedWords = keywords
    .replace(/\n/g, ',')
    .replace(/\s+/g, '')
    .replace(/^,|,$/g, '')
    .replace(/,+/g, ',')
    .replace(/(,)(?=\s*,)/g, ',')
    .replace(/,\s*$/, '');   
    
    txArea2Ref.current.value = conversionedWords;
  }

  const handleTextAreaClick = () => {
    if (txArea2Ref.current && txArea2Ref.current.value !== "") {
      txArea2Ref.current.select();

      document.execCommand('copy');

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    }
  };

  const reset = () => {
    txArea1Ref.current.value = "";
    txArea2Ref.current.value = "";
  }

  return (
    <>
      <CCard className="mb-4 d-flex align-item-center justify-contents-center" >
        <CCardHeader className='position-relative'>
          쉼표 변환기
          <CAlert 
          color="primary"
          className='position-absolute top-0 end-0'
          dismissible 
          visible={showAlert} 
          onClose={() => setShowAlert(false)}
          >
            복사되었습니다.
        </CAlert>
        </CCardHeader>
        <CCardBody>
          <CForm className='d-flex justify-content-center align-items-center'>
            <div className="mb-3 w-100">
              <CFormLabel htmlFor="textArea1">키워드 입력</CFormLabel>
              <CFormTextarea 
                id="textArea1" 
                ref={txArea1Ref}
                style={{minHeight: txBoxSize, height: 'auto', resize:"none"}} 
              >  
              </CFormTextarea>
            </div>
              <div className='px-3 d-flex flex-column gap-4'>
                <CButton as="input" type="button" color="primary" value="변환" onClick={Conversion} />
                <CButton as="input" type="button" color="secondary" value="초기화" onClick={reset} />
              </div>
            <div className="mb-3 w-100">
              <CFormLabel htmlFor="textArea2">변환된 키워드</CFormLabel>
              <CFormTextarea 
                id="textArea2"
                ref={txArea2Ref} 
                readOnly
                style={{minHeight: txBoxSize, height: 'auto', resize:"none"}}
                onClick={handleTextAreaClick}
              >
              </CFormTextarea>
            </div>
          </CForm>
        </CCardBody>
        
      </CCard>
    </>
  )
}

export default Home
