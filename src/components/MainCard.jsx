import { roundDegree, convertTimeForMainCard } from "../helper";
const MainCard = ({ weatherData }) => {
    const current = weatherData.current;
    const main = weatherData.main;
    const weather = weatherData.weather[0];
    const temp = `${weatherData.main.temp.toFixed(1)}°C`;
    return (
        <>
            <div className="main-card">
                <div className="card-w-icon">
                    <img src={`${weather.icon}.svg`} alt="animated-icon" />
                </div>

                <div className="temp">{temp}</div>
                <div className="condition">{weather.main}</div>
                <div className="location">
                    <div className="icon-wrapper">
                        <img src={`pointer.svg`} alt="" />
                    </div>
                    {weatherData.name}-{weatherData.sys.country}
                </div>
                <div className="calendar">
                    <div className="icon-wrapper">
                        <img src={`calendar.svg`} alt="" />
                    </div>
                    {convertTimeForMainCard(weatherData.dt)}
                </div>
            </div>
        </>
    );
};

export default MainCard;
