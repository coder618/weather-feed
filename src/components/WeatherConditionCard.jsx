import PropTypes from "prop-types";

const WeatherConditionCard = ({ icon, title, value }) => {
    return (
        <>
            <div className="weather-condition-card">
                <img src={`${icon}`} alt="animated-icon" />
                <div className="info">
                    <h3>{title}</h3>
                    <p>{value}</p>
                </div>
            </div>
        </>
    );
};

WeatherConditionCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default WeatherConditionCard;
