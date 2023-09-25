    const counterBox = document.getElementById("counter");
    counterBox.innerText = "10";

    const scoreBox = document.getElementById("score");
    let score = 0;
    scoreBox.innerText = 0;
    
    const questionLine = document.getElementById("questionLine");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const option4 = document.getElementById("option4");

    let currentQuestion = null;

    function insertQuestion() {
        const newQuestion = questionArray[Math.floor(Math.random() * 24)];
        currentQuestion = newQuestion;

        const time = new Date().getHours() - 2;
        const minutes = String(new Date().getMinutes()).padStart(2, '0');

        questionLine.innerText = newQuestion.question;
        option1.innerText = (timeModifier(time + newQuestion.options[0].text) + ":" + minutes);
        option2.innerText = (timeModifier(time + newQuestion.options[1].text) + ":" + minutes);
        option3.innerText = (timeModifier(time + newQuestion.options[2].text) + ":" + minutes);
        option4.innerText = (timeModifier(time + newQuestion.options[3].text) + ":" + minutes);
    }
       
    option1.addEventListener("click", handleButtonClick);
    option2.addEventListener("click", handleButtonClick);
    option3.addEventListener("click", handleButtonClick);
    option4.addEventListener("click", handleButtonClick);

    function handleButtonClick(event) {
        const buttonPressed = event.target; 
        const optionPressed = buttonPressed.id;
        const optionNumber = optionPressed.charAt(6);

        if(currentQuestion.options[optionNumber - 1].correct == true) {
            counterBox.innerText = 10;
            scoreBox.innerText = ++score;
            insertQuestion();
        } else {
            window.location.href = "/second?score=" + score;
        }
    }

    function timeModifier(timeToBeModified) {
        if(timeToBeModified < 0) {
            return String(24 + timeToBeModified).padStart(2, '0');
        } else if(timeToBeModified > 23) {
            return String(-24 + timeToBeModified).padStart(2, '0');
        } else {
            return String(timeToBeModified).padStart(2, '0');
        }
    }

const questionArray = [
  {
    question: "Hvad er klokken i Tuvalu?",
    options: [
      { text: 12, correct: true },
      { text: 11, correct: false },
      { text: 10, correct: false },
      { text: 9, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Maldiverne?",
    options: [
      { text: 6, correct: false },
      { text: 5, correct: true },
      { text: 4, correct: false },
      { text: 3, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Marshalløerne?",
    options: [
      { text: 10, correct: true },
      { text: 9, correct: false },
      { text: 8, correct: false },
      { text: 7, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Pitcairn Islands?",
    options: [
      { text: -8, correct: false },
      { text: -7, correct: false },
      { text: -6, correct: false },
      { text: -5, correct: true }
    ]
  },
  {
    question: "Hvad er klokken i São Tomé og Príncipe?",
    options: [
      { text: 1, correct: true },
      { text: 2, correct: false },
      { text: 3, correct: false },
      { text: 4, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Kiribati?",
    options: [
      { text: 10, correct: false },
      { text: 11, correct: true },
      { text: 12, correct: false },
      { text: 13, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Nauru?",
    options: [
      { text: 9, correct: true },
      { text: 10, correct: false },
      { text: 11, correct: false },
      { text: 12, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Saint Kitts og Nevis?",
    options: [
      { text: -4, correct: true },
      { text: -5, correct: false },
      { text: -6, correct: false },
      { text: -7, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Tonga?",
    options: [
      { text: 12, correct: false },
      { text: 13, correct: true },
      { text: 14, correct: false },
      { text: 15, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Samoa?",
    options: [
      { text: -9, correct: false },
      { text: -10, correct: true },
      { text: -11, correct: false },
      { text: -12, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Fiji?",
    options: [
      { text: 11, correct: false },
      { text: 12, correct: true },
      { text: 13, correct: false },
      { text: 14, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Vanuatu?",
    options: [
      { text: 10, correct: true },
      { text: 11, correct: false },
      { text: 12, correct: false },
      { text: 13, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Palau?",
    options: [
      { text: 8, correct: true },
      { text: 9, correct: false },
      { text: 10, correct: false },
      { text: 11, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Seychellerne?",
    options: [
      { text: 3, correct: true },
      { text: 4, correct: false },
      { text: 5, correct: false },
      { text: 6, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Mikronesien?",
    options: [
      { text: 9, correct: false },
      { text: 10, correct: true },
      { text: 11, correct: false },
      { text: 12, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Brunei?",
    options: [
      { text: 7, correct: true },
      { text: 8, correct: false },
      { text: 9, correct: false },
      { text: 10, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Marshalløerne?",
    options: [
      { text: 10, correct: true },
      { text: 11, correct: false },
      { text: 12, correct: false },
      { text: 13, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Cookøerne?",
    options: [
      { text: -9, correct: false },
      { text: -10, correct: false },
      { text: -11, correct: true },
      { text: -12, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Comorerne?",
    options: [
      { text: 2, correct: true },
      { text: 3, correct: false },
      { text: 4, correct: false },
      { text: 5, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Kiribati?",
    options: [
      { text: 10, correct: false },
      { text: 11, correct: true },
      { text: 12, correct: false },
      { text: 13, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Maldiverne?",
    options: [
      { text: 6, correct: false },
      { text: 5, correct: true },
      { text: 4, correct: false },
      { text: 3, correct: false }
    ]
  },
  {
    question: "Hvad er klokken i Marshalløerne?",
    options: [
      { text: 10, correct: true },
      { text: 9, correct: false },
      { text: 8, correct: false },
      { text: 7, correct: false }
    ]
  },
  {
    question: "Hvad er klokken på Pitcairn Islands?",
    options: [
      { text: -8, correct: false },
      { text: -7, correct: false },
      { text: -6, correct: false },
      { text: -5, correct: true }
    ]
  },
  {
    question: "Hvad er klokken i São Tomé og Príncipe?",
    options: [
      { text: 1, correct: true },
      { text: 2, correct: false },
      { text: 3, correct: false },
      { text: 4, correct: false }
    ]
  },
];

insertQuestion();

setInterval( () => {
    if(counterBox.innerText < 1) {
        window.location.href = "/second?score=" + score;
    } else {
        counterBox.innerText = Number(counterBox.innerText) - 1;
}}, 1000);
