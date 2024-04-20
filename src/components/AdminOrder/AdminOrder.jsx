import { Button, Drawer, Form, Select, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { WrapperHeader } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { convertPrice } from '../../utils'
import * as message from '../Message/Message'

import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { orderContant } from '../../contant'
import { Link } from 'react-router-dom'
import { SearchOutlined, MoreOutlined, EditOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'

const AdminOrder = () => {
  const user = useSelector((state) => state?.user)
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { Option } = Select;
  const searchInput = useRef(null);



  const showEditForm = (order) => {
    setSelectedOrder(order);
    setEditFormVisible(true);
  };

  const handleEditFormSubmit = async (values) => {
    try {
      const updatedOrder = { ...selectedOrder, isDelivered: values.isDelivered };
      await OrderService.updateOrder(selectedOrder._id, values.isDelivered);
      message.success('Cập nhật trạng thái đơn hàng thành công!');
      // Đóng form chỉnh sửa
      setEditFormVisible(false);
      queryOrder.refetch();
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
    <Button type="link" onClick={() => showEditForm(record)}><EditOutlined /></Button>
  );

  // const renderDetail = (text, record) => (
  //   <Link to={`/order/${record.id}`}>
  //     <Button type="link">Chi tiết</Button>
  //   </Link>
  // );

  const renderDetail = (text, record) => (
    console.log('id', record._id),
    <Link Link to={{ pathname: `/detail-order/${record._id}`, state: { orderId: record.id } }}>
      <Button type="link"><MoreOutlined /></Button>
    </Link >
  );

  //Search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });


  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      sorter: (a, b) => a._id.length - b._id.length,
      ...getColumnSearchProps('_id')
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    // {
    //   title: 'Paided',
    //   dataIndex: 'isPaid'
    // },

    // {
    //   title: 'Phương thức thanh toán',
    //   dataIndex: 'paymentMethod', 
    //   ...getColumnSearchProps('paymentMethod')
    // },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      filters: [
        {
          text: '>= 3.000.000',
          value: '>=',
        },
        {
          text: '< 3.000.000',
          value: '<',
        }
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 3000000
        }
        return record.price < 3000000
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDelivered',
      ...getColumnSearchProps('isDelivered'),
      render: (isDelivered) => {
        let statusStyle = {}; // Khởi tạo đối tượng để lưu trữ CSS inline

        // Kiểm tra nếu isDelivered là một chuỗi
        if (typeof isDelivered === 'string') {
          switch (isDelivered) {
            case 'Chờ xác nhận':
              statusStyle = { color: 'orange', fontWeight: 'bold', boxShadow: '0px 0px 5px 0px rgba(255, 215, 0, 1)' };
              return <span style={statusStyle}>Chờ xác nhận</span>;
            case 'Đang giao':
              statusStyle = { color: 'blue', fontWeight: 'bold', boxShadow: '0px 0px 5px 0px rgba(0,128,0,0.5)' };
              return <span style={statusStyle}>Đang giao hàng</span>;
            case 'Đã giao':
              statusStyle = { color: 'green', fontWeight: 'bold', boxShadow: '0px 0px 5px 0px rgba(0,128,0,0.5)' };
              return <span style={statusStyle}>Đã giao hàng</span>;
            case 'Đã hủy':
              statusStyle = { color: 'red', fontWeight: 'bold', textDecoration: 'line-through', boxShadow: '0px 0px 5px 0px rgba(128,0,0,0.5)' };
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
      title: '',
      dataIndex: 'action',
      render: renderAction
    },
    {
      title: '',
      dataIndex: 'action',
      render: renderDetail
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
              <Option value="Chờ xác nhận">Chờ xác nhận</Option>
              <Option value="Đang giao">Đang giao hàng</Option>
              <Option value="Đã giao">Đã giao</Option>
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