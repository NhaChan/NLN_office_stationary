import React, { useState } from 'react'
import { WrapperInputStyle } from './style'
import { Input } from 'antd'

const InputForm = (props) => {
    // const { placeholder = 'Nhập text', ...rests } = props
    // const handleOnchangeInput = (e) => {
    //     props.onChange(e.target.value)
    // }
    // return (
    //     <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
    // )

    const [valueInput, setValuInput ] = useState ('')
    const { placeholder = 'Nhap text', ...rests } = props
    return (
        <WrapperInputStyle placeholder={placeholder} value={valueInput} {...rests}/>
    )
}

export default InputForm