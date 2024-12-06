import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiServerBaseUrl, getNasLogApiEP, localServerBaseUrl } from '../../../api'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CFormLabel,
  CVirtualScroller,
} from '@coreui/react-pro'
import { isLocalAtom, showModalAtom } from '../../../atom'
import { commonErrorModal, formattedUnixToDate } from '../../../utils'
import CIcon from '@coreui/icons-react'
import { cilReload } from '@coreui/icons'

const RotatingButton = ({ getNasLog }) => {
  return (
    <CButton
      color="primary"
      style={{ marginRight: '20px' }}
      className="rotate-on-hover"
      onClick={(e) => {
        e.stopPropagation()
        getNasLog()
      }}
    >
      <CIcon icon={cilReload} style={{ width: '20px', height: '20px' }} className="rotate-icon" />
    </CButton>
  )
}

const NasLog = () => {
  const isLocal = useRecoilValue(isLocalAtom)
  const setShowModal = useSetRecoilState(showModalAtom)
  const [, setIndex] = useState(0)
  const [logs, setLogs] = useState({ connectionLogs: [], systemLogs: [] })

  const getNasLog = async () => {
    try {
      const res = await axios.get(
        `${isLocal ? localServerBaseUrl : apiServerBaseUrl}${getNasLogApiEP}`,
      )

      setLogs({
        connectionLogs: res?.data[0].series[0].values
          .map((list) => ({
            timestamp: formattedUnixToDate(list[0]),
            log: list[2],
          }))
          .reverse(),
        systemLogs: res?.data[0].series[1].values
          .map((list) => ({
            timestamp: formattedUnixToDate(list[0]),
            log: list[2],
          }))
          .reverse(),
      })
    } catch (error) {
      commonErrorModal(() => {}, setShowModal, error)
    }
  }

  useEffect(() => {
    ;(async () => await getNasLog())()
  }, [])

  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            NAS 로그
            <RotatingButton getNasLog={getNasLog} />
          </div>
        </CAccordionHeader>
        <CAccordionBody>
          <div className="fw-bolder">
            <CFormLabel>Connection Logs</CFormLabel>
            <CVirtualScroller
              className="border p-3"
              visibleItems={20}
              onScroll={(currentItemIndex) => setIndex(currentItemIndex)}
            >
              {logs.connectionLogs.map((log, i) => (
                <div key={i} className="d-flex align-item-center gap-3">
                  <div className="fw-bolder" style={{ fontSize: '14px' }}>
                    {log.timestamp}
                  </div>
                  <div style={{ fontSize: '14px' }}>{log.log}</div>
                </div>
              ))}
            </CVirtualScroller>
          </div>

          <div className="mt-4 fw-bolder">
            <CFormLabel>System Logs</CFormLabel>
            <CVirtualScroller
              className="border p-3"
              visibleItems={20}
              onScroll={(currentItemIndex) => setIndex(currentItemIndex)}
            >
              {logs.systemLogs.map((log, i) => (
                <div key={i} className="d-flex align-item-center gap-3">
                  <div className="fw-bolder" style={{ fontSize: '14px' }}>
                    {log.timestamp}
                  </div>
                  <div style={{ fontSize: '14px' }}>{log.log}</div>
                </div>
              ))}
            </CVirtualScroller>
          </div>
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default NasLog
