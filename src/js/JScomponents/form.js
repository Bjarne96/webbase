import { scrollToElement } from "./scroll";
import { select } from "./select";

export function validate(formSelector) {
    select(formSelector).addEventListener("submit", (e) => {
        const removeClass = function (e, className) {
            e.classList.remove(className);
        }
    
        const addClass = function (e, className) {
            e.classList.add(className);
        }

        const requiredClassName = ".required";
        const missingClassName = "missing";
        const $topbarHeight = 65;
        //Gap + Labelheight + Inputpadding + Topbarheight
        const $defaultOffset = 16 + 16 + $topbarHeight - 1;
    
        const removeMissing = function (e) {
            if(e.target.value != "") {
                removeClass(e.target, missingClassName)
                e.target.removeEventListener("change", removeMissing);
            }
        }

        const fields = form.querySelectorAll(requiredClassName);
        let notfoundFirst = true;
        let formFilledOutFine = true;
        fields.forEach(field => {
            if(field.value == "") {
                if(notfoundFirst) {
                    scrollToElement(field, $defaultOffset);
                    notfoundFirst = false;
                    formFilledOutFine = false;
                }
                addClass(field, missingClassName);
                field.addEventListener("change", (e) => removeMissing(e));
            } else {
                removeClass(field, missingClassName);
            }
        });
        if(!formFilledOutFine) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
}