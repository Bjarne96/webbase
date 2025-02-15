import 'regenerator-runtime/runtime'
import { Navigation } from "./JScomponents/navigation";
import { Modal } from "./JScomponents/modal";
import { hydrateSlider } from "./JScomponents/slider";
// import { hydrateObserver } from "./JScomponents/observer";
import { fixBrowserIssues } from "./JScomponents/fix";

window.onload = () => {
    init();
};

const init = async () => {
    await hydrate();
    fixBrowserIssues();
};
const hydrate = async () => {
    // Hydrate Navigation
    const navigation = new Navigation();
    // Hydrate Animations based on Observer
    // await hydrateObserver();

    // Hydrate Modals
    new Modal(navigation.disableNavigation);

    // Hydrate Slider
    await hydrateSlider();
};
