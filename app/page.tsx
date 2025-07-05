"use client";
import "./page.module.css";
import React, { useEffect, useRef, useState } from "react";
import WeatherCard from "./weathercard";

function App() {
    const [weather, setweather] = useState<any>();
    const [weatherlist, setweatherlist] = useState<any>();
    const axios = require("axios");
    async function getUser() {
        try {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather?q=Cairo,eg&APPID=9d7d987f5fb87b1606271d16db0becfa&units=metric"
            );
            console.log(response.data);
            setweather(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function getweather() {
        try {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5//forecast?q=Cairo,eg&APPID=9d7d987f5fb87b1606271d16db0becfa&units=metric"
            );
            console.log(response);
            setweatherlist(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getweather();
        getUser();
    }, []);
    return (
        <div className="app-container">
            {weather && weatherlist&& <WeatherCard currentWeatherData={weather} forecastData={weatherlist} />}
        </div>
    );
}

export default App;
