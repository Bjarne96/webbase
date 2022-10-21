import 'regenerator-runtime/runtime'
import { Navigation } from "./JScomponents/navigation";
import { Modal } from "./JScomponents/modal";
import { hydrateParallax } from "./JScomponents/parallax";
import { hydrateSlider } from "./JScomponents/slider";
import { fixBrowserIssues } from "./JScomponents/fix";

const init = async () => {
    await hydrate();
    fixBrowserIssues();
};
const hydrate = async () => {
    // Hydrate Parallax
    hydrateParallax();
    // Hydrate Navigation
    const navigation = new Navigation();
    
    // Hydrate Modals
    new Modal(navigation.disableNavigation);

    // Hydrate Slider
    await hydrateSlider();
};

init();
