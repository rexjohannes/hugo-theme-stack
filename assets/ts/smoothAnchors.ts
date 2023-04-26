// Implements smooth scrolling when clicking on an anchor link.
// This is required instead of using modern CSS because Chromium does not currently support scrolling
// one element with scrollTo while another element is scrolled because of a click on a link. This would
// thus not work with the ToC scrollspy and e.g. footnotes.

// Here are additional links about this issue:
// - https://stackoverflow.com/questions/49318497/google-chrome-simultaneously-smooth-scrollintoview-with-more-elements-doesn
// - https://stackoverflow.com/questions/57214373/scrollintoview-using-smooth-function-on-multiple-elements-in-chrome
// - https://bugs.chromium.org/p/chromium/issues/detail?id=833617
// - https://bugs.chromium.org/p/chromium/issues/detail?id=1043933
// - https://bugs.chromium.org/p/chromium/issues/detail?id=1121151

const anchorLinksQuery = "a[href]";

function setupSmoothAnchors() {
    document.querySelectorAll(anchorLinksQuery).forEach(aElement => {
        let href = aElement.getAttribute("href");
        if (!href.startsWith("#")) {
            return;
        }
        aElement.addEventListener("click", clickEvent => {
            clickEvent.preventDefault();

            const targetId = decodeURI(aElement.getAttribute("href").substring(1)),
                target = document.getElementById(targetId) as HTMLElement,
                offset = target.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;

            window.history.pushState({}, "", aElement.getAttribute("href"));
            scrollTo({
                top: offset,
                behavior: "smooth"
            });
        });
    });
}

export { setupSmoothAnchors };
