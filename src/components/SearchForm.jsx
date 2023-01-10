import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Input } from 'react-bootstrap-typeahead'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
	const [term, setTearm] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
	
		// redirect: add query parameter
		navigate(`/search?q=${term}`)
	}
	
	return (
		<div className='search-bar'>
			<Form
				onSubmit={handleSubmit} 
			>
				<Form.Control 
					placeholder='Search'
					type="text"
					id='search'
					onChange={(e) => setTearm(e.target.value)} 
					required
				/>
			</Form>
		</div>
	)
}

export default SearchForm


// import { useState, useRef, useEffect } from 'react'

// import { Container, Alert, Col, Row, Form } from 'react-bootstrap'
// import { Typeahead } from 'react-bootstrap-typeahead';



// const SearchForm = ({options}) => {
//   const [searchInput, setSearchInput] = useState([])

// 	const searchInputRef = useRef()




//   const handleSubmit = async (e) => {
// 		e.preventDefault()
//     console.log(e)

// 		if (!searchInput.length) {
// 			return
// 		}
		
// 		onSearch(searchInputRef)
//   }


//   return (
//     <>
  
// 				<Form onSubmit={handleSubmit}>
// 					<Form.Group>
						
// 						<Typeahead
// 							id="basic-typeahead-single"
// 							labelKey="name"
// 							onChange={setSearchInput}
// 							options={options}
// 							placeholder="Search"
// 							selected={searchInput}
// 							ref={searchInputRef}
// 							//value={searchInput}
// 						/>
			
// 					</Form.Group>
// 				</Form>

      
//     </>
//   )
// }

// export default SearchForm
