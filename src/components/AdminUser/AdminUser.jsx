import { Form } from 'antd'
import React from 'react'
import { WrapperHeader} from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useQueryClient } from '@tanstack/react-query'

const AdminUser = () => {
  const user = useSelector((state) => state?.user)
  
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    address: ''
  })

  const [form] = Form.useForm();

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        avatar: res.data?.avatar
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const dataTable = users?.data?.length > 0 && users?.data
  .filter(user => !user.isAdmin) // Lọc ra những người dùng không phải là admin
  .map(user => ({ ...user, key: user._id }));

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent  columns={columns} data={dataTable} onRow={(record, rowIndex) => {

        }} />
      </div>
    </div>
  )
}

export default AdminUser

