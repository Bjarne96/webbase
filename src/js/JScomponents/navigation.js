import { scrollable, scrollToElement } from "./scroll";
import { select, selectAll, selectId } from "./select";
import {toggleVisibility, toggleClassName} from "./toggles";
import { findDataset } from "./dataset";

// Select all elements
// Add eventlistener
// Scroll to data-targetClass
export function Navigation() {
    const topbarSelector = ".topbar";
    const toggleTopbarIconOpenClass = "opened";
    const toggleTopbarUpClass = "topbar-up";
    const toggleSelector = ".topbar-toggle";
    const navigationSelector = ".navigation";
    const submenuListNumberSelector = ".submenu-list-";
    const toggleSubmenuOpenClass = "submenu-list-open";
    const dropdownIconNumberSelector = ".dropdown-icon-";
    const targetContentDatasetKey = "targetId";
    const targetSubmenuListDatasetKey = "targetToggleSubmenu";
    const navigateElementSelector = ".navigate";
    // Default Setup navigation by scrolling and topbar functionality
    const topbar = select(topbarSelector);
    // Signals that these depend on HTML & CSS sizes and need to be carefully maintained
    let $navigationBr = 1150;
    let $topbar_height = 65;
    let $defaultOffset = 0;
    let sidebarOn = false;
    let newScrollPosition = 0;
    let lastScrollPosition = 0;
    let toggleNavigationDebouceOn = false;
    let navigateDebouceOn = false;
    let activeSubmenu = {};
    let smartbarDebounceOn = false;
    var navigation = select(navigationSelector);

    let toggleNavigation = function () {
        if (toggleNavigationDebouceOn) return;
        setTimeout(() => {
            toggleNavigationDebouceOn = false;
        }, 300);
        toggleNavigationDebouceOn = true;
        const state = toggleClassName(topbar, toggleTopbarIconOpenClass)
        toggleVisibility(navigation)
        if(state == false) {
            //Hides it from user (animation delay)
            setTimeout(() => {
                disableActiveSubmenu();
            }, 350);
        }
        // Toggle scrolling
        scrollable(!state);
    };

    this.disableNavigation = function () {
        if(topbar.classList.contains(toggleTopbarIconOpenClass)) {
            toggleNavigation();
        }
    }

    let disableActiveSubmenu = function () {
        if(activeSubmenu && activeSubmenu["menu"] && activeSubmenu["menu"].getAttribute("data-visible") == "true") {
            toggleVisibility(activeSubmenu["menu"]);
            toggleClassName(activeSubmenu["btn"], toggleSubmenuOpenClass);
            activeSubmenu = {};
        }
    }
    let toggleSubmenu = function (submenu, submenuBtn) {
        if(activeSubmenu != undefined && activeSubmenu["menu"] != submenu) {
            disableActiveSubmenu();
        }
        let state = toggleVisibility(submenu);
        toggleClassName(submenuBtn, toggleSubmenuOpenClass);
        if(state == "true") {
            activeSubmenu.menu = submenu;
            activeSubmenu.btn = submenuBtn;
        } else {

        }
    }
    function showTopbar () {
        if(!topbar.classList.contains(toggleTopbarUpClass)) return;
        topbar.classList.remove(toggleTopbarUpClass);
    };
    function hideTopbar () {
        if(topbar.classList.contains(toggleTopbarUpClass)) return;
        topbar.classList.add(toggleTopbarUpClass);
    };
    function smartTopbar () {
        if (smartbarDebounceOn) return;
        setTimeout(() => {
            smartbarDebounceOn = false;
        }, 300);
        smartbarDebounceOn = true
        actionWhenScrolling(showTopbar, hideTopbar);
    };
    function smartSubmenuClose () {
        if(activeSubmenu && activeSubmenu["menu"]) {
            actionWhenScrolling(disableActiveSubmenu, disableActiveSubmenu);
        }
    }
    function actionWhenScrolling (scrollingUpAction, scrollingDownAction) {
        lastScrollPosition = window.scrollY;
        if (newScrollPosition < lastScrollPosition ) {
            scrollingDownAction();
        } else if (newScrollPosition > lastScrollPosition) {
            scrollingUpAction();
        }
        newScrollPosition = lastScrollPosition;
    }

    function checkScreenWidthSmall (small) {
        if(window.innerWidth < small) {
            return true;
        } else {
            return false;
        }
    }
    function enableSmartTopbar() {
        window.addEventListener("scroll", smartTopbar);
    }
    function disableSmartTopbar() {
        window.removeEventListener("scroll", smartTopbar);
    }
    function enableSmartSubmenuClose() {
        window.addEventListener("scroll", smartSubmenuClose);
    }
    function disableSmartSubmenuClose() {
        window.removeEventListener("scroll", smartSubmenuClose);
    }
    function detectViewportChange () {
        window.addEventListener('resize', function(){
            let oldSidebarOn = sidebarOn;
            sidebarOn = checkScreenWidthSmall($navigationBr);
            if(oldSidebarOn != sidebarOn) {
                if(!sidebarOn) {
                    $defaultOffset = $defaultOffset + $topbar_height;
                }
                disableActiveSubmenu();
            }
        });
    }
    enableSmartTopbar();
    this.navigate = function (dataset) {
        if (dataset[targetContentDatasetKey]) {
            if (navigateDebouceOn) return;
            setTimeout(() => {
                navigateDebouceOn = false;
            }, 300);
            navigateDebouceOn = true;
            const target = selectId(dataset.targetId);
            if(sidebarOn) {
                disableSmartTopbar();
                this.disableNavigation();
                hideTopbar();
                scrollToElement(target, $defaultOffset).then(() => {
                    enableSmartTopbar();
                });
                
            } else {
                disableSmartSubmenuClose();
                disableActiveSubmenu();
                scrollToElement(target, $defaultOffset).then(() => {
                    enableSmartSubmenuClose();
                });
            }
        } else if(dataset[targetSubmenuListDatasetKey]) {
            let submenu = navigation.querySelector(submenuListNumberSelector + dataset.targetToggleSubmenu);
            let submenuBtn = navigation.querySelector(dropdownIconNumberSelector + dataset.targetToggleSubmenu);
            toggleSubmenu(submenu, submenuBtn);
        }
    }
    //Main Function to enable functionality
    showTopbar();
    sidebarOn = checkScreenWidthSmall($navigationBr);
    if(!sidebarOn) {
        $defaultOffset = $defaultOffset + $topbar_height
    }
    // Add eventlistener to mobile-toggle
    select(toggleSelector)
        .addEventListener("click", () => toggleNavigation());

    // Hide navigation when scrolling
    if(sidebarOn) {
        enableSmartTopbar();
    } else {
        enableSmartSubmenuClose();
    }
    detectViewportChange();
    // Add eventlistener to navigate
    const navigationElements = selectAll(navigateElementSelector);
    const href = window.location.href;
    var hash = window.location.hash;

    navigationElements.forEach((element) => {
        // navigation listener to scroll to the targeted section
        element.addEventListener("click", (e) => {
            this.navigate(findDataset(e));
        });
        if(hash && element.href == href) {
            element.click();
            hash = null;
        }
    })
}