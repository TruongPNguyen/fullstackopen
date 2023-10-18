import CountryInfo from './CountryInfo'
import CountriesList from './CountriesList'

const CountryDisplay = ({countriesToShow, selectedCountry, showCountry}) => {
    if (selectedCountry) {
        return <CountryInfo country = {selectedCountry} />
      } else if (countriesToShow.length > 10) {
        return <p> Too many matches, be more specific</p>
      } else {
        return <CountriesList countriesToShow = {countriesToShow} showCountry = {showCountry}/>
      }

}

export default CountryDisplay