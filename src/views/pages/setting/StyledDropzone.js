import React, { useMemo, useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { isLoadingAtom, isLocalAtom, showModalAtom } from '../../../atom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { localServerBaseUrl, apiServerBaseUrl, uploadMyCateExcelApiEP } from '../../../api'
import { CIcon } from '@coreui/icons-react'
import { cilFileExcel } from '@coreui/icons-pro'
import { commonErrorModal, commonReqModal, commonResModal } from '../../../utils'
import { CButton } from '@coreui/react-pro'

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

function StyledDropzone({ setReFetch }) {
  const isLocal = useRecoilValue(isLocalAtom)
  const setIsLoading = useSetRecoilState(isLoadingAtom)
  const setShowModal = useSetRecoilState(showModalAtom)
  const [acceptedFiles, setAcceptedFiles] = useState([])

  const onDrop = (files) => {
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

  const handleConfirm = () => {
    commonReqModal(
      'default',
      '엑셀 업로드',
      `${acceptedFiles[0]?.name} 엑셀을 업로드 하시겠습니까?`,
      setShowModal,
      handleUpdateFile,
    )
  }

  const handleUpdateFile = async () => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])

    try {
      setIsLoading(true)
      const res = await axios.post(
        `${isLocal ? localServerBaseUrl : apiServerBaseUrl}${uploadMyCateExcelApiEP}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      commonResModal(res, '엑셀 업로드', setIsLoading, setShowModal)
      setAcceptedFiles([])
      setReFetch(Date.now())
    } catch (error) {
      console.log(error)
      commonErrorModal(setIsLoading, setShowModal, error)
      setAcceptedFiles([])
    }
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

  return (
    <div className="container">
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
    </div>
  )
}

export default StyledDropzone
