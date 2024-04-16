import React from 'react';
import { WrapperContainer, WrapperItemOrder, WrapperItemOrderInfo, WrapperTotal, Lable, WrapperValue } from './style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';

const OrderSuccess = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: '#f5f5fa', width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <WrapperContainer>
        <h3 style={{ textAlign: 'center' }}>Đơn hàng đặt thành công</h3>
        <div style={{ padding: '20px' }}>
          {state && (
            <>
              <WrapperItemOrderInfo>
                <WrapperValue>
                  <Lable>Phương thức giao hàng: </Lable>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span>
                </WrapperValue>
              </WrapperItemOrderInfo>
              <WrapperItemOrderInfo>
                <WrapperValue>
                  <Lable>Phương thức thanh toán: </Lable>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </WrapperItemOrderInfo>
              {state.orders.map((order, index) => (
                <WrapperItemOrder key={index}>
                  <img src={order.image} alt={order.name} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                  <div style={{ flex: '1', marginLeft: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{order.name}</div>
                    <div style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order.price)}</div>
                    <div style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order.amount}</div>
                    {/* <div style={{ fontSize: '13px', color: '#242424' }}>Phí giao hàng: {convertPrice(state.diliveryPriceMemo)}</div> */}
                  </div>
                </WrapperItemOrder>
              ))}
              <WrapperTotal>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Tổng tiền:</span>
                <span style={{ fontSize: '16px', color: 'red' }}>{convertPrice(state.totalPriceMemo)}</span>
              </WrapperTotal>
            </>
          )}
        </div>
      </WrapperContainer>
    </div>
  );
};

export default OrderSuccess;
