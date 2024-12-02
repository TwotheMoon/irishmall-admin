import React, { useEffect, useRef, useState } from "react";
import { 
  CAccordionBody,
  CAccordionHeader, 
  CAccordionItem, 
  CButton, 
  CCard,
  CFormInput,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle} from "@coreui/react-pro";
  import naverIdImgPath from '../../assets/images/naverIdImg.png';

const SearchKeywordTool = () => {
  const loginInputRef = useRef();
  
  const [showModal, setShowModal] = useState(false);
  const [keywordUrl, setKeywordUrl] = useState();
  let newNaverId;

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

  // 키워드 도구 아이프레임 최초 로그인 
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
  return(
    <>
      <CAccordionItem itemKey={1} className='mb-4'>
        <CAccordionHeader className='w-100'>
          키워드 검색 툴
        </CAccordionHeader>
        <CAccordionBody>
          <CCard className='w-100 h-100 mt-4'>
            <div className='w-100 h-100'>
              <iframe 
                src={keywordUrl}
                className='w-100'
                style={{minHeight: '1000px'}}
              ></iframe>
            </div>
          </CCard>
        </CAccordionBody>
      </CAccordionItem>

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

export default SearchKeywordTool