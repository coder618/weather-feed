export const roundDegree = (degree) => {
    const formatedDeg = (degree / 10).toFixed(1);

    return `${formatedDeg}°C`;
};

export const convertInternationalTime = (timestamp) => {
    // Convert the timestamp to milliseconds
    const timestampInMilliseconds = timestamp * 1000;

    // Create a Date object from the timestamp
    const date = new Date(timestampInMilliseconds);

    // Get the hours, minutes, and seconds from the date
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Create the 24-hour format time string
    // const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
};

export function convertTimeForMainCard(timestamp) {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Convert the timestamp to milliseconds
    const timestampInMilliseconds = timestamp * 1000;

    // Create a Date object from the timestamp
    const date = new Date(timestampInMilliseconds);

    // Extract day, month, and day of the week
    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Create the formatted string
    const formattedDate = `${day} ${month} ${dayOfWeek}`;
    return formattedDate;
}

export function shortFormatDate(timestamp) {
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const monthsAbbrev = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Convert the timestamp to milliseconds
    const timestampInMilliseconds = timestamp * 1000;

    // Create a Date object from the timestamp
    const date = new Date(timestampInMilliseconds);

    // Extract day, month, month abbreviation, and day of the week
    const day = date.getDate();
    const monthAbbrev = monthsAbbrev[date.getMonth()];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Create the formatted string
    const formattedDate = `${dayOfWeek}, ${day} ${monthAbbrev}`;
    return formattedDate;
}

export async function getCurrentWeatherApi(city, locationSource) {
    // console.log("getCurrentWeatherApi called ", city, locationSource);
    return new Promise((resolve, reject) => {
        let CurrentWeatherAPI = "";
        let latLon = false;
        const API_BASE = "https://getdata-ayn3xrhlxq-uc.a.run.app";

        if (city.length > 0) {
            CurrentWeatherAPI = `${API_BASE}?city=${city}`;
        } else {
            CurrentWeatherAPI = `${API_BASE}?city=london`;
        }

        if (locationSource == "current") {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        // Success: position object contains the user's location
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        latLon = [latitude, longitude];
                        resolve(`${API_BASE}?lat=${latLon[0]}&lon=${latLon[1]}`);
                    },
                    function (error) {
                        resolve(CurrentWeatherAPI);
                        console("Location permission not given");
                    }
                );
            } else {
                resolve(CurrentWeatherAPI);
            }
        } else {
            resolve(CurrentWeatherAPI);
        }
    });
}

export function getDay(timestamp) {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}
