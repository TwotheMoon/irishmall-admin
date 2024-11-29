import { atom } from 'recoil'

export const isLocalAtom = atom({
  key: 'isLocalKey',
  default: false
})

export const copyAlertAtom = atom({
  key: 'copyAlertKey',
  default: false
})

export const isLoadingAtom = atom({
  key: 'isLoadingKey',
  default: false
})

export const showModalAtom = atom({
  key: 'showModalKey',
  default: {
    visible: false,
    title: "",
    desc: "",
    confirm: "",
    cancle: "",
    onClick: () => {},
    isCancelVisible: true
  }
})