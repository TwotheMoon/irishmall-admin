import React from 'react'
import { zepOfficeUrl } from "../../api"
import { useRecoilValue } from 'recoil'
import { sidebarShowAtom } from '../../atom'

export const Office = () => {
  const sidebarShow = useRecoilValue(sidebarShowAtom)

  return (
    <div style={{ 
      height: 'calc(100vh - 113px)', 
      width: '100%', 
      position: 'fixed', 
      top: '113px', 
      left: sidebarShow ? '255px' : '0',
      transition: 'left 0.3s',
      width: sidebarShow ? 'calc(100% - 255px)' : '100%'
    }}>
      <iframe 
        src={zepOfficeUrl} 
        title="Admin" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="camera; microphone; display-capture"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  )
}

export default Office