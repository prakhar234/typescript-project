import "./style.css";
import * as Monk from "./images/monk.png";
import * as Logo from "./images/logo.svg";
import * as Background from "./images/background.jpg";

interface ClassList {
    [key: number]: string;
}

const SLIDER_LENGTH = 9;
const CLASS_LIST: ClassList = {
    0: 'first',
    1: 'two',
    2: 'three',
    3: 'four',
    4: 'five',
    5: 'six',
    6: 'seven',
    7: 'eight',
    8: 'nine'
}

const SLIDER_LIST_TEXT: ClassList = {
    0: 'We are breaking our vow of silence',
    1: 'Talent is given true skill is earned',
    2: 'Be flexible to change and sturdy in conviction',
    3: 'Use Many skills yet work as one',
    4: 'To master anything find interest in everything',
    5: 'Individuals flourish if culture and wisdon are shared',
    6: 'Train for Perfection but aim for more',
    7: 'Take pride in your work but do not seek praise',
    8: 'Temporary sacrifice brings lasting results'
}

const SLIDER_LIST_TEXT_CLASSES: ClassList = {
    0: 'top',
    1: 'left',
    2: 'left',
    3: 'right',
    4: 'right',
    5: 'right',
    6: 'left',
    7: 'left',
    8: 'left'
}


class App {

    currentIndex =  0;

    setloading = (): void => {
        const monkImage = new Image();
        monkImage.src = String(Monk);
        document.querySelector("#loading-img-container").appendChild(monkImage);
    }

    increaseIndex = ():void => {
        if(this.currentIndex === SLIDER_LENGTH - 1) {
            this.currentIndex = 0;
            document.querySelector("#left").classList.add('hide');
            return;
        }
        document.querySelector("#left").classList.remove('hide');
        this.currentIndex++;
    }

    decreaseIndex = ():void => {
        if(this.currentIndex === 1) {
            document.querySelector("#left").classList.add('hide');
            this.currentIndex--;
            return;
        } else if( this.currentIndex > 1) {
            this.currentIndex--;
        }
    }

    setLogo = ():void => {
        const logoImage = new Image();
        logoImage.src = String(Logo);
        document.querySelector("#logo").appendChild(logoImage);
    }

    handleSlide = (event: MouseEvent):void => {
        let id = (event.target as Element).id;
        const prevIndex = this.currentIndex;
        if(id === 'right') {
            this.increaseIndex();
        } else if(id === 'left') {
            this.decreaseIndex();
        } else {
            id = id.split("-")[2];
            this.currentIndex = +id
        }
        const sliderContainer = document.querySelector("#slider-container");
        sliderContainer.classList.remove(CLASS_LIST[prevIndex]);
        sliderContainer.classList.add(CLASS_LIST[this.currentIndex]);
        sliderContainer.classList.add('slideAnimationLeft');
        this.setSliderText();
        this.highlightSliderIndexer();
    }

    highlightSliderIndexer = ():void => {
        for(let i=0; i < SLIDER_LENGTH; i++) {
            const element = document.querySelector("#slider-index-" + i);
            if(this.currentIndex === i) {
                element.classList.add('active');
            } else {
                element.classList.remove('active')
            }
        }
    }

    setSliderText = ():void => {
        const sliderText = document.querySelector("#slider-text");
        sliderText.innerHTML = SLIDER_LIST_TEXT[this.currentIndex];
        const currentClass = sliderText.classList[1];
        if(!currentClass) {
            sliderText.classList.add(SLIDER_LIST_TEXT_CLASSES[this.currentIndex]);
        }
        sliderText.classList.replace(currentClass, SLIDER_LIST_TEXT_CLASSES[this.currentIndex]);
    }

    setSliderIndexer = ():void => {
        const sliderIndexer = document.querySelector("#slider-indexer");
        for(let i= 0; i< SLIDER_LENGTH; i++) {
            const indexNumber = String(i);
            const index = document.createElement('div');
            index.innerHTML = indexNumber;
            index.classList.add("index");
            index.setAttribute("id", 'slider-index-' + indexNumber)
            index.addEventListener("click", this.handleSlide);
            sliderIndexer.appendChild(index);
        };
    }

    setSliderContainer = ():void => {
        const sliderContainer = document.querySelector("#slider-container");
        sliderContainer.classList.add("first");
    } 

    setNavigatorArrows = ():void => {
        const appContainer = document.querySelector("#app-content");
        const leftArrow:HTMLElement = document.createElement('div');
        leftArrow.classList.add("arrow");
        leftArrow.classList.add("left");
        leftArrow.classList.add("hide");
        leftArrow.setAttribute("id", "left");
        leftArrow.addEventListener('click', this.handleSlide);
        appContainer.appendChild(leftArrow);
        const rightArrow:HTMLElement = document.createElement('div');
        rightArrow.classList.add("arrow");
        rightArrow.classList.add("right");
        rightArrow.setAttribute("id", "right");
        rightArrow.addEventListener('click', this.handleSlide);
        appContainer.appendChild(rightArrow);
    }
    
    setAppContent = () => {
        this.setLogo();
        this.setSliderIndexer();
        this.setSliderContainer();
        this.setNavigatorArrows();
        this.setSliderText();
        this.highlightSliderIndexer();
    }

    finishLoading = (): void => {
        const loading = document.querySelector("#loading");
        loading.classList.add('hide');
        const appContent = document.querySelector("#app-content");
        appContent.classList.remove('hide');
        this.setAppContent();
    }
}

// initialize app
const app = new App();

// set loading screen
app.setloading();

// set app content
setTimeout(() => {
    app.finishLoading();
},2500);



