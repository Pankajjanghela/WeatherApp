import React, { useEffect, useState } from "react";
import './CSS/style.css';

const TempApp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");

    useEffect(() => {
        const fetchApi = async () => {
            const formattedSearch = search.toLowerCase();
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${formattedSearch}&appid=e96594174bdeb7aafa58caf8173cebeb&units=metric`;
            const response = await fetch(url);
            const resJson = await response.json();

            /* Check if the weather array exists before accessing its elements */
            if (resJson.weather && resJson.weather.length > 0) {
                /*So here in setCity the all json format are stored and we can use city name city 
                temperature with using the city.name and city.temp with is define in Json File */
                const jsonData = {
                    main: resJson.main,
                    weather: resJson.weather
                };
                setCity(jsonData);
            } else {
                setCity(null);
            }
        };
        fetchApi();
    }, [search]);

    return (
        <>
            <section>
                <div className="container">
                    <div className="inputField">
                        <input type="search" value={search} onChange={(event) => { setSearch(event.target.value) }} />
                    </div>
                    {!city ? (
                        <p>No Data Found</p>
                    ) : (
                        <>
                            {city.weather && city.weather.length > 0 ? (
                                <>
                                    <img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} className="photos" alt="weatherimage" />
                                    <div className="info">
                                        <h1>{search}</h1>
                                        <h2>{city.main.temp}°C</h2>
                                        <h4>MIN: {city.main.temp_min}°C | MAX: {city.main.temp_max}°C </h4>
                                    </div>
                                </>
                            ) : (
                                <p>No Weather Data</p>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default TempApp;
