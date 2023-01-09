import { Button } from 'react-bootstrap'


const filterList = ['all', 'illustration', 'photograph']



const FilterButtons = ({currentFilter, changeFilter}) => {


  const handleClick = (newFilter) => {
    changeFilter(newFilter)
  }


  return (
    <div className='mb-1'>
      <nav>
        { filterList.map((filter) => (
          
          <Button
            key={filter}
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? 'btn-secondary me-1' : 'btn-outline-secondary me-1'}
          >
            {filter.toUpperCase()}
          </Button>

        ))

        }

      </nav>
    </div>
  )
}

export default FilterButtons