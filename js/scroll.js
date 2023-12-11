const lerp = (current, target, factor) => {
    let holder = current * (1 - factor) + target * factor;
    holder = parseFloat(holder).toFixed(3);
    return holder;
};

class LoopingText {
    constructor(DOMElements) {
        this.DOMElements = DOMElements;
        this.lerpingData = {
            counterOne: { current: 0, target: 0 },
            counterTwo: { current: 100, target: 100 },
        };
        this.interpolationFactor = 0.1;
        this.speed = 0.2;
        this.render();
        this.onScroll();
    }

    onScroll() {
        window.addEventListener("scroll", () => {
            this.lerpingData["counterOne"].target += this.speed * 5;
            this.lerpingData["counterTwo"].target += this.speed * 5;
        });
    }

    lerp() {
        for (const counter in this.lerpingData) {
            this.lerpingData[counter].current = lerp(
                this.lerpingData[counter].current,
                this.lerpingData[counter].target,
                this.interpolationFactor
            );
        }

        this.lerpingData["counterOne"].target += this.speed;
        this.lerpingData["counterTwo"].target += this.speed;

        if (this.lerpingData["counterOne"].target < 100) {
            this.DOMElements[0].style.transform = `translate(${this.lerpingData["counterOne"].current}%, 0%)`;
        } else {
            this.lerpingData["counterOne"].current = -100;
            this.lerpingData["counterOne"].target = -100;
        }

        if (this.lerpingData["counterTwo"].target < 100) {
            this.DOMElements[1].style.transform = `translate(${this.lerpingData["counterTwo"].current}%, 0%)`;
        } else {
            this.lerpingData["counterTwo"].current = -100;
            this.lerpingData["counterTwo"].target = -100;
        }
    }

    render() {
        this.lerp();

        window.requestAnimationFrame(() => this.render());
    }
}

let textArray = document.getElementsByClassName("item");
new LoopingText(textArray);