import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import React from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../TableComponent/TableComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const AdminProduct = () => {
  const user = useSelector((state) => state?.user)

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
  const { data: products } = queryProduct
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '20px', cursor: 'pointer', padding: '5px'  }}  />
        <EditOutlined style={{ color: 'orange', fontSize: '20px', cursor: 'pointer', padding: '5px'  }} />
      </div>
    )
  }

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Kho',
      dataIndex: 'countInStock',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
    },
    {
      title: 'Thực hiện',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })


  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} data={dataTable} />
      </div>
    </div>
  )
}

export default AdminProduct