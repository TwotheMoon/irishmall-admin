import React from 'react'
import axios from 'axios';
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
import { apiServerBaseUrl, localServerBaseUrl, uploadMyCateExcelApiEP } from '../../api';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoadingAtom, isLocalAtom } from '../../atom';

const CateSetting = () => {
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

  return(
    <>
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
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default CateSetting