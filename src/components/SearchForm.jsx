import { useState, useRef, useEffect } from 'react'

import { Container, Alert, Col, Row, Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';



const SearchForm = ({options}) => {
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
			
					</Form.Group>
				</Form>

      
    </>
  )
}

export default SearchForm
