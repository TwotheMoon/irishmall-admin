import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Setting = React.lazy(() => import('./views/setting/Setting'))
const Nas = React.lazy(() => import('./views/nas/Nas'))

const routes = [
  { path: '/', exact: true, name: '메인', element: Home },
  { path: '/setting', exact: true, name: '설정', element: Setting },
  { path: '/nas', exact: true, name: 'NAS', element: Nas },
]

export default routes
