import { getDay, convertInternationalTime } from "../helper";
const FollowingForecast = ({ forecastList }) => {
    const slicedArray = forecastList.slice(0, 6);
    return (
        <div className="following-forecast">
            {slicedArray.map(function (item) {
                return (
                    <div className="item" key={item.dt}>
                        <div className="title">
                            <span>{getDay(item.dt)}</span>
                            <span>{convertInternationalTime(item.dt)}</span>
                        </div>
                        <div className="temp">{item.main.temp.toFixed(1)} °C</div>
                    </div>
                );
            })}
        </div>
    );
};

export default FollowingForecast;
