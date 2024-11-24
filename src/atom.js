import { atom } from 'recoil'

export const isLocalAtom = atom({
  key: 'isLocalKey',
  default: false
})

export const tokenAtom = atom({
  key: 'tokenKey',
  default: ''
});

export const allCateAtom = atom({
  key: 'allCateKey',
  default: []
});
