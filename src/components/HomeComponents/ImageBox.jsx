import { useState, useEffect, useRef } from 'react'

import { Container, Alert, Col, Row, Form } from 'react-bootstrap'

import BeatLoader from 'react-spinners/BeatLoader'

import AllWorks from './AllWorks'
import SearchForm from './SearchForm'


const ImageBox = ({ query }) => {
	const [options, setOptions] = useState([])

	console.log(query)

	// Get search keywords (Tags) from all 'work'documents.
	const getTags = async() => {
			if(query.data){
				const tags = query.data
				.map(work => work.tags)
				.flat(1)
				.filter((value, index, self) => self.indexOf(value) === index)
			setOptions(tags)
		}
	}

	useEffect(() => {
			
		getTags()

	},[query])

  console.log(options)


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

	
	const handleSearch = async q => {

	}

	


	return (
		<Container>
			<SearchForm onSearch={handleSearch} options={options}/>


			<Row xs={1} sm={2} md={3} lg={4}>
				{query.data && query.data.map(image => (
					<Col key={image.id} className="d-flex mb-4">
				
							<AllWorks image={image} />

					</Col>
				))}
			</Row>
		</Container>
	)
}

export default ImageBox
