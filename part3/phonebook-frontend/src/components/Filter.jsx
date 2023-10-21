const Filter = ({filter, onFilterChange}) => {
    return (
        <div> Filter by name: <input value = {filter} onChange = {onFilterChange}/> </div>
    )
}

export default Filter