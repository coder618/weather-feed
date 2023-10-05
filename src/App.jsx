import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import MainCard from "./components/MainCard";
import WeatherConditionCard from "./components/WeatherConditionCard";
import FollowingForecast from "./components/FollowingForecast";
import FollowingDaysForecast from "./components/FollowingDaysForecast";
import Footer from "./components/Footer";
import { convertInternationalTime, getCurrentWeatherApi } from "./helper";
import Loading from "./components/Loading";
import ApiErrorMessage from "./components/ApiErrorMessage";
function App() {
    const [currentWeatherData, setCurrentWeatherData] = useState(false);
    const [forecastData, setForecastData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [city, setCity] = useState("");
    const [mode, setMode] = useState("light-mode");
    const [locationSource, setLocationSource] = useState("current");
    const [apiErrorMessage, setApiErrorMessage] = useState("");

    // initial load
    useEffect(() => {
        async function initModeSet() {
            const savedState = await localStorage.getItem("weather-coder618");

            if (savedState) {
                console.log("Previous state found in local storage ", savedState);
                setMode(savedState);
            } else {
                if (
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                ) {
                    setMode("dark-mode");
                } else {
                    console.log("No previous found set to light");

                    setMode("light-mode");
                }
            }
        }
        initModeSet();
    }, []);

    useEffect(() => {
        if (mode == "dark-mode") {
            document.querySelector("html").setAttribute("class", "dark-mode");
        } else {
            document.querySelector("html").setAttribute("class", "light-mode");
        }
    }, [mode]);

    useEffect(() => {
        // called when location change
        async function getData() {
            setIsLoading(true);
            setMessage("");

            try {
                let CurrentWeatherAPI = await getCurrentWeatherApi(city, locationSource);

                const API_RESPONSE = await fetch(CurrentWeatherAPI);
                const data = await API_RESPONSE.json();

                if (data.status) {
                    setCurrentWeatherData(data.CurrentWeatherData);
                    setForecastData(data.ForecastWeatherData);
                    setIsLoading(false);
                    setMessage(data.message);
                } else {
                    setMessage("");
                    setApiErrorMessage(data.message);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setApiErrorMessage("Something is wrong, API error!");
                setIsLoading(false);
                // setMessage("Something is wrong while we are fetching data");
            }
        }
        getData();
    }, [city, locationSource]);
    return (
        <>
            <TopBar
                mode={mode}
                setMode={setMode}
                setCity={setCity}
                city={city}
                setLocationSource={setLocationSource}
            />

            {message ? <div className="alert c-alert">{message}</div> : ""}

            {apiErrorMessage ? <ApiErrorMessage message={apiErrorMessage} /> : ""}

            {isLoading == true ? <Loading /> : ""}

            {currentWeatherData !== false && forecastData !== false ? (
                <>
                    <h1>Your weather overview:</h1>

                    <div className="section-1">
                        <div className="first-column">
                            <MainCard weatherData={currentWeatherData} />
                        </div>
                        <div className="second-column">
                            <WeatherConditionCard
                                title="Wind Speed"
                                value={`${Math.round(currentWeatherData.wind.speed * 3.6)} km/h`}
                                icon="wind-speed.svg"
                            />
                            <WeatherConditionCard
                                title="Humidity"
                                value={`${currentWeatherData.main.humidity}%`}
                                icon="humidity.svg"
                            />
                            <WeatherConditionCard
                                title="Pressure"
                                value={`${currentWeatherData.main.pressure} hPa`}
                                icon="pressure.svg"
                            />
                            <WeatherConditionCard
                                title="Visibility"
                                value={`${currentWeatherData.visibility / 1000} km`}
                                icon="visibility.svg"
                            />
                            <WeatherConditionCard
                                title="sunrise"
                                value={`${convertInternationalTime(
                                    currentWeatherData.sys.sunrise
                                )}`}
                                icon="sunrise.svg"
                            />
                            <WeatherConditionCard
                                title="sunset"
                                value={`${convertInternationalTime(currentWeatherData.sys.sunset)}`}
                                icon="sunset.svg"
                            />
                        </div>
                        <div className="third-column">
                            {<FollowingForecast forecastList={forecastData.list} />}
                        </div>
                    </div>

                    <div className="section-2">
                        {forecastData == false ? (
                            ""
                        ) : (
                            <FollowingDaysForecast weatherList={forecastData.list} />
                        )}
                    </div>
                </>
            ) : (
                ""
            )}

            <Footer />
        </>
    );
}

export default App;
