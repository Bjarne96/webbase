import 'regenerator-runtime/runtime';
import { validate } from "./JScomponents/form";
import { selectId } from "./JScomponents/select";

const init = async () => {
    await hydrate();
};
const hydrate = async () => {
    const formSelector = "#form";
    const hashSelector = "hashtarget";
    validate(formSelector);
    var hash = window.location.hash;
    if(hash) {
        hash = hash.substring(1, hash.length)
        const hashTarget = selectId(hashSelector);
        if(hashTarget.tagName == "SELECT") {
            for (let element of hashTarget.options) {
                if(element.value == hash) {
                    hashTarget.selectedIndex = element.index;
                }
            };
        }
    }
};

init();