import React from "react";
import axios from "axios";
import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCard, CCardBody, CCardHeader } from "@coreui/react-pro";
import { isLocalAtom } from "../../atom";
import { useRecoilValue } from "recoil";
import { apiServerBaseUrl, localServerBaseUrl } from "../../api";
import StyledDropzone from "./StyledDropzone";

const NaverAttributes = () => {
  const isLocal = useRecoilValue(isLocalAtom)

  const testFn = async () => {
    try {
      await ( await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${"/attrTest3"}`) )
    } catch (error) {console.log(error)}
  };

  return (
    <CAccordionItem itemKey={1} className="mb-4">
      <CAccordionHeader className="w-100 position-relative">속성 유무 확인</CAccordionHeader>
      <CAccordionBody>
      <CCard className="mt-2">
        <CCardHeader>엑셀 업로드</CCardHeader>
        <CCardBody>
          <StyledDropzone />
        </CCardBody>
      </CCard>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default NaverAttributes;

