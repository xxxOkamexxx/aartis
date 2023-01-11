import { useState, useEffect, useRef } from 'react'

import { Container, Alert, Col, Row, Form } from 'react-bootstrap'

import BeatLoader from 'react-spinners/BeatLoader'

import AllWorks from './AllWorks'
import SearchForm from '../SearchForm'
import FilterButtons from './FilterButtons'



const ImageBox = ({ query }) => {
	const [options, setOptions] = useState([])
	const [currentFilter, setCurrentFilter] = useState('all')

	const [isDoc, setIsDoc] = useState()


	
	// // Get search keywords (Tags) from all 'work'documents.
	// const getTags = async() => {
	// 	if(query.data){
	// 		const tags = query.data
	// 		.map(work => work.tags)
	// 		.flat(1)
	// 		.filter((value, index, self) => self.indexOf(value) === index)
	// 		setOptions(tags)
	// 	}
	// }

	
	console.log(currentFilter)
	// check current filter 
	useEffect(() => {
		if(!query.data){	
			return
		}
		const documents = query.data
		const document = documents
				// .filter(doc => doc.category == currentFilter)
				// //.map (doc => doc.id)
				.filter(doc => {
					if(currentFilter == 'all') {
						return true
					} else if(currentFilter == 'illustration' || currentFilter == 'photograph'){
						return doc.category === currentFilter
					}					
				})
	
		console.log(document.map(d => d.id))
		setIsDoc(document)

	},[query, currentFilter])
	
	console.log(isDoc)
	
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

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter)
	}


	const handleSearch = async q => {

	}

	


	return (
		<Container>
			<div className='header my-5'>
				<SearchForm/> 
			</div>

			<FilterButtons currentFilter={currentFilter} changeFilter={changeFilter}/>
  

			<div className='works-box'>

				<h3 style={{color:'#fcfcfc'}}>
					New Arrivals
				</h3>

				<Row xs={1} sm={2} md={3} lg={4}>
					{isDoc && isDoc.map(image => (
						<Col key={image.id} className="d-flex mb-4">
					
								<AllWorks image={image} />

						</Col>
					))}
				</Row>
			</div>
		</Container>
	)
}

export default ImageBox
