import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CFormLabel,
  CFormTextarea,
  CMultiSelect,
  CSmartTable,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilMinus } from '@coreui/icons'
import Draggable from 'react-draggable';
import { isLocalAtom } from '../../atom';
import { useRecoilValue } from 'recoil';
import { apiServerBaseUrl, getAdKeywordApiEp, localServerBaseUrl } from '../../api';


const SearchKeywordTool = () => {
  const isLocal = useRecoilValue(isLocalAtom);
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [includeWords, setIncludeWords] = useState([]);
  const [excludeWords, setExcludeWords] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [printItems, setPrintItems] = useState([]);
  const [selectedRelKeywords, setSelectedRelKeywords] = useState([]);
  const [showDupAlert, setShowDupAlert] = useState(false)
  const [duplicateWordCount, setDuplicateWordCount] = useState(0)
  const [duplicateState, setDuplicateState] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const txArea1Ref = useRef();
  const memoTxAreaRef = useRef();
  const searchBtnRef = useRef();
  
  // 키워드 입력시 5개 유효성 검사
  const handleSearchKeywords = (selectedOptions) => {
    
    if(selectedOptions.length > 5) return;
    setSearchKeywords(selectedOptions);
  };

  // 데이터 테이블 컬럼
  const columns = [
    {
      group: "추가",
      label: "",
      _props: {
        style: { textAlign: 'center', width: "100px", paddingBottom: "20px" },
      },
      children:[
        {
          key:"addBtn",
          label: `${selectedRelKeywords?.length} 추가됨`,
          sorter: false,
          _style: { textAlign: 'center', fontSize: "14px"},
        },
      ]
    },
    {
      group: "연관키워드",
      _props: {
        style: { textAlign: 'center', width: "20%", paddingBottom: "20px" },
      },
      children:[
        {
          key:"relKeyword",
          label:"",
          filter: true,
          sorter: true,
        },
      ]
    },
    {
      group: "월간검색수",
      _props: {
        style: { textAlign: 'center', paddingBottom: "20px" }
      },
      children: [
        {
          key: "monthlyPcQcCnt",
          label: "PC",
          _style: { textAlign: 'center', width: '100px' }
        },
        {
          key: "monthlyMobileQcCnt",
          label: "모바일",
          _style: { textAlign: 'center', width: '100px' }
        }
      ]
    },
    {
      group: "월평균클릭수",
      _props: {
        style: { textAlign: 'center', paddingBottom: "20px" }
      },
      children: [
        {
          key: "monthlyAvePcClkCnt",
          label: "PC",
           _style: { textAlign: 'center', width: '100px' }
        },
        {
          key: "monthlyAveMobileClkCnt",
          label: "모바일",
          _style: { textAlign: 'center', width: '100px' }
        }
      ]
    },      
    {
      group: "월평균클릭률",
      _props: {
        style: { textAlign: 'center', paddingBottom: "20px" }
      },
      children: [
        {
          key: "monthlyAvePcCtr",
          label: "PC",
          _style: { textAlign: 'center', width: '100px' }
        },
        {
          key: "monthlyAveMobileCtr",
          label: "모바일",
          _style: { textAlign: 'center', width: '100px' }
        }
      ]
    },
    {
      group: "경쟁정도",
      _props: {
        style: { textAlign: 'center', width: "100px", paddingBottom: "20px"},
      },
      children:[
        {
          key:"compIdx",
          label:"",
        },
      ]
    },
    {
      group: "월평균노출광고수",
      _props: {
        style: { textAlign: 'center', width: "100px", paddingBottom: "8px" },
      },
      children:[
        {
          key:"plAvgDepth",
          label:""
        },
      ]
    },
  ]

  // 키워드 검색
  const handleSearch = async () => {
    console.log(searchKeywords)
    const keywords = searchKeywords.map(item => item.value).join(',').replaceAll("-", "");

    try {
      setTableLoading(true);
      const res = await (await axios.post(
        `${isLocal ? localServerBaseUrl : apiServerBaseUrl}${getAdKeywordApiEp}`,
        {
          data: keywords,
        },
      )).data.data

      const transformedData = res.map((item) => ({
        relKeyword: item.relKeyword,
        monthlyPcQcCnt: item.monthlyPcQcCnt == "< 10" ? 0 : item.monthlyPcQcCnt,
        monthlyMobileQcCnt: item.monthlyMobileQcCnt == "< 10" ? 0 : item.monthlyMobileQcCnt,
        monthlyAvePcClkCnt: item.monthlyAvePcClkCnt,
        monthlyAveMobileClkCnt: item.monthlyAveMobileClkCnt,
        monthlyAvePcCtr: item.monthlyAvePcCtr,
        monthlyAveMobileCtr: item.monthlyAveMobileCtr,
        compIdx: item.compIdx,
        plAvgDepth: item.plAvgDepth,
        _cellProps: { 
          all: { className: 'text-end' },
          addBtn: { className: 'text-center' },
          relKeyword: { className: 'text-start' },
          compIdx: { className: 'text-center' },
          plAvgDepth: { className: 'text-end' }
        },
      }))

      if(includeWords.length > 0 || excludeWords.length > 0){
        applyFilters(transformedData);
      } else {
        setPrintItems(transformedData);
        setOriginalItems(transformedData);
      }
      setTableLoading(false);
    } catch (error) {
      console.log(error);
      setTableLoading(false);
    }
  };

  // 필터 적용
  const applyFilters = (transformedData) => {
    let filteredItems;
    if(transformedData){
      filteredItems = transformedData;
    } else {
      filteredItems = originalItems;
    }

    if (includeWords.length > 0) {
      filteredItems = filteredItems.filter(item =>
        includeWords.map(word => word.value.replaceAll("-", "")).some(includeWord =>
          item.relKeyword.replaceAll("-", "").includes(includeWord)
        )
      );
    }

    if (excludeWords.length > 0) {
      filteredItems = filteredItems.filter(item =>
        !excludeWords.map(word => word.value.replaceAll("-", "")).some(excludeWord =>
          item.relKeyword.replaceAll("-", "").includes(excludeWord)
        )
      );
    }

    setPrintItems(filteredItems);
  };

  // 포함할 단어 필터
  const filterIncludeWord = async (selectedOptions) => {
    setIncludeWords(selectedOptions);
    applyFilters();
  };

  // 제외할 단어 필터
  const filterExcludeWord = async (selectedOptions) => {
    setExcludeWords(selectedOptions);
    applyFilters();
  };
  
  // 변환된 키워드 복사
  const handleTextAreaClick = () => {
    if (txArea1Ref.current && txArea1Ref.current.value !== '') {
      txArea1Ref.current.select()

      navigator.clipboard.writeText(txArea1Ref.current.value)

      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 1500)
    }
  };

  // 키워드 중복 검사
  const checkDuplicate = () => {
    if (!memoTxAreaRef.current.value) return

    const words = memoTxAreaRef.current.value.split(",").map((word) => word.trim());
    const seen = new Set()
    const duplicateWords = new Set()

    if (!words) return

    words.forEach((word) => {
      if (seen.has(word)) {
        duplicateWords.add(word)
      } else {
        seen.add(word)
      }
    })

    if (!duplicateWords || duplicateWords.size == 0) {
      setDuplicateState(false)
      setShowDupAlert(true)
      setTimeout(() => {
        setShowDupAlert(false)
      }, 1500)
    } else {
      setDuplicateState(true)
      setDuplicateWordCount(duplicateWords.size)
      setShowDupAlert(true)

      setTimeout(() => {
        setShowDupAlert(false)
      }, 1500)
    }

    const newWords = Array.from(seen).join(',')
    memoTxAreaRef.current.value = newWords;

    navigator.clipboard.writeText(newWords);

    seen.clear()
    duplicateWords.clear()
  }

  // 필터 적용
  useEffect(() => {
    applyFilters();
  }, [includeWords, excludeWords])

  // ctrl + enter 시 검색어 조회
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        searchBtnRef.current.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <CAccordionItem itemKey={1} className="mb-4">
        <CAccordionHeader className="w-100">키워드 도구</CAccordionHeader>
        <CAccordionBody>
          {/* 검색어 필터 */}
          <div className='d-flex gap-4 position-relative'>
            <div className="d-flex flex-column gap-3 w-50">
              <CFormLabel htmlFor="textArea1">
                  키워드 검색
              </CFormLabel>
              <div className='d-flex gap-2'>
                <CIcon icon={cilSearch} style={{width: "20px"}} customClassName="nav-icon" />
                <CMultiSelect 
                  options={searchKeywords}
                  className='search-type-inputs_keyword'
                  placeholder='키워드 입력 (최대 5개)'
                  optionsStyle="text"
                  selectionType="tags"
                  searchable={false}
                  allowCreateOptions
                  onChange={(selectedOptions) => handleSearchKeywords(selectedOptions)}
                  optionsTemplate={option => option.label}
                />
              </div>
              <div className='d-flex gap-2'>
                <CIcon icon={cilPlus} style={{width: "20px"}} customClassName="nav-icon" />
                <CMultiSelect 
                  options={includeWords}
                  className='search-type-inputs_include'
                  placeholder='포함할 단어'
                  optionsStyle="text"
                  selectionType="tags"
                  searchable={false}
                  allowCreateOptions
                  onChange={(selectedOptions) => filterIncludeWord(selectedOptions)}
                  optionsTemplate={option => option.label}
                />
              </div>
              <div className='d-flex gap-2'>
                <CIcon icon={cilMinus} style={{width: "20px"}}customClassName="nav-icon" />
                <CMultiSelect 
                  options={excludeWords}
                  className='search-type-inputs_exclude'
                  placeholder='제외할 단어'
                  optionsStyle="text"
                  selectionType="tags"
                  searchable={false}
                  allowCreateOptions
                  onChange={(selectedOptions) => filterExcludeWord(selectedOptions)}
                  optionsTemplate={option => option.label}
                />
              </div>
              <div className='d-flex gap-3'>
                <CButton color="primary" ref={searchBtnRef} onClick={handleSearch}>
                  조회
                </CButton>
                <CButton color="warning" variant='outline'onClick={() => {
                  setIncludeWords([]);
                  setExcludeWords([]);
                  setSearchKeywords([]);
                  setSelectedRelKeywords([]);
                  setPrintItems([]);
                  setOriginalItems([]);
                  txArea1Ref.current.value = '';
                  const selectersDom = document.querySelectorAll('.search-type-inputs_keyword, .search-type-inputs_include, .search-type-inputs_exclude');
                  selectersDom.forEach(selecter => {
                    const cleanerButton = selecter.querySelector('.form-multi-select-cleaner');
                    if (cleanerButton) {
                      cleanerButton.click();
                    }
                  });
                }}>
                  모두 초기화
                </CButton>
                <CButton color="info" variant='outline' onClick={() => {
                  setIncludeWords([]);
                  setExcludeWords([]);
                  const selectersDom = document.querySelectorAll('.search-type-inputs_include, .search-type-inputs_exclude');
                  selectersDom.forEach(selecter => {
                    const cleanerButton = selecter.querySelector('.form-multi-select-cleaner');
                    if (cleanerButton) {
                      cleanerButton.click();
                    }
                  });
                }}>
                  필터 초기화
                </CButton>
              </div>
            </div>

            {/* 키워드 변환 결과 */}
            <div className="mb-3 w-50">
              <CFormLabel htmlFor="textArea1">
                변환된 키워드 &nbsp;
                <CButton 
                  color='warning' 
                  variant='outline' 
                  style={{marginRight: '10px'}}
                  onClick={() => {
                    txArea1Ref.current.value = ''
                    setSelectedRelKeywords([]);
                    }}>
                  초기화
                </CButton>
                <CButton 
                  color="secondary" 
                  variant='outline' 
                  onClick={() => setShowCard(true)}>
                  메모장
                </CButton>
                   {/* 플로팅 카드 */}
                    {showCard && (
                      <Draggable cancel="button, textarea">
                        <CCard
                          style={{
                            position: 'absolute',
                            top: '0%',
                            left: '70%',
                            zIndex: 1000,
                            cursor: 'move',
                            width: '600px',
                            height: '300px',
                          }}
                        >
                          <CCardBody>
                            <CFormLabel htmlFor="floatingTextArea" className='d-flex justify-content-between'>
                              <span>
                                메모장
                              </span>
                              <CButton 
                                color='info' 
                                onClick={checkDuplicate}>
                                중복 제거
                              </CButton>
                            </CFormLabel>
                            <CAlert
                              color={duplicateState ? 'success' : 'primary'}
                              className="position-absolute"
                              style={{ top: '0px', right: '130px' }}
                              dismissible
                              visible={showDupAlert}
                              onClose={() => setShowDupAlert(false)}
                            >
                              {duplicateState
                                ? `총 ${duplicateWordCount}개의 중복된 키워드를 삭제했습니다.`
                                : '중복된 키워드가 없습니다.'}
                            </CAlert>
                            <CFormTextarea
                              id="floatingTextArea"
                              style={{ minHeight: '200px', height: 'auto', resize: 'none' }}
                              ref={memoTxAreaRef}
                            ></CFormTextarea>
                            <CButton color="secondary" onClick={() => setShowCard(false)} className="mt-2">
                              닫기
                            </CButton>
                          </CCardBody>
                        </CCard>
                      </Draggable>
                    )}
              </CFormLabel>
              <CFormTextarea
                id="textArea1"
                ref={txArea1Ref}
                style={{ minHeight: '200px', height: 'auto', resize: 'none' }}
                value={selectedRelKeywords}
                onClick={handleTextAreaClick}></CFormTextarea>
            </div>
            <CAlert
              color="primary"
              className="position-absolute end-0"
              style={{ top: '0px' }}
              dismissible
              visible={showAlert}
              onClose={() => setShowAlert(false)}
            >
              복사되었습니다.
            </CAlert>
          </div>
          
          {/* 데이터 테이블 */}
          <CSmartTable
            activePage={1}
            clickableRows
            columns={columns}
            columnSorter={{ resetable: true }}
            items={printItems}
            loading={tableLoading}
            itemsPerPageSelect
            itemsPerPage={50}
            itemsPerPageOptions={[5, 10, 20, 50, 100, 200]}
            pagination
            noItemsLabel={"검색 결과가 없습니다."}
            tableProps={{
              responsive: true,
              striped: true,
              hover: true,
              bordered: true,
            }}
            tableBodyProps={{
              className: 'align-middle',
            }}
            scopedColumns={{
              addBtn: (item) => (
                <td className='text-center'>
                  <CButton 
                    color="primary"
                    variant={selectedRelKeywords.includes(item.relKeyword) ? 'outline' : ''}
                    size="sm" 
                    onClick={() => {
                      if(selectedRelKeywords.includes(item.relKeyword)) { 
                        setSelectedRelKeywords(prev => prev.filter(keyword => keyword !== item.relKeyword));
                      } else {
                        setSelectedRelKeywords(prev => [...prev, item.relKeyword]);
                      }
                    }}>
                      {selectedRelKeywords.includes(item.relKeyword) ? '취소' : '추가'}
                  </CButton>
                </td>
              ),
              monthlyPcQcCnt: (item) => (
                <td className='text-end'>
                  {item.monthlyPcQcCnt === 0 ? "< 10" : item.monthlyPcQcCnt.toLocaleString()}
                </td>
              ),
              monthlyMobileQcCnt: (item) => (
                <td className='text-end'>
                  {item.monthlyMobileQcCnt === 0 ? "< 10" : item.monthlyMobileQcCnt.toLocaleString()}
                </td>
              ),
              monthlyAvePcCtr: (item) => (
                <td className='text-end'>
                  {item.monthlyAvePcCtr.toFixed(2)} %
                </td>
              ),
              monthlyAveMobileCtr: (item) => (
                <td className='text-end'>
                  {item.monthlyAveMobileCtr.toFixed(2)} %
                </td>
              ),
            }}
          />
        </CAccordionBody>
      </CAccordionItem>

    </>
  )
}

export default SearchKeywordTool
