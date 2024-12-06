import React from 'react'

const Home = React.lazy(() => import('./views/pages/home/index'))
const MyCate = React.lazy(() => import('./views/pages/myCate/index'))
const FullCalendarPlugin = React.lazy(() => import('./views/pages/calendar/index'))
const Setting = React.lazy(() => import('./views/pages/setting/index'))
const DevSetting = React.lazy(() => import('./views/pages/devSetting/index'))

const routes = [
  { path: '/', exact: true, name: '메인', element: Home },
  { path: '/myCate', exact: true, name: '마이카테', element: MyCate },
  { path: '/calendar', exact: true, name: '캘린더', element: FullCalendarPlugin },
  { path: '/setting', exact: true, name: '설정', element: Setting },
  { path: '/devSetting', exact: true, name: '개발자설정', element: DevSetting },
]


export default routes
