import CountryWeather from './CountryWeather'

const CountryInfo = ({country}) => {
    const languageObject = country.languages
    const languageArr = Object.values(languageObject)
    const coords = country.latlng

    return (
        <div>
            <h2> {country.name.common} </h2> 
            <p> Capital : {country.capital} </p>
            <p> Area : {country.area} </p>
            <p> Population : {country.population} </p>
            <h3> Languages : </h3>
            <ul> {languageArr.map((language) => (
                <li key={language}> {language} </li>
            ))} 
            </ul>
            <img src = {country.flags.svg}/>
            <h3> Weather in {country.capital} : </h3>
            <CountryWeather 
                lat = {coords[0]} 
                lon = {coords[1]} />
        </div>
    )
}

export default CountryInfo