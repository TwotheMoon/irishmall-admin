import { CAccordion } from "@coreui/react-pro";
import React from "react";
import NaverAttributes from "./naverAttributes";
import DbSetting from "./DbSetting";

const NaverCate = () => {
  return (<>
    <CAccordion alwaysOpen activeItemKey={1}>
      <NaverAttributes />
      <DbSetting />
    </CAccordion>
  </>);
};

export default NaverCate;
