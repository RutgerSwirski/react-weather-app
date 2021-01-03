import React, { useState, useEffect } from 'react'

import allCities from '../data/city.list.json'

import { Container, TextField, Grid, Card, CardContent, CircularProgress } from '@material-ui/core'

function Weather() {
    const [cities, setCities] = useState([])
    const [citiesCopy, setCitiesCopy] = useState([])
    const [, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    
    // eslint-disable-next-line
    useEffect(async() => {
        let allCityData = []
        var lessCities = allCities.splice(0,60)
        for(let i = 0; i < lessCities.length; i++) {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${lessCities[i].city}&appid=${process.env.REACT_APP_ID}`)
            const json = await response.json()
            if(!json.message) {
                var celcius = getCelcius(json.main.temp)
                const merge = {...lessCities[i], ...json, celcius}
                allCityData.push(merge)
            }
        }
        setCities(allCityData)
        setCitiesCopy(allCityData)
        setLoading(false)
    }, [])
    
    return(
        <Container className="weather">
            <h1 className="weather-title">Simple Weather App</h1>
            <TextField className="weather-input" onChange={(e) => handleSearch(e) } label="Search City or Country..." variant="outlined" />
            <div className="weather-cards-container">
                <Grid container spacing={4} >
                    { loading ? (
                        <div className="weather-progress-container">
                            <CircularProgress size="4em"  />
                        </div>
                    ) :  (
                        citiesCopy.map((city) => (
                            <Grid key={city.country} item xs={12} lg={4}>
                                <Card className="card">
                                    <CardContent>
                                        <h5 className="card-header">{city.country}</h5>
                                        <h3 className="card-subheader">{city.name}</h3>
                                        <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt=""/>
                                        <h4 className="card-description">{city.weather[0].description}</h4>
                                        <h3 className="card-temp">{city.celcius} °C</h3>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </div>
        </Container>
    )

    function getCelcius(temp) {
        var newTemp = (temp - 273.1).toFixed(0)
        return newTemp
    } 

    function handleSearch(e) {
        setSearch(e.target.value)
        var searchTerm = e.target.value.toLowerCase()
        if(e.target.value !== '') {
            const results = cities.filter(c => (c.city.toLowerCase().includes(searchTerm) || c.country.toLowerCase().includes(searchTerm)))
            setCitiesCopy(results)
        } else {
            setCitiesCopy(cities)
        }
    }
}

export default Weather