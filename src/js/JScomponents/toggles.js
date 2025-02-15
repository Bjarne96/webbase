// I added the "button". That will break the submenu logic, if used.
export function toggleVisibility(element, button) {
    let isHidden = element.hasAttribute("hidden");
    if (isHidden) {
        element.removeAttribute("hidden"); // Show navigation
        button.setAttribute("aria-expanded", "true");
    } else {
        element.setAttribute("hidden", ""); // Hide navigation
        button.setAttribute("aria-expanded", "false");
    }
    return isHidden;
}

export function toggleClassName(element, className) {
    element.classList.toggle(className);
    const state = element.classList.contains(className);
    return state;
}