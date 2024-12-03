import React, { useRef, useState } from "react";
import axios from 'axios';
import { 
  CAccordionBody,
  CAccordionHeader, 
  CAccordionItem, 
  CAlert, 
  CButton, 
  CFormInput, 
  CSpinner} from "@coreui/react-pro";
import PrintCategory from "./PrintCategory";
import { apiServerBaseUrl, getPopularCateApiEP, localServerBaseUrl } from '../../api';
import { copyAlertAtom, isLocalAtom, showModalAtom } from "../../atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { commonErrorModal } from "../../utils";

const FindCategory = () => {
  const searchInputRef = useRef();

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchCateData, setSearchCateData] = useState();
  const [copyAlert, setCopyAlert] = useRecoilState(copyAlertAtom);
  const isLocal = useRecoilValue(isLocalAtom);
  const setShowModal = useSetRecoilState(showModalAtom);

   // 상품 카테고리코드 조회
   const getPopularCate = async (e) => {
    e.stopPropagation();
    setIsSearchLoading(true);
    setSearchCateData("");

    const keyword = searchInputRef.current.value;

    if(!keyword) {
      setSearchCateData("");
      setIsSearchLoading(false);
      return;
    }

    try {
        const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${getPopularCateApiEP}`, {
        data: keyword
      });
      setSearchCateData(res.data.data);
      setIsSearchLoading(false);

    } catch (error) {
      console.log(error);
      commonErrorModal(() => {}, setShowModal, error);
      setIsSearchLoading(false);
    }
  };

  return(
    <>
      <CAccordionItem itemKey={1} className='mb-4'>
        <CAccordionHeader className='w-100'>
          <div className='position-relative d-flex justify-content-between w-100'>
            카테고리 찾기
            <div className='d-flex w-100 gap-3' style={{maxWidth: "400px", alignItems:"center", justifyContent:"center"}}>
              {isSearchLoading ? 
                <CSpinner color="primary" style={{minWidth: "20px", minHeight: "20px", maxWidth: "20px", maxHeight: "20px"}} />
                :
                <div style={{width:"33px"}}></div>
              }
              <CFormInput 
                ref={searchInputRef} 
                style={{zIndex: 9999}} 
                type="text" size="sm" 
                placeholder="키워드 입력" 
                onClick={(e) => e.stopPropagation()} 
                onKeyUp={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if(e.key === "Enter") {
                    getPopularCate(e);
                  }
                }}
              />
              <CButton 
                style={{maxHeight: "30px", paddingTop: "2px", minWidth: "80px", marginRight: "20px" }} 
                as="input" 
                type="button" 
                color="primary" 
                value="검색" 
                onClick={(e) => getPopularCate(e)} 
              />
            </div>
          </div>
       </CAccordionHeader>
       <CAccordionBody>
        <div>
          {searchCateData && searchCateData.length > 0 ?
            searchCateData.map((data, idx) => {
              return(
                <React.Fragment key={`${data.id}${idx}`}>
                  <PrintCategory
                    idx={idx}
                    props={data} 
                    >
                  </PrintCategory>
                </React.Fragment>
              )
            })
            :
            <div className='w-100m text-center'>키워드를 입력해주세요.</div>
          }
        </div>
       </CAccordionBody>
      </CAccordionItem>

      <CAlert 
        color="primary"
        className='position-fixed'
        style={{top: "120px", left:"50%", zIndex: 9999}}
        dismissible 
        visible={copyAlert} 
        onClose={() => setCopyAlert(false)}
        >
          복사되었습니다.
      </CAlert>
    </>
  )
}

export default FindCategory