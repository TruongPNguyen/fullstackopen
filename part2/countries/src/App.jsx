import { useState, useEffect } from 'react'
import countriesService from './services/countriesData'
import Filter from './components/Filter'
import CountriesDisplay from './components/CountryDisplay'
import CountriesList from './components/CountriesList'
import CountryInfo from './components/CountryInfo'
import axios from 'axios'

function App() {
  const [filter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    if (countriesToShow.length == 1) {
      handleShowCountry(countriesToShow[0].name.common)
    }
  }, [countriesToShow])

  const handleShowCountry = (name) => {
    const matches = countriesToShow.filter((country) => country.name.common === name)
    if (matches.length === 1) {
      setSelectedCountry(matches[0])
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <div>
      <Filter filter = {filter} onFilterChange = {handleFilterChange} />
      <CountriesDisplay
        countriesToShow = {countriesToShow}
        selectedCountry = {selectedCountry}
        showCountry = {handleShowCountry}
      />
    </div>
  )
}

export default App
