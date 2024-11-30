import React, { useState } from "react";
import { 
  CAccordionBody, 
  CAccordionHeader, 
  CAccordionItem } from "@coreui/react-pro";

const WhiteList = () => {

  const [details, setDetails] = useState([])
const columns = [
  {
    key: 'avatar',
    label: '',
    filter: false,
    sorter: false,
  },
  {
    key: 'name',
    _style: { width: '20%' },
  },
  {
    key: 'registered',
    sorter: (date1, date2) => {
      const a = new Date(date1.registered)
      const b = new Date(date2.registered)
      return a > b ? 1 : b > a ? -1 : 0
    }
  },
  { 
    key: 'role',
    _style: { width: '20%' }
  },
  'status',
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false,
    sorter: false,
  },
]
const items = [
  {
    id: 1,
    name: 'Samppa Nori',
    avatar: '1.jpg',
    registered: '2021/03/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Estavan Lykos',
    avatar: '2.jpg',
    registered: '2018/02/07',
    role: 'Staff',
    status: 'Banned'
  },
  {
    id: 3,
    name: 'Chetan Mohamed',
    avatar: '3.jpg',
    registered: '2020/01/15',
    role: 'Admin',
    status: 'Inactive',
    _selected: true
  },
  {
    id: 4,
    name: 'Derick Maximinus',
    avatar: '4.jpg',
    registered: '2019/04/05',
    role: 'Member',
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Friderik Dávid',
    avatar: '5.jpg',
    registered: '2022/03/25',
    role: 'Staff',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Yiorgos Avraamu',
    avatar: '6.jpg',
    registered: '2017/01/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Avram Tarasios',
    avatar: '7.jpg',
    registered: '2016/02/12',
    role: 'Staff',
    status: 'Banned',
    _selected: true
  },
  {
    id: 8,
    name: 'Quintin Ed',
    avatar: '8.jpg',
    registered: '2023/01/21',
    role: 'Admin',
    status: 'Inactive'
  },
  {
    id: 9,
    name: 'Enéas Kwadwo',
    avatar: '9.jpg',
    registered: '2024/03/10',
    role: 'Member',
    status: 'Pending'
  },
  {
    id: 10,
    name: 'Agapetus Tadeáš',
    avatar: '10.jpg',
    registered: '2015/01/10',
    role: 'Staff',
    status: 'Active'
  },
  {
    id: 11,
    name: 'Carwyn Fachtna',
    avatar: '11.jpg',
    registered: '2014/04/01',
    role: 'Member',
    status: 'Active'
  },
  {
    id: 12,
    name: 'Nehemiah Tatius',
    avatar: '12.jpg',
    registered: '2013/01/05',
    role: 'Staff',
    status: 'Banned',
    _selected: true
  },
  {
    id: 13,
    name: 'Ebbe Gemariah',
    avatar: '13.jpg',
    registered: '2012/02/25',
    role: 'Admin',
    status: 'Inactive'
  },
  {
    id: 14,
    name: 'Eustorgios Amulius',
    avatar: '14.jpg',
    registered: '2011/03/19',
    role: 'Member',
    status: 'Pending'
  },
  {
    id: 15,
    name: 'Leopold Gáspár',
    avatar: '15.jpg',
    registered: '2010/02/01',
    role: 'Staff',
    status: 'Active'
  }
]
const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}
const toggleDetails = (index) => {
  const position = details.indexOf(index)
  let newDetails = details.slice()
  if (position !== -1) {
    newDetails.splice(position, 1)
  } else {
    newDetails = [...details, index]
  }
  setDetails(newDetails)
}

  return(
    <>
      <CAccordionItem itemKey={1} className='mb-4'>
        <CAccordionHeader className='w-100 position-relative'>Dev Settings</CAccordionHeader>
        <CAccordionBody>

        </CAccordionBody>
      </CAccordionItem>
    </>
  )
}

export default WhiteList