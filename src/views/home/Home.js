/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import naverIdImgPath from '../../assets/images/naverIdImg.png';

const Home = () => {
  const txArea1Ref = useRef();
  const txArea2Ref = useRef();
  const loginInputRef = useRef();
  const [txBoxSize] = useState(200);
  const [showAlert, setShowAlert] = useState(false);
  const [showDupAlert, setShowDupAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [keywordUrl, setKeywordUrl] = useState();
  const [duplicateWordCount, setDuplicateWordCount] = useState(0);
  const [duplicateState, setDuplicateState] = useState(false);
  let newNaverId;

  // 키워드 변환 정규식
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

  // 변환된 키워드 복사
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
  };

  // 네이버 광고 아이디 입력
  const setNaverId = () => {
    if(!loginInputRef.current.value){
      alert("ID 번호를 입력해주세요.");
    } else {
      newNaverId = loginInputRef.current.value;
      localStorage.setItem('naverId', newNaverId);    
      alert("로그인 되었습니다.");
      window.location.reload();
    }
  };

  // 키워드 중복 검사
  const checkDuplicate = () => {
    let separatorType;
    let words;
    if(!txArea1Ref.current.value) return;

    if(txArea1Ref.current.value.includes("\n")){
      separatorType = "\n";
      words = txArea1Ref.current.value.split("\n").map(word => word.trim())
    } else if (txArea1Ref.current.value.includes(",")){
      separatorType = ",";
      words = txArea1Ref.current.value.split(",").map(word => word.trim())
    }

    const seen = new Set();
    const duplicateWords = new Set();

    if(!words) return;

    words.forEach(word => {
      if(seen.has(word)) {
        duplicateWords.add(word);
      } else {
        seen.add(word);
      }
    });

      if(!duplicateWords || duplicateWords.size == 0){
        setDuplicateState(false);
        setShowDupAlert(true);
        setTimeout(() => {
          setShowDupAlert(false);
        }, 1500);
      } else {
        setDuplicateState(true);
        setDuplicateWordCount(duplicateWords.size);
        setShowDupAlert(true);

        setTimeout(() => {
          setShowDupAlert(false);
        }, 1500);

        if(separatorType == "\n"){
          txArea1Ref.current.value = Array.from(seen).join("\n");
        } else if(separatorType == ","){
          txArea1Ref.current.value = Array.from(seen).join(",");
        }
      }

      seen.clear();
      duplicateWords.clear();
  };

  useEffect(() => {
    let naverId;
    naverId = localStorage.getItem("naverId");
    if(!naverId || naverId == null){
      setShowModal(true);
    } else {
      const createUrl = `https://manage.searchad.naver.com/customers/${naverId}/tool/keyword-planner`
      setKeywordUrl(createUrl);
    }
  });

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
          <CAlert 
            color={duplicateState ? "success" : "primary"}
            className='position-absolute top-0 start-0'
            dismissible 
            visible={showDupAlert} 
            onClose={() => setShowDupAlert(false)}
            >
              {duplicateState ? `총 ${duplicateWordCount}개의 중복된 키워드를 삭제했습니다.` : "중복된 키워드가 없습니다."}
          </CAlert>
        </CCardHeader>
        <CCardBody>
          <CForm className='d-flex justify-content-center align-items-center'>
            <div className="mb-3 w-100">
              <CFormLabel htmlFor="textArea1">키워드 입력 &nbsp; <CButton color="primary" onClick={() => checkDuplicate()}>중복 키워드 제거</CButton> </CFormLabel>
              <CFormTextarea 
                id="textArea1" 
                ref={txArea1Ref}
                style={{minHeight: txBoxSize, height: 'auto', resize:"none"}} 
              >  
              </CFormTextarea>
              <div>
                {/* {highlightDuplicates(txArea1Ref.current.value)} */}
              </div>
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
      
      {/* 키워드 검색 툴 */}
      <CCard className='w-100 h-100 mt-4'>
       <div className='w-100 h-100'>
          <iframe 
            src={keywordUrl}
            className='w-100'
            style={{minHeight: '1000px'}}
          ></iframe>
        </div>
      </CCard>

      {/* 네이버 아이디 모달 */}
      <CModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <CModalHeader>
          <CModalTitle>로그인</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>네이버 광고 아이디를 입력해 주세요.</p>
          <img 
            src={naverIdImgPath}
            className='w-100 mb-4'
          >
          </img>
          <CInputGroup className="mb-3">
          <CFormInput placeholder="ID 번호 입력" aria-label="UserId" aria-describedby="basic-addon1" ref={loginInputRef} required/>
        </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>닫기</CButton>
          <CButton color="primary" onClick={() => setNaverId()}>확인</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Home
