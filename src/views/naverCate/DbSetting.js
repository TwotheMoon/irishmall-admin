import React from 'react';
import axios from 'axios';
import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton } from '@coreui/react-pro';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingAtom, isLocalAtom, showModalAtom } from '../../atom';
import { apiServerBaseUrl, localServerBaseUrl, updateNaverAllCateApiEP, updateNaverCateAttrApiEP } from '../../api';
import { commonErrorModal, commonReqModal, commonResModal } from '../../utils';

const DevSetting = () => {
  const setShowModal = useSetRecoilState(showModalAtom);
  const isLocal = useRecoilValue(isLocalAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const updateNaverCate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${isLocal ? localServerBaseUrl : apiServerBaseUrl}${updateNaverAllCateApiEP}`,
      );
      commonResModal(res, '네이버 카테고리 업데이트', setIsLoading, setShowModal);
    } catch (error) {
      commonErrorModal(() => { }, setShowModal, error.response.data)
    } finally {
      setIsLoading(false)
    }
  };

  const upadateNaverCateAttr = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${isLocal ? localServerBaseUrl : apiServerBaseUrl}${updateNaverCateAttrApiEP}`,
      );
    } catch (error) {
      commonErrorModal(() => { }, setShowModal, error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100 position-relative">데이터베이스 조작</CAccordionHeader>
        <CAccordionBody className="d-flex gap-2">
          <CButton
            color="warning"
            onClick={() =>
              commonReqModal(
                'default',
                '네이버 카테고리 업데이트',
                '네이버 카테고리를 업데이트 하시겠습니까?',
                setShowModal,
                updateNaverCate,
              )
            }
          >
            네이버 카테고리 업데이트
          </CButton>
          <CButton
            color="danger"
            onClick={() =>
              commonReqModal(
                'default',
                '네이버 속성 업데이트',
                '네이버 속성 업데이트 하시겠습니까?',
                setShowModal,
                upadateNaverCateAttr,
              )
            }
          >
            네이버 속성 업데이트
          </CButton>
        </CAccordionBody>
      </CAccordionItem>
    </>
  );
};

export default DevSetting;
