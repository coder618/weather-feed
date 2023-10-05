export default function ApiErrorMessage(props) {
    return (
        <div className="api-error-message-component">
            <div className="img-wrapper">
                <img src={`binocular.svg`} alt="binocular image" />
            </div>
            <h3>{props.message}</h3>
        </div>
    );
}
