import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useRecoilValue } from 'recoil'
import { isLoadingAtom, showModalAtom } from '../atom'
import { CSpinner } from '@coreui/react-pro'
import { CommonModal } from './Modal'

const DefaultLayout = () => {
  const isLoading = useRecoilValue(isLoadingAtom);
  const showModal = useRecoilValue(showModalAtom);


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

          {/* 모달 */}
          {showModal?.type === "default" || showModal?.type === "error" ? 
            <CommonModal /> : null
          }
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
