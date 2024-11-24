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
import { apiServerBaseUrl, getAllCateApiEP, getPopularCateApiEP, getTokenApiEP, healthCkEP, jsonAxios, localServerBaseUrl, naverApiShopUrl, naverProxyNm, openApiUrl } from '../../api';
import axios from 'axios';
import { getPopularCategories } from '../../utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allCateAtom, isLocalAtom, tokenAtom } from '../../atom';

const Home = () => {
  const txArea1Ref = useRef();
  const txArea2Ref = useRef();
  const loginInputRef = useRef();
  const searchInputRef = useRef();
  const topNCateNameRefs = Array.from({ length: 3 }, () => useRef(null));
  const topNCateIdRefs = Array.from({ length: 3 }, () => useRef(null));

  const [txBoxSize] = useState(200);
  const [showAlert, setShowAlert] = useState(false);
  const [showCateCopy, setShowCateCopy] = useState(false);
  const [showDupAlert, setShowDupAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [keywordUrl, setKeywordUrl] = useState();
  const [duplicateWordCount, setDuplicateWordCount] = useState(0);
  const [duplicateState, setDuplicateState] = useState(false);
  let newNaverId;

  const isLocal = useRecoilValue(isLocalAtom);
  const [accessToken, setAccessToken] = useRecoilState(tokenAtom);
  const [allCate, setAllCate] = useRecoilState(allCateAtom);  

  // 키워드 변환 정규식
  const conversion = () => {
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

  // 상품 카테고리코드 조회 ***
  const getCateNm = async (keyword) => {
    if(!keyword) return;

    try {
        const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${getPopularCateApiEP}`, {
        data: keyword
      });

      const productsArr = res.data.items;
      const popularCate = getPopularCategories(productsArr);

      for(let i = 0; i <= popularCate.length; i++){
        if(popularCate[i] != false){
          let findedCateId = allCate.filter(item => item.wholeCategoryName.includes(popularCate[i]))[0].id;

          topNCateNameRefs[i].current.value = popularCate[i];
          topNCateIdRefs[i].current.value = findedCateId;
        } else {
          topNCateNameRefs[i].current.value = "";
          topNCateIdRefs[i].current.value = "";
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  // 서버 상태 확인
  const serverHealthCk = async () => {
    try {
      const res = await axios.get(`${ isLocal ? localServerBaseUrl : apiServerBaseUrl }${healthCkEP}`);
      return res.data.status;
    } catch (error) {}
  }

  // OAth 인증토큰 발급
  const getTokenApi = async () => {
    try {
      const res = await axios.post(`${ isLocal ? localServerBaseUrl : apiServerBaseUrl }${getTokenApiEP}`);
      console.log(res.data.access_token);
      setAccessToken(res.data.access_token);
      
      return res.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  // 전체 카테고리 호출
  const getAllCate = async (firstAccessToken) => {
    let token;
    if(!accessToken && !firstAccessToken) {
      await getTokenApi();
      return await getAllCate(true);
    } else if(accessToken && !firstAccessToken){
      token = accessToken;
    } else if (!accessToken && firstAccessToken){
      token = firstAccessToken;
    }

    try {
      const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl }${getAllCateApiEP}`,{
          data: token
      });

      console.log("allCate", res.data);
      setAllCate(res.data);
    } catch (error) {
        console.log(error);      
    }
  };

  // 상위 키워드 검색
  const getPopularCate = (ref) => {
      const keyword = searchInputRef.current.value;
      getCateNm(keyword);
    };

  const showCateCopyAlert = (ref) => {
    try {
      if (ref.current && ref.current.value !== "") {
        ref.current.select();
        
        document.execCommand('copy');
        
        setShowCateCopy(true);
        setTimeout(() => {
          setShowCateCopy(false);
        }, 1500);
      }
      
    } catch (error) {
      console.log(error);      
    }
  }

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

  // 최초 토큰 발급, 전체 카테고리 저장
  useEffect(() => {
    const getData = async () => {
      await getTokenApi().then( async (res) => {
        await getAllCate(res)
      })
    };
    
    // 서버 상태확인
    (async () => {
      await serverHealthCk().then((status) => {
        if(status){
          console.log("Server is running :)")
           getData();
        } else {
          console.log("Server has problem :(")
        }
      })
    })();
  }, []);  

  return (
    <>
    <CCard className="mb-4 d-flex align-item-center justify-contents-center" >
      <CCardHeader className='position-relative d-flex justify-content-between'>
        카테고리 찾기
        <div className='d-flex w-100 gap-3' style={{maxWidth: "400px"}}>
          <CFormInput ref={searchInputRef} type="text" size="sm" placeholder="키워드 입력"/>
          <CButton style={{maxHeight: "30px", paddingTop: "2px", minWidth: "80px" }} as="input" type="button" color="primary" value="검색" onClick={() => getPopularCate()} />
        </div>
        <CAlert 
          color="primary"
          className='position-absolute end-0'
          style={{top: "-70px", zIndex: 9999}}
          dismissible 
          visible={showCateCopy} 
          onClose={() => setShowCateCopy(false)}
          >
            복사되었습니다.
        </CAlert>
      </CCardHeader>
      <CCardBody className='position-relative'>
        <div>
          <div className='d-flex w-100 gap-3 mb-2'>
            <CFormInput ref={topNCateNameRefs[0]} type="text" size="sm" placeholder="상위노출 카테고리 1" readOnly/>
            <CFormInput ref={topNCateIdRefs[0]} onClick={() => showCateCopyAlert(topNCateIdRefs[0])} style={{minWidth: "100px", maxWidth: "150px", cursor:"pointer", textAlign:"center"}} className='bg-secondary' type="text" size="sm" readOnly />
          </div>
          <div className='d-flex w-100 gap-3 mb-2'>
            <CFormInput ref={topNCateNameRefs[1]} type="text" size="sm" placeholder="상위노출 카테고리 2" readOnly/>
            <CFormInput ref={topNCateIdRefs[1]} onClick={() => showCateCopyAlert(topNCateIdRefs[1])} style={{minWidth: "100px", maxWidth: "150px", cursor:"pointer", textAlign:"center" }} className='bg-secondary' type="text" size="sm" readOnly />
          </div>
          <div className='d-flex w-100 gap-3'>
            <CFormInput ref={topNCateNameRefs[2]} type="text" size="sm" placeholder="상위노출 카테고리 3" readOnly/>
            <CFormInput ref={topNCateIdRefs[2]} onClick={() => showCateCopyAlert(topNCateIdRefs[2])} style={{minWidth: "100px", maxWidth: "150px", cursor:"pointer", textAlign:"center"}} className='bg-secondary' type="text" size="sm" readOnly />
          </div>
        </div>
      </CCardBody>
    </CCard>
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
              <CFormLabel htmlFor="textArea1">
                키워드 입력 &nbsp; 
                <CButton color="primary" onClick={() => checkDuplicate()}>중복 키워드 제거</CButton> 
                <CButton color="primary" onClick={() => getCateNm()}>서버테스트</CButton> 
              </CFormLabel>
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
                <CButton as="input" type="button" color="primary" value="변환" onClick={conversion} />
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
