import React from 'react'

const FormBox = ({children}) => {
  return (
    <div className='page-bg'>
      <div className='formBoxWrapper'>
        {children}
      </div>
    </div>  
  )
}

export default FormBox
