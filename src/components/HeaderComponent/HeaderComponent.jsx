import { Badge, Col, Popover } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  // CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useEffect } from 'react';
import Loading from '../LoadingComponent/Loading';
import logo from '../../assets/images/2.png'


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {


  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  // const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  // const order = useSelector((state) => state.order)  
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user')
    } else if (type === 'admin') {
      navigate('/system/admin')
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }


  return (
    <div >
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={3} >
          <WrapperTextHeader to='/' >
              <img src={logo} style={{ maxWidth: '100px', maxHeight: '100px' }} alt="Logo" />
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={14}>
            <ButttonInputSearch
              size="large"
              variant="outlined"
              textbutton="Tìm kiếm"
              placeholder="input search text"
            />
          </Col>
        )}
        <Col span={7} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Loading isPending={loading}>
            <WrapperHeaderAccount >
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '30px',
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <div>
                    <WrapperTextHeaderSmall>Đăng nhập</WrapperTextHeaderSmall>
                    {/* <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div> */}
                  </div>
                </div>
              )}

            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
          <div  onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
            <Badge  count={4} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff', paddingLeft: '20px' }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
