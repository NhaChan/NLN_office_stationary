import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import {
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperLabel,
  WrapperContentInfo,
  WrapperStyleContent,
  WrapperProduct,
  WrapperNameProduct,
  WrapperItem,
  WrapperItemLabel,
  WrapperAllPrice,
  WrapperItemOrderInfo,
} from './style';
import { FastBackwardOutlined } from '@ant-design/icons'


const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;
  const navigate = useNavigate();

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['orders-details'],
    queryFn: fetchDetailsOrder,
    enabled: !!id, // Convert id to a boolean value
  });
  const { isPending, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isPending={isPending}>
      <div style={{ paddingLeft: '280px', margin: '30px 0 30px'}}>
        <span style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '20px', color: 'green'  }} onClick={() => { navigate('/system/admin') }}><FastBackwardOutlined /> Trở về</span>
      </div>
      <div style={{ width: '100%', maxWidth: '975px', margin: '0 auto', background: '#f5f5fa', padding: '20px'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '25px', padding: '20px' }}>
          Chi tiết đơn hàng
        </div>
        <WrapperItemOrderInfo>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">{data?.shippingAddress?.fullName}</div>
                <div className="address-info">
                  <span>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                </div>
                <div className="phone-info">
                  <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className="delivery-info">
                  <span className="name-delivery">Giao hàng NHANH </span>
                </div>
                <div className="delivery-fee">
                  <span>Phí giao hàng: </span> {data?.shippingPrice}VND
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="payment-info"></div>
                <div className="status-payment">{data?.isPaid ? 'Thanh toán tiền mặt khi nhận hàng' : 'Thanh toán chuyển khoản khi nhận hàng'}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '670px' }}>Sản phẩm</div>
              <WrapperItemLabel>Giá</WrapperItemLabel>
              <WrapperItemLabel>Số lượng</WrapperItemLabel>
              <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((order) => (
              <WrapperProduct key={order._id}>
                <WrapperNameProduct>
                  <img
                    src={order?.image}
                    alt="product"
                    style={{
                      maxWidth: '77px',
                      maxHeight: '79px',
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px',
                    }}
                  />
                  <div
                    style={{
                      width: '260px',
                      // overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginLeft: '10px',
                      height: '70px',
                    }}
                  >
                    {order?.name}
                  </div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>
                  {order?.discount ? convertPrice((priceMemo * order?.discount) / 100) : '0 VND'}
                </WrapperItem>
              </WrapperProduct>
            ))}
            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </WrapperItemOrderInfo>

      </div>
    </Loading>
  );
};

export default DetailsOrderPage;
