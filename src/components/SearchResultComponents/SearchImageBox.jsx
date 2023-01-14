import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

import { Container, Alert, Col, Row, Form } from 'react-bootstrap'

import BeatLoader from 'react-spinners/BeatLoader'


import SearchForm from '../SearchForm'
import SearchAllWorks from './SearchAllWorks'
import SearchFilterButtons from './SearchFilterButtons'



const SearchImageBox = ({ query, search }) => {
	// const queryString = useLocation().search
  // const queryParams = new URLSearchParams(queryString)
  // const q = queryParams.get('q') ?? ''

	// const [currentFilter, setCurrentFilter] = useState('all')
	// const [isDoc, setIsDoc] = useState()


	console.log(query.data, search)
	//console.log(currentFilter)

	useEffect(() => {
		if(!query){
			return
		}
		const getNewSearch = async () => {
			query.data
		}
		getNewSearch()
	},[search])



	// check current filter 
	// useEffect(() => {
	// 	setCurrentFilter('all')
	// 	if(!query.data){	
	// 		return
	// 	}
	// 	const documents = query.data
	// 	const document = documents
	// 			// .filter(doc => doc.category == currentFilter)
	// 			// //.map (doc => doc.id)
	// 			.filter(doc => {
	// 				if(currentFilter == 'all') {
	// 					return true
	// 				} else if(currentFilter == 'illustration' || currentFilter == 'photograph'){
	// 					return doc.category === currentFilter
	// 				}					
	// 			})
	
	// 	console.log(document.map(d => d.id))
	// 	setIsDoc(document)

	// },[query])
	
	// console.log(isDoc)
	
	// get tags
	// useEffect(() => {			
	// 	getTags()
	// },[query])

  //console.log(options)


	if (query.isError) {
		// show error
		return (
			<Alert variant='warning'>
				<strong>Error!</strong> {query.error.message}
			</Alert>
		)
	}

	if (query.isLoading) {
		// show spinner
		return <BeatLoader color={'#AD9510'} />
	}

	// const changeFilter = (newFilter) => {
	// 	setCurrentFilter(newFilter)
	// }


	const handleSearch = async q => {

	}

	


	return (
		<Container>
			<div className='header my-5'>
				<SearchForm/> 
			</div>

			{/* <SearchFilterButtons currentFilter={currentFilter} changeFilter={changeFilter}/> */}
  

			<div className='works-box'>

				<h3 style={{color:'#fcfcfc'}}>
					{`Search result for '${search}'`}
				</h3>

				<Row xs={1} sm={2} md={3} lg={4}>
					{query.data && query.data.map(image => (
						<Col key={image.id} className="d-flex mb-4">
					
								<SearchAllWorks image={image} />

						</Col>
					))}
				</Row>
			</div>
		</Container>
	)
}

export default SearchImageBox
