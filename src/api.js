import axios from 'axios'

axios.defaults.withCredentials = true

// 서버 기본 api url
export const apiServerBaseUrl = 'https://node.moondb.co.kr'
export const localServerBaseUrl = 'http://localhost:4000'
export const healthCkEP = '/health'
export const getTokenApiEP = '/getToken'
export const getNasLogApiEP = '/getNasLog'
export const getAllMyCateApiEP = '/getAllMyCate'

// 카테고리 api url
export const updateNaverAllCateApiEP = '/updateNaverAllCate'
export const getPopularCateApiEP = '/getPopularCate'
export const uploadMyCateExcelApiEP = '/uploadMyCateExcel'

// 화이트리스트 url
export const createWhiteListApiEp = '/createWitelist'
export const readWhiteListApiEp = '/readeWitelist'
export const updateWhiteListApiEp = '/updateWitelist'
export const deleteWhiteListApiEp = '/deleteWitelist'

// 네이버 & 스토어 url
export const naverShoppingUrl = 'https://search.shopping.naver.com/home'
export const kunstayUrl = 'https://smartstore.naver.com/kunstay'
export const margoencUrl = 'https://smartstore.naver.com/margoenc'

//도매처 사이트 url
export const ownerclanUrl = 'https://ownerclan.com'
export const zentradeUrl = 'https://www.zentrade.co.kr/shop/main/index.php'
export const sellerfriendUrl = 'https://www.sellerfriend.co.kr/main/index.php'
export const parabroUrl = 'https://www.parabro.co.kr/'
export const _79domeUrl = 'https://www.79dome.com/shop/main/index.php'
export const dometopiaUrl = 'https://dometopia.com/main/index'

// 관리자 사이트 url
export const sellporterAdminUrl = 'https://admin.sellporter.com'
export const moonNasUrl = 'https://moondb.co.kr'
export const naverCommerceUrl = 'https://accounts.commerce.naver.com/login'
export const naverSearchAdUrl = 'https://searchad.naver.com/my-screen'

// 개발 관련 url
export const mongoExpressUrl = 'http://125.133.33.2:8081'
export const netlifyServer = 'https://app.netlify.com/teams/twothemoon/sites'
export const cloudTypeServerUrl = 'https://app.cloudtype.io/@dlaguddh1/irishmall-api-server:main'
export const nasMonitor = 'http://125.133.33.2:3033/d/TIcL1_ezk22/synology-dashboard?orgId=1&refresh=1m'
export const gabiaUrl = 'https://www.gabia.com/'
export const naverCommerceDocUrl = 'https://apicenter.commerce.naver.com/ko/basic/commerce-api'
export const naverOpenApiDocUrl = 'https://developers.naver.com/products/service-api/datalab/datalab.md'
export const coreUiFreeviewUrl = 'https://coreui.io/demos/react/5.3/default/?theme=dark#/dashboard'
