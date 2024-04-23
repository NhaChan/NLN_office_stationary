import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { FastBackwardOutlined } from '@ant-design/icons'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'rgb(239, 239, 239)' }}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto' }} >
        <div style={{ padding: '20px 0px 20px' }}>
          <span style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '20px', color: 'green' }} onClick={() => { navigate('/') }}><FastBackwardOutlined /> Chi tiết sản phẩm</span>
        </div>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage