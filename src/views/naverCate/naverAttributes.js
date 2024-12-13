import React from "react";
import { CAccordionBody, CAccordionHeader, CAccordionItem, CCard, CCardBody, CCardHeader } from "@coreui/react-pro";
import NaverDropzone from "./NaverDropzone";

const NaverAttributes = () => {

  return (
    <CAccordionItem itemKey={1} className="mb-4">
      <CAccordionHeader className="w-100 position-relative">속성 유무 확인</CAccordionHeader>
      <CAccordionBody>
      <CCard className="mt-2">
        <CCardHeader>엑셀 업로드</CCardHeader>
        <CCardBody>
          <NaverDropzone />
        </CCardBody>
      </CCard>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default NaverAttributes;

