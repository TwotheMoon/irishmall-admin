import { atom } from 'recoil'

export const isLocalAtom = atom({
  key: 'isLocalKey',
  default: false
});

export const copyAlertAtom = atom({
  key: 'copyAlertKey',
  default: false
});

// 전역 로딩 인디케이터 트리거
export const isLoadingAtom = atom({
  key: 'isLoadingKey',
  default: false
});

// 모달 트리거
export const showModalAtom = atom({
  key: 'showModalKey',
  default: {
    type: "default",
    visible: false,
    title: "",
    desc: "",
    onClick: () => {},
    isCancelVisible: true
  }
});
