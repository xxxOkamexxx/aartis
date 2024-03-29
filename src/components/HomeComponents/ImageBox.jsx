import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 

import useStreamCollection from '../../hooks/useStreamCollection'

import { Container, Alert, Col, Row, Form, Button } from 'react-bootstrap'

import BeatLoader from 'react-spinners/BeatLoader'

import AllWorks from './AllWorks'
import SearchForm from '../SearchForm'
import FilterButtons from './FilterButtons'



const ImageBox = ({ query, setPageQuery, pageQuery, data }) => {
	const [currentFilter, setCurrentFilter] = useState('all')
	const [newArrivals, setNewArrivals] = useState(false)

	//
	
	const [isDoc, setIsDoc] = useState(query)
	
	//console.log('page',pageQuery)
	
	// 'see more...' button
	const updatePost = () => {
		//setPage(page + 4)
		setPageQuery(pageQuery + 4)
		setNewArrivals(true)

		console.log(pageQuery)
  }
	
	
	//console.log(currentFilter)
	// check current filter 
	useEffect(() => {
		setNewArrivals(false)
		if(!query){	
			return
		}
		//const documents = query.data
		const document = query
				// .filter(doc => doc.category == currentFilter)
				// //.map (doc => doc.id)
				.filter(doc => {
					if(currentFilter == 'all') {
						return true
					} else if(currentFilter == 'illustration' || currentFilter == 'photograph'){
						return doc.category === currentFilter
					}					
				})
	
		//console.log(document.map(d => d.id))
		setIsDoc(document)


	},[query, currentFilter])
	
	//console.log(isDoc)
	

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

	

	//console.log(query)


	return (
		<Container>
			<div className='header my-5'>
				<SearchForm/> 
			</div>

			<FilterButtons currentFilter={currentFilter} changeFilter={changeFilter}/>
  
			<div className='works-box'>

				{ !newArrivals &&
					<h3 style={{color:'#fcfcfc'}}>
					New Arrivals
				</h3>
				}

				<Row xs={1} sm={2} md={3} lg={4}>
					{isDoc && isDoc.map(image => (
						<Col key={image.id} className="d-flex mb-4">
					
								<AllWorks image={image} />

						</Col>
					))}
				</Row>
				
				<Button 
          onClick={updatePost}
          className='btn-secondary'
					disabled={data.length <= pageQuery}
        >
          See more...
        </Button>
			</div>

		</Container>
	)
}

export default ImageBox
