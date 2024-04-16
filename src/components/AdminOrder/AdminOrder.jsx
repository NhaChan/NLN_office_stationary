import { Button, Drawer, Form, Select } from 'antd'
import React, { useState } from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { convertPrice} from '../../utils'
import * as message from '../Message/Message'

import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'

const AdminOrder = () => {
  const user = useSelector((state) => state?.user)
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { Option } = Select;


  const showEditForm = (order) => {
    setSelectedOrder(order);
    setEditFormVisible(true);
  };

const handleEditFormSubmit = async (values) => {
  try {
    const updatedOrder = { ...selectedOrder, isDelivered: values.isDelivered };
    await OrderService.updateOrder(user?.access_token, updatedOrder);
    message.success('Cập nhật trạng thái đơn hàng thành công!');
    // Đóng form chỉnh sửa
    setEditFormVisible(false);
  } catch (error) {
    console.error('Error updating order:', error);
    message.error('Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.');
  }
};

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    return res
  }


  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder


  const renderAction = (text, record) => (
    <Button type="link" onClick={() => showEditForm(record)}>Edit</Button>
  );
  


  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'userName'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    // {
    //   title: 'Paided',
    //   dataIndex: 'isPaid'
    // },

    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDelivered',
      render: (isDelivered) => {
        let statusStyle = {}; // Khởi tạo đối tượng để lưu trữ CSS inline
    
        // Kiểm tra nếu isDelivered là một chuỗi
        if (typeof isDelivered === 'string') {
          switch (isDelivered) {
            case 'Đã đặt':
              statusStyle = { color: 'blue', fontWeight: 'bold', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)' };
              return <span style={statusStyle}>Đã đặt hàng</span>;
            case 'Đã giao':
              statusStyle = { color: 'green',  boxShadow: '0px 0px 5px 0px rgba(0,128,0,0.5)' }; 
              return <span style={statusStyle}>Đã giao hàng</span>;
            case 'Đã hủy':
              statusStyle = { color: 'red', textDecoration: 'line-through', boxShadow: '0px 0px 5px 0px rgba(128,0,0,0.5)' }; 
              return <span style={statusStyle}>Đã hủy đơn</span>;
            default:
              return 'Không xác định';
          }
        } else {
          return 'Không xác định';
        }
      }
    },
    
    {
      title: 'Thực hiện',
      dataIndex: 'action',
      render: renderAction
    },
    
    

  ];

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    // console.log('user', order)
    return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod], totalPrice: convertPrice(order?.totalPrice) }
  })

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>

      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns} isLoading={isLoadingOrders} data={dataTable} />
      </div>

      <Drawer
        title="Chỉnh sửa đơn hàng"
        visible={editFormVisible}
        onClose={() => setEditFormVisible(false)}
        width={400}
      >
        <Form layout="vertical" onFinish={handleEditFormSubmit} initialValues={selectedOrder}>
          <Form.Item name="isDelivered" label="Trạng thái">
            <Select>
              <Option value="Đã đặt">Đã đặt</Option>
              <Option value="Đã giao">Đã giao</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Lưu</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default AdminOrder