import { scrollable } from "./scroll";
import {toggleVisibility, toggleClassName} from "./toggles";
import { findDataset } from "./dataset";

export function Modal(disableNavigation) {
    const btnSelector = ".modal-btn";
    const targetDatasetKey = "modalId";
    const modalWraperSelector = "#modal-wraper";
    // Selectes the slides
    let modalWraper = document.querySelector(modalWraperSelector);
    let btns = document.querySelectorAll(btnSelector);
    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => toggleModal(e));
    })
    let toggleModal = function (e) {
        const dataset = findDataset(e)
        if (dataset[targetDatasetKey]) {
            disableNavigation();
            let modal = document.querySelector(dataset[targetDatasetKey]);
            toggleVisibility(modalWraper);
            toggleClassName(modalWraper, "flex");
            toggleVisibility(modal);
            const state = toggleClassName(modal, "flex");
            scrollable(!state);
        }
    }
}
