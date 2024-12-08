import { atom } from 'recoil'

export const isLocalAtom = atom({
  key: 'isLocalKey',
  default: process.env.NODE_ENV === 'development',
})

export const copyAlertAtom = atom({
  key: 'copyAlertKey',
  default: false,
})

// 전역 로딩 인디케이터 트리거
export const isLoadingAtom = atom({
  key: 'isLoadingKey',
  default: false,
})

// 모달 트리거
export const showModalAtom = atom({
  key: 'showModalKey',
  default: {
    type: 'default',
    visible: false,
    title: '',
    desc: '',
    onClick: () => { },
    isCancelVisible: true,
  },
})

// 헤더 사이드바 트리거
export const sidebarShowAtom = atom({
  key: 'sidebarShowAtom',
  default: true,
})

// 사이드바 펼치기 트리거
export const sidebarUnfoldableAtom = atom({
  key: 'sidebarUnfoldableAtom',
  default: false,
})

// 테마 트리거
export const themeAtom = atom({
  key: 'themeAtom',
  default: 'dark',
})
