// 카피
export const handleCopy = (ref) => {
  try {
    if (ref.current && ref.current.value !== '') {
      ref.current.select()
      navigator.clipboard.writeText(ref.current.value)
    }
  } catch (error) {
    console.log(error)
  }
}

// 콤마 컨버전
export const commaConversionFn = (keywords) => {
  if (!keywords) return '';

  const conversionedWords = keywords
    .split(/[\n,]+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .join(',')

  return conversionedWords;
}

// 유닉스 시간 변환
export const formattedUnixToDate = (date) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }
  const formattedDate = new Intl.DateTimeFormat('en-GB', options)
    .format(date)
    .split(',')
    .map((part, i) => (i === 0 ? part.split('/').reverse().join('-') : part.trim()))
    .join(' ')

  return formattedDate
}

// 공통 모달 (api 리퀘스트)
export const commonReqModal = (
  type = 'default',
  title,
  desc = '',
  setShowModal = () => { },
  onClick = () => { },
) => {
  setShowModal({
    type,
    visible: true,
    title,
    desc,
    onClick,
    isCancelVisible: true,
  })
}

// 공통 모달 (api 리스폰스)
export const commonResModal = (res, title, setIsLoading = () => { }, setShowModal = () => { }) => {
  if (res.data.status === 200 || res.data.status === 500) {
    setIsLoading(false)

    setShowModal({
      type: 'default',
      visible: true,
      title,
      desc: res.data.message,
      onClick: () => {
        commonCloseModal(setShowModal)
      },
      isCancelVisible: false,
    })
  }
}

// 공통 모달 (Close 시 초기화용)
export const commonCloseModal = (setShowModal) => {
  setShowModal({
    type: 'default',
    visible: false,
    title: '',
    desc: '',
    onClick: () => { },
    isCancelVisible: false,
  })
}

export const commonErrorModal = (setIsLoading, setShowModal, error) => {
  setIsLoading(false)

  let errorMessage = '관리자에게 문의해주세요.'
  if (error?.details) {
    errorMessage = error.details
  } else if (error?.message) {
    errorMessage = error.message
  }

  setShowModal({
    type: 'error',
    visible: true,
    title: '오류가 발생했습니다.',
    desc: errorMessage,
    onClick: () => {
      commonCloseModal(setShowModal)
    },
    isCancelVisible: false,
  })
}
