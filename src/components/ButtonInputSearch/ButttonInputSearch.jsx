import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButttonInputSearch = (props) => {
  const {
    size, placeholder, textbutton,
    bordered, backgroundColorInput = '#fff',
    backgroundColorButton = '#062644',
    colorButton = '#fff'
  } = props

  return (
    <div style={{ display: 'flex', borderRadius: '0px' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        variant="outlined"
        style={{ backgroundColor: backgroundColorInput, borderRadius: '0px'  }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{background: backgroundColorButton, border: !bordered && 'none',  borderRadius: '0px'  }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  )
}

export default ButttonInputSearch