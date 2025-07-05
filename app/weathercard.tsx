import React, { useEffect, useState } from "react";
import { WiDaySunny, WiMoonWaningCrescent4 } from "react-icons/wi";

interface WeatherDataProps {
    currentWeatherData: any;
    forecastData: any;
}

type DailyForecast = {
    day: String;
    minTemp: number;
    maxTemp: number;
};
// lk
const WeatherDisplay: React.FC<WeatherDataProps> = ({
    currentWeatherData,
    forecastData,
}) => {
    const [weatherForecastList, setWeatherForecastList] = useState<object[]>(
        []
    );
    const mainWeatherData = currentWeatherData.main;
    const weatherCondition = currentWeatherData.weather[0].main;

    const renderWeatherIcon = () => {
        const currentTime = Date.now();
        console.log(currentTime);
        console.log(currentWeatherData.sys.sunrise * 1000);

        if (currentTime > currentWeatherData.sys.sunrise * 1000) {
            if (currentTime > currentWeatherData.sys.sunset * 1000) {
                console.log("Night time");
                return <WiMoonWaningCrescent4 className="weather-icon-night" />;
            } else {
                console.log("Day time");
                return <WiDaySunny className="weather-icon-day" />;
            }
        } else return <WiMoonWaningCrescent4 className="weather-icon-night" />;
    };

    const formatDateTime = (dateTime: Date) => {
        return dateTime.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    useEffect(() => {
        setWeatherForecastList([...forecastData.list]);
    }, []);

    const renderWeeklyForecast = () => {
        const weeklyForecast: DailyForecast[] = [];
        const forecastItems = [...forecastData.list];

        let currentDay = new Date(
            forecastData.list[0].dt * 1000
        ).toLocaleDateString("en-EG", {
            weekday: "short",
        });

        weeklyForecast[0] = {
            day: currentDay,
            minTemp: forecastData.list[0].main.temp_min,
            maxTemp: forecastData.list[0].main.temp_max,
        };

        let currentIndex = 0;

        forecastItems.forEach((forecastItem, index) => {
            let forecastDay = new Date(
                forecastData.list[index].dt * 1000
            ).toLocaleDateString("en-EG", {
                weekday: "short",
            });

            let forecastMaxTemp = forecastItem.main.temp_max;
            let forecastMinTemp = forecastItem.main.temp_min;

            if (currentDay === forecastDay) {
                if (weeklyForecast[currentIndex].maxTemp < forecastMaxTemp) {
                    weeklyForecast[currentIndex].maxTemp =
                        forecastItem.main.temp_max;
                }
                if (weeklyForecast[currentIndex].minTemp > forecastMinTemp) {
                    weeklyForecast[currentIndex].minTemp =
                        forecastItem.main.temp_min;
                }
            } else {
                currentDay = forecastDay;
                weeklyForecast.push({
                    day: currentDay,
                    minTemp: forecastMinTemp,
                    maxTemp: forecastMaxTemp,
                });
                currentIndex++;
            }
        });

        return (
            <div className="weekly-forecast-container">
                {weeklyForecast.map((dayForecast, index) => {
                    return (
                        <div className="daily-forecast" key={index}>
                            <div className="forecast-day">
                                {" "}
                                {dayForecast.day}
                            </div>
                            <div className="forecast-temp-min">
                                {" "}
                                {Math.round(dayForecast.minTemp)}°C
                            </div>
                            <div className="forecast-temp-max">
                                {Math.round(dayForecast.maxTemp)}°C
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="weather-display-container">
            <div className="location-data">
                <h2 className="location-name">{currentWeatherData.name}</h2>
                <div className="current-date-time">
                    {formatDateTime(new Date())}
                </div>
            </div>
            <div className="weather-container">
                <div className="temperature-display">
                    <div className="weather-icon">{renderWeatherIcon()}</div>
                    <p className="current-temp">
                        {Math.round(mainWeatherData.temp)}°C
                    </p>
                </div>
                <div className="weather-details">
                    <p className="weather-condition">{weatherCondition}</p>
                    <p className="temp-range">
                        {Math.round(mainWeatherData.temp_max)}° /
                        {Math.round(mainWeatherData.temp_min)}°
                    </p>
                    <p className="feels-like">
                        Feels like: {Math.round(mainWeatherData.feels_like)}°
                    </p>
                </div>
            </div>
            <div className="weekly-forecast">{renderWeeklyForecast()}</div>
        </div>
    );
};

export default WeatherDisplay;
