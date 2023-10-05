import { useEffect, useState } from "react";

import { shortFormatDate, convertInternationalTime, roundDegree } from "../helper";

const FollowingDaysForecast = ({ weatherList }) => {
    const [selectedDate, setSelectedDate] = useState("all");
    const [filteredCards, setFilteredCards] = useState([]);
    const [allFormattedCards, setAllFormattedCards] = useState({});
    const [uniqueDate, setUniqueDate] = useState([]);

    // convert list to date base object
    useEffect(() => {
        let cardArray = [];
        let uniqueDateArray = [];

        if (weatherList) {
            for (let i = 0; i < weatherList.length; i++) {
                const currentTempObj = weatherList[i];
                const temperatureDate = shortFormatDate(currentTempObj.dt);

                let formattedObject = {
                    temperatureDate: temperatureDate,
                    ts: currentTempObj.dt,
                    tempName: currentTempObj.weather[0].main,
                    time: currentTempObj.dt,
                    icon: currentTempObj.weather[0].icon,
                    temp: `${currentTempObj.main.temp.toFixed(1)} °C`,
                };

                cardArray.push(formattedObject);

                if (!uniqueDateArray.includes(temperatureDate)) {
                    uniqueDateArray.push(temperatureDate);
                }
            }

            setAllFormattedCards(cardArray);
            setUniqueDate(uniqueDateArray);
        }
    }, []);

    useEffect(() => {
        if (allFormattedCards.length > 0) {
            if (selectedDate == "all") {
                // setFilteredCards(allFormattedCards);
                setFilteredCards(sortArrayOfObjectsByDt(allFormattedCards));
            } else {
                let outputCards = [];

                for (let i = 0; i < allFormattedCards.length; i++) {
                    const currentTempObj = allFormattedCards[i];

                    if (currentTempObj.temperatureDate == selectedDate) {
                        outputCards.push(currentTempObj);
                    }
                }

                setFilteredCards(sortArrayOfObjectsByDt(outputCards));
            }
        }

        // setFilteredDateForecast(outputCards);
    }, [allFormattedCards, selectedDate]);

    const all_item_class = `each-day-selector ${selectedDate == "all" ? "selected" : ""}`;
    return (
        <>
            <h2>Your weather forecast by day:</h2>

            <div className="following-days-forecast">
                <div className="day-selector">
                    <div className={all_item_class} onClick={(e) => setSelectedDate("all")}>
                        All
                    </div>

                    {uniqueDate.map((item) => {
                        const item_class = `each-day-selector ${
                            selectedDate == item ? "selected" : ""
                        }`;

                        return (
                            <div
                                key={`ts--${item}`}
                                className={item_class}
                                onClick={(e) => setSelectedDate(item)}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
                <div className="daily-weather-cards">
                    <div className="each-day-cards">
                        {filteredCards.length > 0
                            ? filteredCards.map(function (item) {
                                  return (
                                      <div className="each-time-card" key={`dt-${item.time}`}>
                                          <div className="time">
                                              <span>{shortFormatDate(item.time)}</span>
                                              <span>{convertInternationalTime(item.time)}</span>
                                          </div>

                                          <img src={`${item.icon}.svg`} alt="icon" />

                                          <div className="info">
                                              <div>{item.temp}</div>
                                              <p>{item.tempName}</p>
                                          </div>
                                      </div>
                                  );
                              })
                            : ""}
                        {}
                    </div>
                </div>
            </div>
        </>
    );
};

// function DateSelector(dateBaseForecast, selectedDate) {
//     let output = [];
//     {
//         Object.keys(dateBaseForecast).forEach((key) => {
//             const itemClass = `each-day-selector ${selectedDate == key ? "selected" : ""}`;

//             <div className={itemClass} key={key} onClick={(e) => setSelectedDate(key)}>
//                 {key}
//             </div>;
//         });
//     }
// }

function transformString(inputString) {
    // Remove all white spaces using regular expression
    const stringWithoutSpaces = inputString.replace(/\s+/g, "");

    // Convert the string to lowercase
    const lowercasedString = stringWithoutSpaces.toLowerCase();

    return lowercasedString;
}

function sortArrayOfObjectsByDt(arr) {
    // Sort the array based on the 'dt' key
    arr.sort((a, b) => a.dt - b.dt);

    return arr;
}

export default FollowingDaysForecast;
