import React from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingAtom, isLocalAtom } from '../../atom';
import { apiServerBaseUrl, localServerBaseUrl, uploadMyCateExcelApiEP } from '../../api';

const Setting = () => {
  const isLocal = useRecoilValue(isLocalAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const onDrop = async (acceptedFiles) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const res = await axios.post(`${isLocal ? localServerBaseUrl : apiServerBaseUrl}${uploadMyCateExcelApiEP}`, 
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      
      console.log(res.data);
      if(res.data.result){
        alert("성공적으로 업로드 되었습니다.");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error); 
      setIsLoading(false);     
    }
  }

  const { acceptedFiles, getRootProps, getInputProps, isDragActive  } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    multiple: false,
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path.replace(/\.\//g, "")} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <CAccordion alwaysOpen activeItemKey={1}>
        <CAccordionItem itemKey={1} className='mb-4'>
          <CAccordionHeader className='w-100 position-relative'>
            마이카테 관리
          </CAccordionHeader>
          <CAccordionBody>

            {/* 엑셀 업로드 */}
            <CCard className='mt-2'>
              <CCardHeader>엑셀 업로드</CCardHeader>
              <CCardBody>
                <div 
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #cccccc",
                    padding: "50px",
                    paddingTop: "60px",
                    textAlign: "center",
                    cursor: "pointer",
                    opacity: "0.7"
                  }}
                >
                  <input {...getInputProps()}></input>
                  {isDragActive ? 
                  (<p>여기에 놓아주세요.</p>) : (<p>파일을 드롭하거나, 클릭해주세요.</p>)
                  }
                </div>
                <aside className='mt-4'>
                  <h5>Files</h5>
                  <ul>{files}</ul>
                </aside>
              </CCardBody>
            </CCard>

            {/* 마이카테 테이블 */}
            <CCard className='mt-4'>
              <CCardHeader>마이카테</CCardHeader>
              <CCardBody>
                <CTable color="dark" striped>
                <CTableHead>
                  <CTableRow>
                      <CTableHeaderCell scope="col">카테고리설명</CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{textAlign: "center"}}>마이카테</CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{textAlign: "center"}}>A</CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{textAlign: "center"}}>G</CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{textAlign: "center"}}>N</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell colSpan={1} style={{textAlign: "center"}}>샘플입니다.</CTableDataCell>
                      <CTableDataCell ></CTableDataCell>
                      <CTableDataCell ></CTableDataCell>
                      <CTableDataCell ></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>${"유아의류 > 여아의류 > 조끼"}</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>DW5000010</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>32231000</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>300029464</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>300029464</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>${"유아의류 > 여아의류 > 청바지"}</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>DW5000020</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>32231700</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>300006340</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>50007115</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell>${"유아의류 > 여아의류 > 트레이닝복"}</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>DW5000030</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>32232100</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>300029480</CTableDataCell>
                      <CTableDataCell style={{textAlign: "center"}}>50000416</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CAccordionBody>
        </CAccordionItem>
     </CAccordion>
    </div>
  )
}

export default Setting
