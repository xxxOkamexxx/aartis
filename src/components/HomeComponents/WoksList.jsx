import React from 'react'

const WoksList = ({ image }) => {
  const { currentUser } = useAuthContext()

	return (
		<>
			<Card
				className={`image-card ${deleteImageMutation.isMutating ? 'mutating' : ''}`}
			>
				<Card.Header>
					<span className="image-filename" title={image.name}>
						{image.name}
					</span>
					<div className="card-actions">
						{currentUser && image.user === currentUser.uid && (
							<Button
								variant="danger"
								size="sm"
								disabled={deleteImageMutation.isMutating}
								onClick={() => deleteImageMutation.mutate(image)}
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</Button>
						)}
					</div>
				</Card.Header>

				<ModalImage
					small={image.url}
					large={image.url}
					className='card-img-top'
				/>

				<Card.Footer>
					{Math.round(image.size / 1024)} kB
				</Card.Footer>
			</Card>
		</>
	)
}

export default WoksList