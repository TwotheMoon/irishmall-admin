import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  CAccordionBody, 
  CAccordionHeader, 
  CAccordionItem, 
  CButton, 
  CSmartTable } from "@coreui/react-pro";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoadingAtom, isLocalAtom, showModalAtom } from "../../../atom";
import { apiServerBaseUrl, createWhiteListApiEp, deleteWhiteListApiEp, localServerBaseUrl, readWhiteListApiEp, updateWhiteListApiEp } from "../../../api";
import { commonErrorModal, commonReqModal, commonResModal } from "../../../utils";
import { CommonModal } from "../../../layout/Modal";

const WhiteList = () => {
  const isLocal = useRecoilValue(isLocalAtom);
  const setShowModal = useSetRecoilState(showModalAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  
  const [ items, setItems ] = useState([]);
  const [ inputValues, setInputValues ] = useState({ id: "", domain: "", desc: ""});
  const [ onConfirmType, setOnConfirmType ] = useState("");

  
  // 테이블 컬럼
  const columns = [
    {
      key: "domain",
      label: "도메인",
      filter: true,
      sorter: true,
    },
    {
      key: "desc",
      label: "설명",
      filter: true,
      sorter: true,
    },
    {
      key: "btns",
      _style: {width: "150px", textAlign: "center"}
    }
  ];

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  // 화이트리스트 읽기
  const getData = async () => {
    setIsLoading(true);

    try {
      const res = await (await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${readWhiteListApiEp}`)).data.data;
      const transformedData = res.map((item) => ({
        id: item._id,
        domain: item.domain,
        desc: item.desc
      }));
      setItems(transformedData);
      setIsLoading(false);

    } catch (error) {
      commonErrorModal(setIsLoading, setShowModal, error);
    } 
  };

  // 화이트리스트 생성 및 업데이트
  const createOrUpdateWhitelist = async () => {
    setIsLoading(true);

    try {
      if(onConfirmType === "create"){
        const payload = {
          domain: inputValues.domain,
          desc: inputValues.desc,  
        };
        const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${createWhiteListApiEp}`, payload);
        commonResModal(
          res,
          "화이트리스트 추가",
          setIsLoading,
          setShowModal
        );

      } else if (onConfirmType === "update") {
        const payload = {
          id: inputValues.id,
          domain: inputValues.domain,
          desc: inputValues.desc,
        }
  
        const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${updateWhiteListApiEp}`, payload);
        commonResModal(
          res,
          "화이트리스트 수정",
          setIsLoading,
          setShowModal
        );
      } else {
        commonErrorModal(setIsLoading, setShowModal, error);
      };
      
    } catch (error) {
      commonErrorModal(setIsLoading, setShowModal, error);
      
    } finally {
      setInputValues({id: "", domain: "", desc: ""});
      setOnConfirmType("");
      getData();
    }
  };


  // 화이트리스트 삭제
  const deleteWhitelist = async (id) => {
    setIsLoading(true);

    try {
      const payload = { id };
      const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${deleteWhiteListApiEp}`, payload);
      commonResModal(
        res,
        "화이트 리스트 삭제",
        setIsLoading,
        setShowModal
      );

      getData();

    } catch (error) {
      commonErrorModal(setIsLoading, setShowModal, error);
    }
  };

  


  useEffect(() => {
    try {
      (async () => {
        await getData();
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);


  // 생성 버튼 임의 커스텀 추가
  useEffect(() => {
    const tHeadElement = document.querySelector('.form-label').parentElement.parentElement.parentElement;
    if(tHeadElement){
      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add("wrapper-div");
      
      const filterDivOne = tHeadElement.children[0];
      const filterDivTwo = tHeadElement.children[1];
      
      tHeadElement.insertBefore(wrapperDiv, filterDivOne);
      
      wrapperDiv.appendChild(filterDivOne);
      wrapperDiv.appendChild(filterDivTwo);
      
      wrapperDiv.classList.add("d-flex");
      wrapperDiv.style.maxWidth = "50%";
      
      tHeadElement.classList.add("d-flex");
      tHeadElement.style.flexWrap = "unset";
      tHeadElement.style.alignItems = "center";
      tHeadElement.style.justifyContent = "space-between";
     
      const button = document.createElement('button');
      button.className = 'btn btn-primary btn-sm square';
      button.style.width = "50px";
      button.style.height = "31px";
      button.textContent = '추가';
      button.onclick = () => {
        setOnConfirmType("create");
        setInputValues({ domain: "", desc: ""});
        commonReqModal(
        "whitelist",
        "화이트리스트 추가",
        undefined,
        setShowModal,
        createOrUpdateWhitelist
      )};
      tHeadElement.appendChild(button);
    }
  }, []);

  return(
    <>
      <CAccordionItem itemKey={1} className='mb-4'>
        <CAccordionHeader className='w-100 position-relative'>도메인 화이트리스트</CAccordionHeader>
        <CAccordionBody>
          <CSmartTable
            activePage={1}
            cleaner
            columns={columns}
            columnSorter
            items={items}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedColumns={{
              btns: (item) => {
                return (
                  <>
                    <td className="py-2 d-flex justify-content-center gap-2">
                      <CButton
                        color="warning"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          setOnConfirmType("update");
                          setInputValues({id: item.id, domain: item.domain, desc: item.desc})
                          commonReqModal(
                            "whitelist",
                            "화이트리스트 수정",
                            "",
                            setShowModal,
                          )
                        }}
                      >
                        수정
                      </CButton>
                      <CButton
                        color="danger"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          commonReqModal(
                            "default",
                            "화이트리스트 삭제",
                            "삭제하시겠습니까?",
                            setShowModal,
                            () => deleteWhitelist(item.id)
                          )
                        }}
                      >
                        삭제
                      </CButton>
                    </td>
                  </>
                )
              }
            }}
            sorterValue={{ column: 'domain', state: 'desc' }}
            tableFilter
            tableProps={{
              className: 'add-this-class',
              responsive: true,
              striped: true,
              hover: true,
            }}
            tableBodyProps={{
              className: 'align-middle'
            }}
          />
        </CAccordionBody>
      </CAccordionItem>

      <CommonModal 
        inputValues={inputValues} 
        onInputChange={handleInputChange} 
        onConfirm={createOrUpdateWhitelist} 
      />
    </>
  )
}

export default WhiteList