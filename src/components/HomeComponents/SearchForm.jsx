import { useState, useRef } from 'react'

import { Container, Alert, Col, Row, Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';


const SearchForm = ({ onSearch, options }) => {
  const [searchInput, setSearchInput] = useState([])

	
	const searchInputRef = useRef()
	

  const handleSubmit = async (e) => {
		e.preventDefault()
    console.log(e)

		if (!searchInput.length) {
			return
		}

		
		onSearch(searchInputRef)
  }


  return (
    <>
      <div className='header my-5'>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Typeahead
							id="basic-typeahead-single"
							labelKey="name"
							onChange={setSearchInput}
							options={options}
							placeholder="Search"
							selected={searchInput}
							ref={searchInputRef}
							//value={searchInput}
						/>
						{/* <Form.Control 
							aria-label="Search"
							onChange={e => setSearchInput(e.target.value)}
							placeholder="Search"
							ref={searchInputRef}
							required
							type="text"
							value={searchInput}
						/> */}
					</Form.Group>
				</Form>
			</div>
      
    </>
  )
}

export default SearchForm
