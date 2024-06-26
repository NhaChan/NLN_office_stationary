import React, { useEffect, useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus, WrapperStatusCancel } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'
import StepComponent from '../../components/StepConponent/StepComponent';

const MyOrderPage = () => {
  const [disabledButtons, setDisabledButtons] = useState({});
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token)
    return res.data
  }
  const user = useSelector((state) => state.user)

  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token, // Chuyển state?.id và state?.token thành boolean
  });

  const { isPending, data } = queryOrder

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems, userId } = data
      const res = OrderService.cancelOrder(id, token, orderItems, userId)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    setDisabledButtons({ ...disabledButtons, [order._id]: false });
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
        setDisabledButtons({ ...disabledButtons, [order._id]: true });
      },
    })
  }


  const { isPending: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success()
    } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    } else if (isErrorCancle) {
      message.error()
    }
  }, [isErrorCancle, isSuccessCancel])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={order?.image}
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px'
          }}
        />
        <div style={{
          width: 260,
          // overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: '10px'
        }}>{order?.name}</div>
        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
      </WrapperHeaderItem>
    })
  }

  const itemsDelivery = [
    {
      title: 'Chờ xác nhận',
      description: 'Đã đặt hàng & Đang chờ xác nhận',
    },
    {
      title: 'Đang giao hàng',
      description: 'Đang vận chuyển',
    },
    {
      title: 'Đã giao hàng',
      description: 'Giao hàng thành công',
    },
  ]



  return (
    <Loading isPending={isPending || isLoadingCancel}>
      <WrapperContainer>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '25px', padding: '20px' }}>
            Đơn hàng của tôi
          </div>
          <WrapperListOrder>
            {data?.map((order) => {
              // console.log(order.isDelivered);
              // console.log(order)
              return (
                <WrapperItemOrder key={order?._id}>
                  {order.isDelivered === "Đã hủy" ?
                    <button
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        border: 'none',
                        padding: '15px 15px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        fontWeight: 'bold'
                        
                      }}
                    >
                      Đã hủy
                    </button>
                  : <WrapperStatus>
                    <StepComponent items={itemsDelivery} current={order.isDelivered === 'Chờ xác nhận'
                      ? 1 : order.isDelivered === 'Đang giao' ? 2 : 3} />
                  </WrapperStatus>}

                  <WrapperStatus>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                      <span style={{ color: '#4988B2', fontWeight: 'bold' }}>{`${order.isPaid ? 'Thanh toán chuyển khoản  khi nhận hàng' : 'Thanh toán tiền mặt khi nhận hàng'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                      <span
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {order.isDelivered === 'Chờ xác nhận' && <WrapperStatusCancel
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          borderRadius: '4px',
                          background: 'rgb(255, 57, 69)'
                        }}
                        textbutton={'Hủy đơn hàng'}
                        styleTextButton={{ color: '#fff', fontSize: '14px' }}
                        disabled={disabledButtons[order._id] || order.isDelivered !== 'Chờ xác nhận'}
                      >
                      </WrapperStatusCancel>}
                      {/* <WrapperStatusCancel
                        onClick={() => {
                          if (order.isDelivered === 'Chờ xác nhận') {
                            handleCanceOrder(order);
                          } else {
                            console.log("Không thể hủy đơn hàng ở trạng thái này.");
                          }
                        }}
                        size={40}
                        styleButton={{
                          height: '36px',
                          borderRadius: '4px',
                          background: 'rgb(255, 57, 69)'
                        }}
                        textbutton={'Hủy đơn hàng'}
                        styleTextButton={{ color: '#fff', fontSize: '14px' }}
                        disabled={disabledButtons[order._id] || order.isDelivered !== 'Chờ xác nhận'}
                      >
                      </WrapperStatusCancel> */}
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid #4988B2',
                          borderRadius: '4px'
                        }}
                        textbutton={'Xem chi tiết'}
                        type="outline"
                        styleTextButton={{ color: '#4988B2', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage