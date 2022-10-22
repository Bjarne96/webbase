export function hydrateParallax() {
    const target = document.querySelectorAll('.parallax-js');
    const doParallax = function () {
        const pageYOffset = window.pageYOffset;
        var index = 0, length = target.length;
        for (index; index < length; index++) {
            let delay = 50;
            let offsetTop = target[index].parentNode.offsetTop + delay;
            let offsetBot = target[index].parentNode.offsetTop + target[index].parentNode.offsetHeight;
            var pos = (pageYOffset - offsetTop) * target[index].dataset.rate;
            // Drinnen
            if(offsetTop < pageYOffset && offsetBot > pageYOffset)  {
                if(target[index].dataset.direction === 'vertical') {
                    target[index].style.transform = 'translate3d(0px,'+pos+'px, 0px)';
                } else {
                    var posX = pageYOffset * target[index].dataset.ratex;
                    var posY = pageYOffset * target[index].dataset.ratey;
                    target[index].style.transform = 'translate3d('+posX+'px, '+posY+'px, 0px)';
                }
            }
        }
    }
    window.addEventListener('scroll', () => doParallax() );
}
