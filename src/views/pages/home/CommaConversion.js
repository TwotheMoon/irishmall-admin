import React, { useRef, useState } from "react";
import { 
  CAccordionBody,
  CAccordionHeader, 
  CAccordionItem, 
  CAlert,
  CButton,
  CForm,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CTooltip} from "@coreui/react-pro";

const CommaConversion = () => {
  const txArea1Ref = useRef();
  const txArea2Ref = useRef();
  
  const [showAlert, setShowAlert] = useState(false);
  const [showDupAlert, setShowDupAlert] = useState(false);
  const [duplicateWordCount, setDuplicateWordCount] = useState(0);
  const [duplicateState, setDuplicateState] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);

  const reset = () => {
    txArea1Ref.current.value = "";
    txArea2Ref.current.value = "";
  };

    // 키워드 변환 정규식
    const conversion = () => {
      const keywords = txArea1Ref.current.value;
      const conversionedWords = keywords
      .replace(/\n/g, ',')
      .replace(/\s+/g, '')
      .replace(/^,|,$/g, '')
      .replace(/,+/g, ',')
      .replace(/(,)(?=\s*,)/g, ',')
      .replace(/,\s*$/, '');   
      
      txArea2Ref.current.value = conversionedWords;
      
      if(switchStatus && conversionedWords !== ""){
        navigator.clipboard.writeText(conversionedWords);
      }
    }
  
    // 변환된 키워드 복사
    const handleTextAreaClick = () => {
      if (txArea2Ref.current && txArea2Ref.current.value !== "") {
        txArea2Ref.current.select();
  
        navigator.clipboard.writeText(txArea2Ref.current.value);
  
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1500);
      }
    };
  
    // 키워드 중복 검사
    const checkDuplicate = () => {
      let separatorType;
      let words;
      if(!txArea1Ref.current.value) return;
  
      if(txArea1Ref.current.value.includes("\n")){
        separatorType = "\n";
        words = txArea1Ref.current.value.split("\n").map(word => word.trim())
      } else if (txArea1Ref.current.value.includes(",")){
        separatorType = ",";
        words = txArea1Ref.current.value.split(",").map(word => word.trim())
      }
  
      const seen = new Set();
      const duplicateWords = new Set();
  
      if(!words) return;
  
      words.forEach(word => {
        if(seen.has(word)) {
          duplicateWords.add(word);
        } else {
          seen.add(word);
        }
      });
  
        if(!duplicateWords || duplicateWords.size == 0){
          setDuplicateState(false);
          setShowDupAlert(true);
          setTimeout(() => {
            setShowDupAlert(false);
          }, 1500);

        } else {
          setDuplicateState(true);
          setDuplicateWordCount(duplicateWords.size);
          setShowDupAlert(true);
  
          setTimeout(() => {
            setShowDupAlert(false);
          }, 1500);
  
          if(separatorType == "\n"){
            txArea1Ref.current.value = Array.from(seen).join("\n");
            txArea2Ref.current.value = Array.from(seen).join(",");
          } else if(separatorType == ","){
            txArea1Ref.current.value = Array.from(seen).join(",");
            txArea2Ref.current.value = Array.from(seen).join(",");
          }
        }

        if(switchStatus){
          navigator.clipboard.writeText(txArea2Ref.current.value);
        }
  
        seen.clear();
        duplicateWords.clear();
    };

    // 키워드 자동 변환
    const autoTransferKeyword = (e) => {
      setSwitchStatus((prev) => !prev);
      
      if(e.target.checked) {
        conversion();
        navigator.clipboard.writeText(txArea2Ref.current.value);
      }
    }

  return (
    <>
      <CAccordionItem itemKey={1} className='mb-4'>
        <CAccordionHeader className='w-100 position-relative'>
          쉼표 변환기
          <CAlert 
            color="primary"
            className='position-absolute end-0'
            style={{top: "50px"}}
            dismissible 
            visible={showAlert} 
            onClose={() => setShowAlert(false)}
            >
              복사되었습니다.
          </CAlert>
          <CAlert 
            color={duplicateState ? "success" : "primary"}
            className='position-absolute start-0'
            style={{top: "50px"}}
            dismissible 
            visible={showDupAlert} 
            onClose={() => setShowDupAlert(false)}
            >
              {duplicateState ? `총 ${duplicateWordCount}개의 중복된 키워드를 삭제했습니다.` : "중복된 키워드가 없습니다."}
          </CAlert>
        </CAccordionHeader>
        <CAccordionBody>
          <CForm className='d-flex justify-content-center align-items-center'>
            <div className="mb-3 w-100">
              <CFormLabel htmlFor="textArea1">
                키워드 입력 &nbsp; 
                <CButton color="primary" onClick={() => checkDuplicate()}>중복 키워드 제거</CButton>
              </CFormLabel>
              <CFormTextarea 
                id="textArea1" 
                ref={txArea1Ref}
                style={{minHeight: "200px", height: 'auto', resize:"none"}} 
                onChange={switchStatus ? conversion : null}
              >  
              </CFormTextarea>
            </div>
              <div className='px-3 d-flex flex-column align-items-center gap-4'>
                <div style={{width: "75px"}}>
                  <CFormLabel className=" w-100 text-center">자동변환</CFormLabel>
                  <CTooltip
                    content="활성화시, 자동 키워드 변환 및 복사가 됩니다."
                    placement="bottom"
                  >
                    <CFormSwitch className="mb-3" size="xl" id="automationSwitch" style={{width: "65px"}} checked={switchStatus} onChange={autoTransferKeyword}/>
                  </CTooltip>
                </div>
                <CButton 
                  as="input" 
                  type="button" 
                  color="primary" 
                  value="변환" 
                  style={{minWidth: "75px", opacity: switchStatus ? "0" : "1"}} 
                  onClick={conversion} 
                  disabled={switchStatus}
                  />
                <CButton 
                  as="input" 
                  type="button" 
                  color="secondary" 
                  value="초기화" 
                  style={{minWidth: "75px", opacity: switchStatus ? "0" : "1" }} 
                  onClick={reset}
                  disabled={switchStatus} 
                  />
              </div>
            <div className="mb-3 w-100">
              <CFormLabel htmlFor="textArea2">변환된 키워드</CFormLabel>
              <CFormTextarea 
                id="textArea2"
                ref={txArea2Ref} 
                readOnly
                style={{minHeight: "200px", height: 'auto', resize:"none"}}
                onClick={handleTextAreaClick}
              >
              </CFormTextarea>
            </div>
          </CForm>
        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default CommaConversion