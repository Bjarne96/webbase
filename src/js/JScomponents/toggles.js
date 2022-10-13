export function toggleVisibility(element) {
    let state = element.getAttribute("data-visible");
    if(state == "false") {
        state = "true";
    } else if(state == "true") {
        state = "false";
    }
    element.setAttribute("aria-expanded", state);
    element.setAttribute("data-visible", state);
    return state;
}

export function toggleClassName(element, className) {
    element.classList.toggle(className);
    const state = element.classList.contains(className);
    return state;
}