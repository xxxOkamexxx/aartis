import { useState, useRef } from 'react'

import { Container, Alert, Col, Row, Form } from 'react-bootstrap'


const SearchForm = ({ onSearch, options }) => {
  const [searchInput, setSearchInput] = useState('')
	
	const searchInputRef = useRef()
	

  const handleSubmit = async (e) => {
		e.preventDefault()
    console.log(e)

		if (!searchInput.length) {
			return
		}

		onSearch(searchInput)
  }


  return (
    <>
      <div className='header'>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Control 
							aria-label="Search"
							onChange={e => setSearchInput(e.target.value)}
							placeholder="Search"
							ref={searchInputRef}
							required
							type="text"
							value={searchInput}
						/>
					</Form.Group>
				</Form>
			</div>
      
    </>
  )
}

export default SearchForm
