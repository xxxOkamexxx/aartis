import React from 'react'
import MyWorks from './myWorks'

import ListGroup from 'react-bootstrap/ListGroup';

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
      <div>MyWorksList</div>
      <p>Create your works!</p>
      <Container>
          {query.data && query.data.map(image => (
            <ListGroup key={image.id} className="d-flex mb-4">
              <MyWorks image={image} />
            </ListGroup>
          ))}
      </Container>
    </>
  )
}

export default MyWorksList