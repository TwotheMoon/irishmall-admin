import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          MoonDal
        </a>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://smartstore.naver.com/kunstay" target="_blank" rel="noopener noreferrer">
          Irishmall Admin &amp; Dashboard
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
