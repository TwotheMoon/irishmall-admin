import React from 'react'
import axios from 'axios'
import { 
  CAccordionBody,
  CAccordionHeader, 
  CAccordionItem, 
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle} from '@coreui/react-pro'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isLoadingAtom, isLocalAtom, showModalAtom } from '../../atom'
import { apiServerBaseUrl, localServerBaseUrl, updateNaverAllCateApiEP } from '../../api'


const DevSetting = () => {
  const [showModal, setShowModal] = useRecoilState(showModalAtom);
  const isLocal = useRecoilValue(isLocalAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const updateNaverCate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${updateNaverAllCateApiEP}`);
      if(res.data.status === 200){
        setIsLoading(false);

        setShowModal({
          visible: true,
          title: "네이버 카테고리 업데이트",
          desc: res.data.message,
          confirm: "확인",
          cancle: "",
          onClick: () => {
            setShowModal({
              visible: false,
              title: "",
              desc: "",
              confirm: "",
              cancle: "",
              onClick: () => {},
              isCancelVisible: true
            })
          },
          isCancelVisible: false
        })
      } else if (res.data.status === 500){
          setIsLoading(false);

          setShowModal({
            visible: true,
            title: "네이버 카테고리 업데이트",
            desc: res.data.message,
            confirm: "확인",
            cancle: "",
            onClick: () => {
              setShowModal({
                visible: false,
                title: "",
                desc: "",
                confirm: "",
                cancle: "",
                onClick: () => {},
                isCancelVisible: true
              })
            },
            isCancelVisible: false
          })
        }
    } catch (error) {
      alert("관리자에게 문의해주세요.");
      setIsLoading(false);
      setShowModal({
        visible: false,
        title: "",
        desc: "",
        confirm: "",
        cancle: "",
        onClick: () => {},
        isCancelVisible: true
      })
    }
  };

  return(
    <>
      <CAccordionItem itemKey={1} className='mb-4'>
        <CAccordionHeader className='w-100 position-relative'>데이터베이스 조작</CAccordionHeader>
        <CAccordionBody>
          <CButton 
            color="danger" 
            onClick={() => 
              setShowModal({
                visible: true,
                title: "네이버 카테고리 업데이트",
                desc: "최신 네이버 카테고리를 불러오시겠습니까?",
                confirm: "실행",
                cancle: "취소",
                onClick: () => {updateNaverCate()},
                isCancelVisible: true,
              })
            }>네이버 카테고리 업데이트</CButton> 
          <CModal
            alignment="center"
            visible={showModal.visible}
            onClose={() => 
              setShowModal({
                visible: false,
                title: "",
                desc: "",
                confirm: "",
                cancle: "",
                onClick: () => {},
                isCancelVisible: true
              })
            }
            aria-labelledby="VerticallyCenteredExample"
          >
            <CModalHeader>
              <CModalTitle id="VerticallyCenteredExample">{showModal?.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>{showModal?.desc}</CModalBody>
            <CModalFooter>
              {showModal.isCancelVisible ?
                <CButton color="secondary" onClick={() => 
                  setShowModal({
                    visible: false,
                    title: "",
                    desc: "",
                    confirm: "",
                    cancle: "",
                    onClick: () => {},
                    isCancelVisible: true,
                  })
                }>
                  {showModal.cancle}
                </CButton>
                :
                null
              }
              <CButton color="primary" onClick={showModal.onClick}>{showModal.confirm}</CButton>
            </CModalFooter>
          </CModal>
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default DevSetting;