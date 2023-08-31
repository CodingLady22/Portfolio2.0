// 1) From app.js
HTMLElement.prototype.delegate = function (eventName, childSelector, callback) {
    this.addEventListener(eventName, function (e) {
        const currentElement = e.target.closest(childSelector);
        if (currentElement === null || !this.contains(currentElement)) return undefined;
        callback.call(currentElement, e);
    });
};

(function () {
    function startClassAnimation(element, animClass) {
        element.classList.remove(animClass);
        setTimeout(() => element.classList.add(animClass), 1);
    }
    
    Array.from(document.querySelectorAll(".mainIconContainer *")).forEach(item=>item.addEventListener("click", function (e) {
        startClassAnimation(document.querySelector(".mainIcon"), "nudge");
    }));
    
    
    
    document.querySelector("body").delegate("click", ".fa-xmark", function() {
        fadeOut(document.querySelector("#" + this.getAttribute("targetElement")), 0.25);
    });
    
    document.querySelector("#connect").addEventListener("click", ()=>fadeIn(document.querySelector("#linkTreeModal"), 0.25));

    function fadeOut(element, time, easing="linear") {
        element.style.removeProperty("animation");
        element.style.animation = `fadeOut ${time}s ${easing} forwards`;
        function hide() {
            element.style.display = "none";
            element.removeEventListener("animationend", hide);
        }
        element.addEventListener("animationend", hide);
    }
    
    function fadeIn(element, time, easing="linear") {
        element.style.removeProperty("animation");
        element.style.removeProperty("display");
        if (getComputedStyle(element).display === "none") {
            element.style.display = "block";
        }
        element.style.opacity = '0';
        setTimeout(()=>{
            element.style.animation = `fadeIn ${time}s ${easing} forwards`;
        }, 5);
    }

    document.querySelector("#linkTreeModal").style.display = "none";
    
    Array.from(document.querySelectorAll(".modularCard a")).map(e=>e.target="_blank");
})();



// 2) From configInteractivePFPText.js
(function () {
    // When you click on your PFP, your PFP will interact and say something. Make a list for it to say!
    let textEntries = ["hey, click me!",
        "do it again!",
        "~clears throat~",
        "Ciao! Sono Maye!",
        "Sono un software developer.",
        "Been in tech for half a year.",
        "Building awesome websites and software with #100devs.",
        "Nice to meet you, and let's connect!",
    ];

    let index = 0;
    const bubbleTextElement = document.querySelector(".mainTextBox");
    bubbleTextElement.style.display = "block";
    function nextTextForBubble() {
        textEntries[index] && (bubbleTextElement.innerText = textEntries[index]);
        index++;
    }
    nextTextForBubble();
    
    Array.from(document.querySelectorAll(".mainIconContainer *")).forEach(i=>i.addEventListener("click", function (e) {
        nextTextForBubble();
    }));
}());



// 3) From configRotatingText.js

(function() {
    // Modifying this array allows you to configure the rotating text. Remember to add the full stop at the end!
    let rotatingTextArray = [
        "Software Developer.",
        // "Tech Educator.",
    ];
    
    // Change the duration of the each cycle. Set this value to 0 to disable it. 
    let rotatingTextCycleDuration = 2;
    
    // Don't modify the lines below.
    function getRotatingTextStyleString(inputTextArray) {
        const baseEM = 1.2;
        const baseIntervalPercentage = 1 / inputTextArray.length;
        let output = "@keyframes rotatingText {\n";
        inputTextArray.forEach((textValue, index) => {
            const startTime = index * baseIntervalPercentage * 100;
            const midTime = startTime + baseIntervalPercentage * 4/5 * 100;
            const currentEM = -index * baseEM + "em";
            output += `${startTime}% {\n    top: ${currentEM};\n}\n${midTime}% {\n    top: ${currentEM};\n}\n`;
        })

        output += "100% {top: 0;}}";
        return output;
    }

    const rotatingTextOverlay = document.querySelector(".rotatingTextOverlay");
    const rotatingTextStyleElement = document.createElement("style");
    rotatingTextStyleElement.innerHTML = getRotatingTextStyleString(rotatingTextArray);
    document.querySelector("head").append(rotatingTextStyleElement);
    rotatingTextCycleDuration && (rotatingTextOverlay.style.animation = `rotatingText ${rotatingTextCycleDuration * rotatingTextArray.length}s infinite ease-out`);
    rotatingTextOverlay.innerHTML = null;
    for (let text of rotatingTextArray) {
        const newElement = document.createElement("span");
        newElement.classList.add("rotatingTextInner");
        newElement.innerText = text;
        rotatingTextOverlay.append(newElement);
    }
})();


// 4) from configProjectTagColour.js

(function () {
    // This object will color project tags based on their text content. For example, all HTML tags will be colored red.
    const TEXT_TO_COLOR = {
        HTML: "#ff8f8f",
        CSS: "#51eaff",
        JavaScript: "#ffe86f",
        "REST APIs": "#51FFA2"
    }

    for (let element of document.querySelectorAll(".projectTags li")) {
        let elementColor = TEXT_TO_COLOR[element.textContent];
        elementColor !== undefined && (element.style.backgroundColor = elementColor);
    }
})();