import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isLoadingAtom, isLocalAtom, showModalAtom } from '../../atom'
import { apiServerBaseUrl, getAllMyCateApiEP, localServerBaseUrl } from '../../api'
import { CAccordionBody, CAccordionHeader, CAccordionItem, CSmartTable } from '@coreui/react-pro'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { commonErrorModal } from '../../utils'

const MyCateTable = ({ reFetch }) => {
  const isLocal = useRecoilValue(isLocalAtom)
  const setIsLoading = useSetRecoilState(isLoadingAtom)
  const setShowModal = useSetRecoilState(showModalAtom)

  const [items, setItems] = useState([])

  // 테이블 컬럼
  const columns = [
    {
      key: 'cateName',
      label: '카테고리설명',
      filter: true,
      sorter: true,
    },
    {
      key: 'myCate',
      label: '마이카테',
      filter: true,
      sorter: true,
      _style: { width: '120px', backgroundColor: '#61CBF3', color: 'black', textAlign: 'center' },
    },
    {
      key: 'auctionCate',
      label: 'A',
      filter: true,
      sorter: true,
      _style: { width: '90px', backgroundColor: '#FF0000', color: 'black', textAlign: 'center' },
    },
    {
      key: 'gmarketCate',
      label: 'G',
      filter: true,
      sorter: true,
      _style: { width: '100px', backgroundColor: '#00B050', color: 'black', textAlign: 'center' },
    },
    {
      key: 'naverCate',
      label: 'N',
      filter: true,
      sorter: true,
      _style: { width: '100px', backgroundColor: '#92D050', color: 'black', textAlign: 'center' },
    },
    {
      key: 'elevenCate',
      label: '11',
      filter: true,
      sorter: true,
      _style: { width: '90px', backgroundColor: '#FFC000', color: 'black', textAlign: 'center' },
    },
    {
      key: 'cupangCate',
      label: 'C',
      filter: true,
      sorter: true,
      _style: { width: '80px', backgroundColor: '#FBE2D5', color: 'black', textAlign: 'center' },
    },
    {
      key: 'kakaoCate',
      label: 'K',
      filter: true,
      sorter: true,
      _style: { width: '120px', backgroundColor: '#FFFF00', color: 'black', textAlign: 'center' },
    },
  ]

  // 마이카테고리 읽기
  const getData = async () => {
    setIsLoading(true)

    try {
      console.log('데이터 get')
      const res = await (
        await axios.get(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${getAllMyCateApiEP}`)
      ).data.data
      const transformedData = res.map((item) => ({
        id: item._id,
        cateName: item.cateName,
        myCate: item.myCate,
        auctionCate: item.auctionCate,
        gmarketCate: item.gmarketCate,
        naverCate: item.naverCate,
        elevenCate: item.elevenCate,
        cupangCate: item.cupangCate,
        kakaoCate: item.kCate,
        _cellProps: { all: { className: 'text-center' }, cateName: { className: 'text-start' } },
      }))
      setItems(transformedData)
    } catch (error) {
      commonErrorModal(() => { }, setShowModal, error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ; (async () => {
      await getData()
    })()
  }, [reFetch])

  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100 position-relative">마이 카테고리</CAccordionHeader>
        <CAccordionBody>
          <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            items={items}
            itemsPerPageSelect
            itemsPerPage={20}
            itemsPerPageOptions={[5, 10, 20, 50, 100, 200]}
            pagination
            tableFilter
            tableProps={{
              responsive: true,
              striped: true,
              hover: true,
            }}
            tableBodyProps={{
              className: 'align-middle',
            }}
            scopedColumns={{
              cateName: (item) => <td className="text-start">{item.cateName}</td>,
            }}
          />
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default MyCateTable
