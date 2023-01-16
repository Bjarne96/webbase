import { selectAll } from "./select";

export function hydrateSlider() {
    selectAll(".slider").forEach(slider => {
        var sliderOptions = {
            slides : null,
            left : null,
            right : null,
            delay : null,
            auto_slide_timing : null
        }
        for (const set in slider.dataset) {
            if(slider.dataset[set].length) {
                sliderOptions[set] = slider.dataset[set];
            }
        }
        new Slider(
            sliderOptions.slides,
            sliderOptions.left,
            sliderOptions.right,
            sliderOptions.auto_slide_timing,
            sliderOptions.delay
        );
    });
}

function Slider(
    slide_selector,
    prev_btn_selector,
    next_btn_selector,
    auto_slide_timing, //When added the auto slide feature is activated with the given timing
    transition_delay = 0 //Transition delay makes the slide feel less hectic
) {
    if(transition_delay) {
        transition_delay = Number(transition_delay) * 1000;
    }
    // Selectes the slides
    let slides = selectAll(slide_selector);
    // Exception handling
    if (!slide_selector || !slide_selector.length || !slides || !slides.length) {
        console.error("No Selector for slider or no slides found.", slide_selector);
        return;
    }
    // Sets slider index
    let _index = 0;
    // Adds the slides in an array.
    let container = [...slides];
    // Manipulates the index setters and getters so it cant break.
    Object.defineProperty(this, "index", {
        get: () => {
            return _index;
        },
        set: (value) => {
            // resets to 0 when index is bigger than maximum
            if (value >= container.length) value = 0;
            // resets to maximum when index is smaller than 0
            if (value < 0) value = container.length - 1;
            _index = value;
        },
    });
    this.index = 0;
    // Reduces the action to switch the slide by given timing
    this.inTransition = false;
    // Set slides to sliders index
    let setSlides = () => {
        container.forEach((slide) => {
            // Styles the slides
            slide.style.transform = `translateX(-${this.index}00%)`;
        });
    };
    // Finds the progressbar in each container
    // let progressBarEls = container.map((slide) => {
    //     return Array.from(slide.children[0].children).find(
    //         (child) => child.className == "progress-bar"
    //     );
    // });
    // Set slides to sliders index
    // let setProgressbar = () => {
    //     progressBarEls.forEach((bar, i) => {
    //         if (!bar) {
    //             return;
    //         }
    //         // Removes the unnecessary progressbar animations
    //         bar.style.animation = "none";
    //         // Addds only the needed progressbar animation
    //         if (i == this.index) {
    //             // timeout for doing rendering steps on after another and the transition delay
    //             setTimeout(() => {
    //                 bar.style.animation = "";
    //             }, transition_delay);
    //         }
    //     });
    // };
    // Adds the startAutoslide and stopAutoslide function, when auto_slide_timing is given
    if (auto_slide_timing && auto_slide_timing != 0) {
        auto_slide_timing = Number(auto_slide_timing);
        console.log('auto_slide_timing', auto_slide_timing);
        var autoslide;
        this.startAutoslide = () => {
            setSlides();
            // setProgressbar();
            autoslide = setInterval(() => {
                this.index++;
                setSlides();
                // setProgressbar();
            }, auto_slide_timing + transition_delay);
        };
        this.stopAutoslide = () => {
            clearInterval(autoslide);
        };
        this.startAutoslide();
    }
    // Adds the before button
    if (prev_btn_selector) {
        selectAll(prev_btn_selector).forEach(btn => {
           btn.addEventListener("click", () => {
                // Reduces the action to switch the slide by given timing
                if (!this.inTransition) {
                    this.inTransition = true;
                    this.index--;
                    setSlides();
                    setTimeout(() => {
                        this.inTransition = false;
                    }, 1000);
                }
            });
        });
    }
    // Adds the next button
    if (next_btn_selector) {
        selectAll(next_btn_selector).forEach(btn => {
            btn.addEventListener("click", () => {
                // Reduces the action to switch the slide by given timing
                if (!this.inTransition) {
                    this.inTransition = true;
                    this.index++;
                    setSlides();
                    setTimeout(() => {
                        this.inTransition = false;
                    }, 1000);
                }
            });
        });
    }
}
