import React from "react"
import { CAccordion } from "@coreui/react-pro"
import WhiteList from "./WhiteList"

const DevSetting = () => {

  return (
    <>
      <CAccordion alwaysOpen activeItemKey={1}>
        <WhiteList />
      </CAccordion>
    </>
  )
}

export default DevSetting