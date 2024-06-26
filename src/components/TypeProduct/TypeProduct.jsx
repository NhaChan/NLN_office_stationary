import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperType } from './styled'

const TypeProduct = ({ name }) => {
  const navigate = useNavigate()

  const handleNavigateType = (type) => {
    const normalizedType = type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_')
    navigate(`/product/${normalizedType}`, { state: type })
  }

  return (
    <WrapperType onClick={() => handleNavigateType(name)}>{name}</WrapperType>
  )
}

export default TypeProduct
