import 'regenerator-runtime/runtime'
import { Navigation } from "./JScomponents/navigation";
import { Modal } from "./JScomponents/modal";
import { hydrateSlider } from "./JScomponents/slider";
import { fixBrowserIssues } from "./JScomponents/fix";

window.onload = () => {
    init();
};

const init = async () => {
    await hydrate();
    fixBrowserIssues();
};
const hydrate = async () => {
    const navigation = new Navigation();
    
    // Hydrate Modals
    new Modal(navigation.disableNavigation);

    // Hydrate Slider
    await hydrateSlider();
};
