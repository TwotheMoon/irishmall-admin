import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import kunstayLogo from '../assets/images/kunstayLogo.png'
import {
  CBadge,
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react-pro'
import { AppSidebarNav } from './AppSidebarNav'
import { isLocalAtom, sidebarShowAtom, sidebarUnfoldableAtom } from '../atom'
import navigation from '../_nav'

const AppSidebar = () => {
  const [isLocal] = useRecoilState(isLocalAtom)
  const [unfoldable, setUnfoldable] = useRecoilState(sidebarUnfoldableAtom)
  const [sidebarShow, setSidebarShow] = useRecoilState(sidebarShowAtom)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        setSidebarShow(visible)
      }}
    >
      <CSidebarHeader className="border-bottom justify-content-center ">
        <CSidebarBrand as={NavLink} to="/">
          <img src={kunstayLogo} />
          {isLocal && (
            <CBadge as={NavLink} to="/testArea" color="danger" style={{ display: 'absolute', top: '10px', right: '10px', cursor: 'pointer', zIndex: '9999' }} shape="rounded-pill">
              DevMode
            </CBadge>
          )}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => setSidebarShow(false)}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => setUnfoldable(!unfoldable)}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default AppSidebar
