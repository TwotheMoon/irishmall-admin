import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useRecoilValue } from 'recoil'
import { isLoadingAtom } from '../atom'
import { CSpinner } from '@coreui/react-pro'

const DefaultLayout = () => {
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <div>
      {isLoading ? 
        <div style={{width: "100%", height: "100%", position:"fixed", backgroundColor:"rgba(0, 0, 0, 0.4)", zIndex: 9998}}>
          <CSpinner color="success" style={{width: "50px", height:"50px", position:"fixed", top: "45%", left:"45%", zIndex: 9999}} />
        </div>
        :
        null
      }
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
