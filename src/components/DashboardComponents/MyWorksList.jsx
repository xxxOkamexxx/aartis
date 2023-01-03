import React from 'react'
import MyWorks from './MyWorks'

import { Container, Alert, ListGroup } from 'react-bootstrap'
import BeatLoader from 'react-spinners/BeatLoader'

const MyWorksList = ({ query }) => {
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

  return (
    <>
      <Container>
        <div>MyWorksList</div>
        <p>Create your works!</p>
        <ListGroup>
          {query.data && query.data.map(image => (
            <ListGroup.Item key={image.id} className="d-flex mb-4 list-container">
              <MyWorks image={image} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  )
}

export default MyWorksList