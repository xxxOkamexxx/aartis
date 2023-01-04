import { Container, Alert, Col, Row } from 'react-bootstrap'

import BeatLoader from 'react-spinners/BeatLoader'
import AllWorks from './AllWorks'

const ImageBox = ({ query }) => {
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
		<Container>
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
