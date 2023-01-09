import React from 'react'

const FormBox = ({children}) => {
  return (
    <div className='page-bg'>
      <div className='formWrapper'>
        {children}
      </div>
    </div>  
  )
}

export default FormBox
