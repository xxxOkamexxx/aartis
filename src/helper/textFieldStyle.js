export const fieldsStyle = {
    '& .MuiInputBase-input': {
      color: '#000000',    
      backgroundColor: '#fcfcfc',  
      borderRadius: '4px',
    },
    '& label': {
      color: '#9D9876', // Normal label color 
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#9D9876', // Normal border color
    },
    '& label.Mui-focused': {
      color: '#9D9876',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#9D9876',  // Border color on hover
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#9D9876',    // Normal border color (outline)              
      },
      '&:hover fieldset': {
        borderColor: '#9D9876',    // Border color on hover (outline)
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#9D9876',
    },
}
