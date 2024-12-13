import React, { useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { isLoadingAtom, isLocalAtom, showModalAtom } from '../../atom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { localServerBaseUrl, apiServerBaseUrl, uploadNaverCateExcelApiEP } from '../../api'
import { CIcon } from '@coreui/icons-react'
import { cilFileExcel } from '@coreui/icons-pro'
import { commonErrorModal, commonReqModal, commonResModal } from '../../utils'
import { CButton, CForm, CFormInput, CFormLabel, CFormSwitch } from '@coreui/react-pro'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150px',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#cccccc',
  borderStyle: 'dashed',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}
const acceptStyle = {
  borderColor: '#00e676',
}
const rejectStyle = {
  borderColor: '#ff1744',
}

function NaverDropzone() {
  const isLocal = useRecoilValue(isLocalAtom)
  const setIsLoading = useSetRecoilState(isLoadingAtom)
  const setShowModal = useSetRecoilState(showModalAtom)
  const [acceptedFiles, setAcceptedFiles] = useState([])
  const [startRow, setStartRow] = useState('');
  const [endRow, setEndRow] = useState('');
  const [switchStatus, setSwitchStatus] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [filteredCount, setFilteredCount] = useState(0);
  const [validated, setValidated] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const formRef = useRef(null);
  const startRowRef = useRef(null);
  const endRowRef = useRef(null);

  // 전체 행 처리 스위치
  const handleSwitchChange = () => {
    setStartRow('');
    setEndRow('');
    setSwitchStatus(!switchStatus)
    setIsValid(null);
  }

  const onDrop = (files) => {
    resetState();
    processFileUpload(files)

  }

  const onFileSelectorChange = (e) => {
    const files = e.target.files
    processFileUpload(files)
  }

  const processFileUpload = async (files) => {
    if (files && files.length > 0) setAcceptedFiles(files)
    else alert('선택된 파일이 없습니다.')
  }

  const handleStartRowChange = (e) => {
    setStartRow(e.target.value);
  };

  const handleEndRowChange = (e) => {
    setEndRow(e.target.value);
  };

  const validateInputs = () => {
    if (startRow && endRow && Number(startRow) < Number(endRow)) {
      setIsValid(true);
      return true;
    } else {
      setIsValid(false);
      return false;
    }
  }

  const handleConfirm = () => {
    setValidated(true);
    if(Number(startRow) > Number(endRow)){
      commonErrorModal(setIsLoading, setShowModal, {message: "시작 행이 종료 행보다 클 수 없습니다."})
      return;
    }

    if (!switchStatus) {
      const valid = validateInputs();
      if (valid) {
        commonReqModal(
          'default',
          '엑셀 업로드',
          `${acceptedFiles[0]?.name} 엑셀을 업로드 하시겠습니까?`,
          setShowModal,
          handleUpdateFile,
        )
      }
    } else {
      commonReqModal(
        'default',
        '엑셀 업로드',
        `${acceptedFiles[0]?.name} 엑셀을 업로드 하시겠습니까?`,
        setShowModal,
        handleUpdateFile,
      )
    }
  }

  // 엑셀 업로드
  const handleUpdateFile = async () => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    if (startRow && endRow) {
      formData.append('startRow', startRow);
      formData.append('endRow', endRow);
    }

    try {
      setIsLoading(true)
      const res = await axios.post(
        `${isLocal ? localServerBaseUrl : apiServerBaseUrl}${uploadNaverCateExcelApiEP}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )

      if(res.status === 200){
        setDownloadUrl(res.data.downloadUrl)
        setFileName(res.data.fileName);
        setFilteredCount(res.data.filteredCount);
        commonResModal(res, '엑셀 업로드', setIsLoading, setShowModal)
        setAcceptedFiles([])
        setStartRow('');
        setEndRow('');
        setValidated(false);
        setIsValid(null);
      } 

    } catch (error) {
      commonErrorModal(setIsLoading, setShowModal, error.response.data)
      setAcceptedFiles([])
      setStartRow('');
      setEndRow('');
      setDownloadUrl(null)
      setValidated(false);
      setIsValid(null);
    }
  }

  const resetState = () => {
    setAcceptedFiles([])
    setStartRow('');
    setEndRow('');
    setDownloadUrl(null)
    setFileName('');
    setFilteredCount(0);
    setValidated(false);
    setIsValid(null);
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      },
      multiple: false,
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  )

  const hasFiles = acceptedFiles.length > 0

  const handleDownload = () => {
    console.log(downloadUrl);
    window.location.href = downloadUrl;
  }

  return (
    <div className="container">
      <div className="mb-4 d-flex align-items-center gap-5">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <CFormLabel style={{ marginBottom: '0' }}>전체 행 처리</CFormLabel>
          <CFormSwitch
            size="xl"
            id="automationSwitch"
            style={{ width: '65px' }}
            checked={switchStatus}
            onChange={handleSwitchChange}
          />
        </div>
        {!switchStatus ?
          <CForm
            ref={formRef}
            noValidate
            validated={validated}
            className='d-flex align-items-center gap-3'
          >
            <label className='d-flex align-items-center gap-2'>
              <div>시작 행:</div>
              <CFormInput
                type="number"
                value={startRow}
                onChange={handleStartRowChange}
                ref={startRowRef}
                min="2"
                className={`form-control ${isValid === true ? 'is-valid' : isValid === false ? 'is-invalid' : ''}`}
                placeholder="예: 2"
                style={{ width: '100px', height: '30px' }}
                required
              />
            </label>
            <label className='d-flex align-items-center gap-2'>
              <div>종료 행:</div>
              <CFormInput
                type="number"
                value={endRow}
                onChange={handleEndRowChange}
                ref={endRowRef}
                min="3"
                className={`form-control ${isValid === true ? 'is-valid' : isValid === false ? 'is-invalid' : ''}`}
                placeholder="예: 100"
                style={{ width: '100px', height: '30px' }}
                required
              />
            </label>
          </CForm>
          : null
        }
      </div>

      <div {...getRootProps({ style })}>
        <input {...getInputProps()} onChange={onFileSelectorChange} />
        <p style={{ marginBottom: 0 }}>
          {isDragActive ? '여기에 놓아주세요.' : '파일을 드롭하거나, 클릭해주세요.'}
        </p>
      </div>
      {hasFiles ? (
        <aside className="mt-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <CIcon icon={cilFileExcel} style={{ width: '18px', height: '20px' }} />
            <div>{acceptedFiles[0]?.name || ''}</div>
            <button
              type="button"
              className="btn btn-close"
              onClick={() => setAcceptedFiles([])}
            ></button>
          </div>
          <CButton size="sm" color="primary" onClick={handleConfirm}>
            업로드
          </CButton>
        </aside>
      ) : null}

      {downloadUrl && (
        <div className="mt-3 d-flex justify-content-end">
          <div className=" d-flex gap-3">
            <div className='d-flex align-items-center gap-2'>
              <div className='d-flex flex-column' style={{fontSize: '14px'}}>
                <div>파일명: {fileName}</div>
                <div>필터링된 상품 수: {filteredCount}</div>
              </div>
              <CButton color="success" onClick={handleDownload}>다운로드</CButton>
            </div>
            <CButton color="secondary" onClick={resetState}>초기화</CButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default NaverDropzone
