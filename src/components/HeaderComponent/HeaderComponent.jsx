import { Badge, Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }


  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6} >
          <WrapperTextHeader>Office Stationary</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButttonInputSearch
            size="large"
            bordered={false}
            textbutton="Tìm kiếm"
            placeholder="input search text"
          />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: '30px' }} />
            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
              <div>
                <WrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
