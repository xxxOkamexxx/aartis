import { Button } from 'react-bootstrap'


const filterList = ['all', 'illustrations', 'Photographs']

const FilterButtons = ({currentFilter, changeFilter}) => {
  

  const handleClick = (newFilter) => {

    changeFilter(newFilter)
  }


  return (
    <div>
      <nav>
        { filterList.map((filter) => (
          
          <Button
            key={filter}
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? 'btn-secondary' : 'btn-outline-secondary'}
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