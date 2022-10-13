// Code from https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        })
    );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}
// Enable or Disable scrolling
export function scrollable(canScroll) {
    if (canScroll == true || canScroll == "true") {
        enableScroll();
    } else if (canScroll == false) {
        disableScroll();
    }
}

export function scrollToElement (targetElement, offset = 0) {
    // Original Code from https://stackoverflow.com/questions/30727365/wait-until-scrollto-is-complete-before-running-a-command
    return new Promise((resolve) => {
        //Sets up all needed Variables
        if(targetElement == null) {
            resolve();
            return;
        }
        scrollable(false);
        const rect = targetElement.getBoundingClientRect();
        let targetPosition = (Math.floor(rect.top + window.pageYOffset) - offset);
        //Scrolls to target
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
        //checks if the target was successfully scrolled to
        //Remove Eventlistener when an error occurs
        const failed = setTimeout(() => {
            window.removeEventListener("scroll", scrollHandler);
            resolveAll();
        }, 1000);

        const resolveAll = () => {
            clearTimeout(failed);
            scrollable(true);
            resolve();
        };

        //Scrolls to the requested position
        const scrollHandler = () => {
            if (Math.round(self.pageYOffset) === targetPosition) {
                //Remove the Eventlistener when the position is successfully scrolled
                window.removeEventListener("scroll", scrollHandler);
                resolveAll();
            }
        };
        // Sets up scrolling when needed
        if (self.pageYOffset === targetPosition) {
            //Scrolling position is already the same as the navigated one
            resolveAll();
        } else {
            //Scrolling to a different position
            window.addEventListener("scroll", scrollHandler);
        }
    });
};
