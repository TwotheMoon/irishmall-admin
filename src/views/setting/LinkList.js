import React from 'react'
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react-pro'
import {
  _79domeUrl,
  cloudTypeServerUrl,
  coreUiFreeviewUrl,
  dometopiaUrl,
  gabiaUrl,
  kunstayUrl,
  margoencUrl,
  mongoExpressUrl,
  moonNasUrl,
  nasMonitor,
  naverCommerceDocUrl,
  naverCommerceUrl,
  naverOpenApiDocUrl,
  naverSearchAdUrl,
  naverShoppingUrl,
  netlifyServer,
  ownerclanUrl,
  parabroUrl,
  sellerfriendUrl,
  sellporterAdminUrl,
  zentradeUrl,
} from '../../api'
import CIcon from '@coreui/icons-react'
import { cilTruck, cibNintendo, cilCode, cilEqualizer } from '@coreui/icons'

const LinkList = () => {
  const onClickLinkBtn = (url) => {
    if (!url) return
    window.open(url)
  }

  return (
    <>
      {/* 링크 리스트 */}
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100 position-relative">링크 리스트</CAccordionHeader>
        <CAccordionBody>
          <CCard className={`mb-4 border-top-success border-top-3 w-100 border border-success`}>
            <CCardHeader className="d-flex" style={{ fontSize: '14px' }}>
              <CIcon
                icon={cibNintendo}
                style={{ height: '20px', marginRight: '10px', fill: '#ffffffde' }}
                customClassName="nav-icon"
              />
              <div>네이버 관련 사이트 & 스토어</div>
            </CCardHeader>
            <CCardBody className="d-flex gap-3">
              <CButton
                color="success"
                variant="outline"
                onClick={() => onClickLinkBtn(naverShoppingUrl)}
              >
                네이버 가격비교
              </CButton>
              <CButton color="light" variant="outline" onClick={() => onClickLinkBtn(kunstayUrl)}>
                쿤스테이
              </CButton>
              <CButton color="light" variant="outline" onClick={() => onClickLinkBtn(margoencUrl)}>
                마고이앤씨
              </CButton>
            </CCardBody>
          </CCard>
          <CCard
            className={`mb-4 border-top-primary border-top-3 w-100 border border-primary-subtle`}
          >
            <CCardHeader className="d-flex" style={{ fontSize: '14px' }}>
              <CIcon
                icon={cilTruck}
                style={{ height: '20px', marginRight: '10px' }}
                customClassName="nav-icon"
              />
              <div>도매처 사이트</div>
            </CCardHeader>
            <CCardBody className="d-flex gap-3">
              <CButton
                color="primary"
                variant="outline"
                onClick={() => onClickLinkBtn(ownerclanUrl)}
              >
                오너클랜
              </CButton>
              <CButton color="light" variant="outline" onClick={() => onClickLinkBtn(zentradeUrl)}>
                젠트레이드
              </CButton>
              <CButton
                color="success"
                variant="outline"
                onClick={() => onClickLinkBtn(sellerfriendUrl)}
              >
                셀러프랜즈
              </CButton>
              <CButton color="danger" variant="outline" onClick={() => onClickLinkBtn(parabroUrl)}>
                파라브로
              </CButton>
              <CButton color="warning" variant="outline" onClick={() => onClickLinkBtn(_79domeUrl)}>
                79도매
              </CButton>
              <CButton color="info" variant="outline" onClick={() => onClickLinkBtn(dometopiaUrl)}>
                도매토피아
              </CButton>
            </CCardBody>
          </CCard>
          <CCard className={`mb-4 border-top-warning border-top-3 w-100 border border-warning`}>
            <CCardHeader className="d-flex" style={{ fontSize: '14px' }}>
              <CIcon
                icon={cilEqualizer}
                style={{ height: '20px', marginRight: '10px' }}
                customClassName="nav-icon"
              />
              <div>관리자 사이트</div>
            </CCardHeader>
            <CCardBody className="d-flex gap-3">
              <CButton
                color="danger"
                variant="outline"
                onClick={() => onClickLinkBtn(sellporterAdminUrl)}
              >
                셀포터
              </CButton>
              <CButton color="info" variant="outline" onClick={() => onClickLinkBtn(moonNasUrl)}>
                NAS
              </CButton>
              <CButton
                color="success"
                variant="outline"
                onClick={() => onClickLinkBtn(naverCommerceUrl)}
              >
                네이버 커머스
              </CButton>
              <CButton
                color="success"
                variant="outline"
                onClick={() => onClickLinkBtn(naverSearchAdUrl)}
              >
                네이버 검색광고
              </CButton>
            </CCardBody>
          </CCard>
          <CCard className={`mb-4 border-top-secondary border-top-3 w-100 border border-secondary`}>
            <CCardHeader className="d-flex" style={{ fontSize: '14px' }}>
              <CIcon
                icon={cilCode}
                style={{ height: '20px', marginRight: '10px' }}
                customClassName="nav-icon"
              />
              <div>개발관련</div>
            </CCardHeader>
            <CCardBody className="d-flex gap-3">
              <CButton
                color="success"
                variant="outline"
                onClick={() => onClickLinkBtn(netlifyServer)}
              >
                프론트엔드 서버
              </CButton>
              <CButton
                color="warning"
                variant="outline"
                onClick={() => onClickLinkBtn(cloudTypeServerUrl)}
              >
                백엔드 서버
              </CButton>
              <CButton
                color="info"
                variant="outline"
                onClick={() => onClickLinkBtn(mongoExpressUrl)}
              >
                데이터베이스
              </CButton>
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => onClickLinkBtn(nasMonitor)}
              >
                Nas Monitor
              </CButton>
              <CButton color="secondary" variant="outline" onClick={() => onClickLinkBtn(gabiaUrl)}>
                가비아 도메인
              </CButton>
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => onClickLinkBtn(naverCommerceDocUrl)}
              >
                커머스 API
              </CButton>
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => onClickLinkBtn(naverOpenApiDocUrl)}
              >
                Open API
              </CButton>
              <CButton
                color="secondary"
                variant="outline"
                onClick={() => onClickLinkBtn(coreUiFreeviewUrl)}
              >
                CoreUI Demo
              </CButton>
            </CCardBody>
          </CCard>
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default LinkList
