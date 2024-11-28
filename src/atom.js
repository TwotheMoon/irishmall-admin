import { atom } from 'recoil'

export const isLocalAtom = atom({
  key: 'isLocalKey',
  default: false
})
