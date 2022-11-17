import { selectAll } from "./select";

export function hydrateObserver() {
    console.log('observe');
    let options = {
        threshold: .8
    }
    const showObserver = new IntersectionObserver(((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.classList.add("observer-show");
            }
        });
    }), options);
    const hideObserver = new IntersectionObserver(((entries) => {
        entries.forEach((entry) => {
            if(!entry.isIntersecting) {
                entry.target.classList.remove("observer-show");
            }
        });
    }));

    const hiddenElements = selectAll(".observer-target");
    hiddenElements.forEach((el) => showObserver.observe(el))
    hiddenElements.forEach((el) => hideObserver.observe(el))
}

