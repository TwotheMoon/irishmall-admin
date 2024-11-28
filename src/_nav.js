import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCog,
  cilHome,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: '메인',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Tools',
  },
  {
    component: CNavItem,
    name: '설정',
    to: '/setting',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
  },
]

export default _nav
