import React, { useState } from 'react'
import MyCateUpdate from './MyCateUpdate'
import { CAccordion } from '@coreui/react-pro'
import MyCateTable from './MyCateTable'

const MyCate = () => {
  const [reFetch, setReFetch] = useState('')

  return (
    <>
      <CAccordion alwaysOpen activeItemKey={1}>
        <MyCateUpdate setReFetch={setReFetch} />
        <MyCateTable reFetch={reFetch} />
      </CAccordion>
    </>
  )
}

export default MyCate
