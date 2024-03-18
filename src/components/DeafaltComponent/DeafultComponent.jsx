import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent/HeaderComponent'

const DeafultComponent = ({children}) => {
  return (
    <div>
      <HeaderComponent />
        {children}
    </div>
  )
}

export default DeafultComponent
