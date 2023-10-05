import Logo from "./Logo";

const Footer = () => {
    return (
        <footer>
            <Logo />
            <div className="credit">
                Application Developed by{" "}
                <a target="_blank" href="https://coder618.github.io/">
                    coder618
                </a>
            </div>

            <button className="btn back-to-top" onClick={(e) => scrollToTopWithAnimation(1)}>
                <img src={`arrow-up.svg`} />
            </button>
        </footer>
    );
};

function scrollToTopWithAnimation(duration) {
    const start = window.pageYOffset;
    const startTime = "now" in window.performance ? performance.now() : new Date().getTime();

    function scrollToTop(timestamp) {
        const currentTime = "now" in window.performance ? performance.now() : new Date().getTime();
        const elapsed = currentTime - startTime;
        const easeInOutCubic = (t) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easing function

        window.scrollTo(0, start - start * easeInOutCubic(Math.min(1, elapsed / duration)));

        if (elapsed < duration) {
            requestAnimationFrame(scrollToTop);
        }
    }

    requestAnimationFrame(scrollToTop);
}
export default Footer;
