(function () {
    // When you click on your PFP, your PFP will interact and say something. Make a list for it to say!
    let textEntries = ["hey, click me!",
        "do it again!",
        "~clears throat~",
        "Hi! I'm Maye!",
        "I'm an Applied AI Developer.",
        "Been in tech for over 3 years.",
        "Building awesome applications.",
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