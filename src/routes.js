import React from 'react'

const Home = React.lazy(() => import('./views/home/index'))
const MyCate = React.lazy(() => import('./views/myCate/index'))
const FullCalendarPlugin = React.lazy(() => import('./views/calendar/index'))
const Office = React.lazy(() => import('./views/office/index'))
const Setting = React.lazy(() => import('./views/setting/index'))
const DevSetting = React.lazy(() => import('./views/devSetting/index'))

const routes = [
  { path: '/', exact: true, name: '메인', element: Home },
  { path: '/myCate', exact: true, name: '마이카테', element: MyCate },
  { path: '/calendar', exact: true, name: '캘린더', element: FullCalendarPlugin },
  { path: '/office', exact: true, name: '오피스', element: Office },
  { path: '/setting', exact: true, name: '설정', element: Setting },
  { path: '/devSetting', exact: true, name: '개발자설정', element: DevSetting },
]

export default routes
