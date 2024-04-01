import { Input } from 'antd'
import React from 'react'

const InputComponent = ({size, placeholder, bordered, style, ...rests }) => {
  return (
    <Input 
        size={size} 
        placeholder={placeholder} 
        variant="outlined"
        style={style}
        {...rests} 
    />
  )
}

export default InputComponent