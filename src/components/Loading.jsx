import { ColorRing } from "react-loader-spinner";
export default function Loading() {
    return (
        <div className="loading-component">
            <div className="img-wrapper">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                />
            </div>
            <h3>Loading... </h3>
        </div>
    );
}
