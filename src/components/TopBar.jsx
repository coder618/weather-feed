import { useEffect } from "react";
import Logo from "./Logo";
const TopBar = ({ setCity, setLocationSource, setMode, mode }) => {
    return (
        <>
            <div className="top-bar">
                <Logo />
                <form
                    className="search-bar"
                    action=""
                    onSubmit={(e) => {
                        // console.log("submit");
                        e.preventDefault();
                        setLocationSource("city");
                        setCity(document.getElementById("search-input").value);
                    }}
                >
                    <button htmlFor="search-input" type="submit">
                        <img src={`search-icon.svg`} alt="" />
                    </button>

                    <input
                        type="text"
                        id="search-input"
                        required
                        placeholder="Type city name and hit enter"
                    />
                </form>

                <button
                    className="btn btn-locate"
                    onClick={(e) => {
                        e.preventDefault();
                        setLocationSource("current");
                    }}
                    title="Get My Location Weather"
                >
                    <img src={`location.svg`} alt="animated-icon" />
                </button>
                <button
                    className="btn mood-toggle"
                    title="Dark/white Toggle"
                    onClick={(e) => {
                        e.preventDefault();

                        setMode((prevMode) => {
                            if (prevMode == "dark-mode") {
                                localStorage.setItem("weather-coder618", "light-mode");

                                return "light-mode";
                            } else {
                                localStorage.setItem("weather-coder618", "dark-mode");

                                return "dark-mode";
                            }
                        });
                    }}
                >
                    {mode == "dark-mode" ? <img src={`sun.svg`} /> : <img src={`moon.svg`} />}
                </button>
                <a
                    href="https://coder618.github.io/"
                    target="_blank"
                    className="btn btn-developer-profile"
                >
                    Visit Developer profile
                </a>
            </div>
        </>
    );
};

export default TopBar;
