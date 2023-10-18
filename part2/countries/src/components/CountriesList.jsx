const CountriesList = ({countriesToShow, showCountry}) => {
    return (
        <div>
          {countriesToShow.map(country => (
            <div key = {country.name.common}>
               {country.name.common} <button onClick = {() => showCountry(country.name.common)}> show </button> 
            </div>))} 
        </div>
    )
}

export default CountriesList