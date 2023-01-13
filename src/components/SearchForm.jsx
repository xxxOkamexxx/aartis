import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form } from 'react-bootstrap'

import { Typeahead, TypeaheadMenu } from 'react-bootstrap-typeahead'

import useStreamCollection from '../hooks/useStreamCollection'


const SearchForm = ({onSubmit}) => {
	const [singleSelections, setSingleSelections] = useState([])
	const [options, setOptions] = useState([])
	//const [term, setTerm] = useState('')
	const navigate = useNavigate()
	const searchInputRef = useRef()

/**
 * Get tags for autocomplete
 */
	const { data } = useStreamCollection('work')
	
	//console.log(data)
	const getTags = async () => {
		if(data) {
			const tags = data
			.map(work => work.tags)
			.flat(1)
			.filter((value, index, self) => self.indexOf(value) === index)
			setOptions(tags)
		}
	}


	// useEffect(() => {
	// 	setTerm(singleSelections.toString())
	// },[singleSelections])



	// use onKeyDown instead av handle submit
	const handleSubmit = (e) => {
		e.preventDefault()	
		console.log('klicked')
		// redirect: add query parameter
		navigate(`/search?q=${singleSelections.toString()}`)
		//setTearm('')
		onSubmit(searchInputRef.current.value)

		searchInputRef.current.value = ''
		
	}
	
	useEffect(() => {
		getTags()
		console.log(options)
	},[data])

	// react to changes in page state
	// useEffect(() => {
	// 	searchInputRef.current
	// }, [])
	
	
	
	console.log(singleSelections.toString())
	//console.log(term)
	console.log(searchInputRef)
	
	
	return (
		<div className='search-bar'>
			<Form
				onSubmit={handleSubmit} 
			>

				<Typeahead
					id="search"
					labelKey="search"
					onChange={setSingleSelections}
					options={options}
					placeholder="Search"
					selected={singleSelections}
					ref={searchInputRef}
					onKeyDown={() => {
						// Submit the form when the user hits enter.
						console.log('klicked')
						
						// redirect: add query parameter
						navigate(`/search?q=${singleSelections.toString()}`)
						searchInputRef.current.value
					}}
					
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
