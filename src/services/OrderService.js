import { axiosJWT } from "./UserService"

export const createOrder = async (data,access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getOrderByUserId = async (id,access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getDetailsOrder = async (id,access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const cancelOrder = async (id, access_token, orderItems, userId ) => {
  const data = {orderItems, orderId: id}
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, {data}, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

// export const updateOrder = async (id, access_token, data) => {
//   const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/update/${id}`, data, {
//       headers: {
//           token: `Bearer ${access_token}`,
//       }
//   })
//   return res.data
// }

export const updateOrder = async (id, isDelivered) => {
  try {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/update/${id}`, { isDelivered });
    return res.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};


// export const updateOrder = async (access_token, orderId, data) => {
//   try {
//     const res = await axiosJWT.put(
//       `${process.env.REACT_APP_API_URL}/order/update/${orderId}`,
//       data,
//       {
//         headers: {
//           token: `Bearer ${access_token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
//   }
// };