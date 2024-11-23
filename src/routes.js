import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const SellingSite = React.lazy(() => import('./views/sellingSite/SellingSite'))
const Nas = React.lazy(() => import('./views/nas/Nas'))

const routes = [
  { path: '/', exact: true, name: '메인', element: Home },
  { path: '/selling-site', exact: true, name: '도매처사이트', element: SellingSite },
  { path: '/nas', exact: true, name: 'NAS', element: Nas },
]

export default routes
