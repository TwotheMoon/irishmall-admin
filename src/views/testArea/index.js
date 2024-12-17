import React from 'react'
import axios from 'axios';
import { CButton } from '@coreui/react-pro'

const TestArea = () => {

  const testFn  = async () => {
    const res = await axios.post(`http://localhost:4000/test`);
    console.log(res.data)
  }

  return (
    <div>
      <CButton color="primary" onClick={testFn}>테스트</CButton>
    </div>
  )
}

export default TestArea 