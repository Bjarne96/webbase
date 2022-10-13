export function fixBrowserIssues() {
    let userAgent = navigator.userAgent;
    if(userAgent.match(/samsung/i)) {
        try {
            document.getElementById("ws-wave").style["visibility"] = "hidden";
            document.querySelectorAll(".wave-wraper").forEach((wave) => {
                wave.style["visibility"] = "hidden";
            });
            document.querySelectorAll(".hl-wraper").forEach((e) => {
                e.children[0].style["display"] = "none";
                e.children[1].style["backgroundColor"] = "transparent";
            });
        } catch (e) {
            console.error('e', e);
        }
    };
}