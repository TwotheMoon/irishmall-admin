import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Setting = React.lazy(() => import('./views/setting/index'))
const DevSetting = React.lazy(() => import('./views/devSetting/index'))

const routes = [
  { path: '/', exact: true, name: '메인', element: Home },
  { path: '/setting', exact: true, name: '설정', element: Setting },
  { path: '/devSetting', exact: true, name: '개발자설정', element: DevSetting },
]


export default routes
