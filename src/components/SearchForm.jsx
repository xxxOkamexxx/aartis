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




	const handleSubmit = (e) => {
		//e.preventDefault()	
		console.log('klicked')
		// redirect: add query parameter
		navigate(`/search?q=${singleSelections.toString()}`)
		//setTearm('')
		onSubmit(searchInputRef.current.value)

		searchInputRef.current.value = ''
		setSingleSelections([])
		
	}
	
	useEffect(() => {
		getTags()
		// sconsole.log(options)
	},[data])

	// react to changes in page state
	useEffect(() => {
		setSingleSelections([])
		//searchInputRef.current.clear()
	}, [])
	
	
	
	//console.log(singleSelections.toString())
	//console.log(term)
	//console.log(searchInputRef)
	
	
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
						searchInputRef.current.value
						
						// redirect: add query parameter
						if(singleSelections.length > 0){
							return navigate(`/search?q=${singleSelections.toString()}`)
						}
						setSingleSelections([])
						searchInputRef.current.value = ''
					}}
					
				/>

			</Form>
		</div>
	)
}

export default SearchForm


