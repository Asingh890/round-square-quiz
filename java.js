// ===============================
// QUIZ DATA
// ===============================

const quizData = [
{
question:"What lies at the absolute heart of the Round Square Spirit of Internationalism? 🌍",
options:[
"Learning to speak every language perfectly",
"Discovering and embracing the similarities and differences between cultures and nations",
"Memorizing the flags of all countries in the world",
"Traveling only to places that look exactly like your hometown"
],
correct:1,
explanation:"Internationalism is all about celebrating diversity, building cross-cultural respect, and realizing how connected we all are!"
},

{
question:"You meet an exchange student whose traditional lunches look and smell very different from yours. What is the most 'Globally Minded' action to take? 🍱",
options:[
"Ignore them and sit somewhere else with your usual friends",
"Tell them their food looks strange and they should change it",
"Ask them politely about their food and learn about their culture's flavors",
"Bring them an American sandwich without asking so they fit in"
],
correct:2,
explanation:"Showing genuine inquisitiveness and respect for other traditions builds lasting international friendships."
},

{
question:"Why is digital communication (like video calling another classroom across the world) an important tool for Internationalism? 💻",
options:[
"It allows us to discover global perspectives and collaborate directly across borders",
"It is just a fun way to avoid regular schoolwork",
"It proves that our way of living is the best way",
"It helps us see who has the fastest internet speeds"
],
correct:0,
explanation:"Technology allows us to cross geographical borders instantly to share ideas, music, and traditions, making the world feel like a closer community."
},

{
question:"What does it mean to be a 'Responsible Global Citizen' when dealing with world problems like pollution? 🌊",
options:[
"Believing that environmental issues are only the problem of the country where they started",
"Understanding that global issues require collaborative problem-solving across nations",
"Waiting for adults in other countries to fix everything",
"Ignoring news from other parts of the world"
],
correct:1,
explanation:"Global issues don't stop at national borders! Air, oceans, and ecosystems connect us all."
},

{
question:"When we blend cultures together through global trade, music, and travel, what should happen to a country's unique national identity? 🎶",
options:[
"It should be entirely forgotten so everyone is exactly the same",
"It should be locked away so outsiders can never see it",
"It should be preserved and celebrated as part of a rich international tapestry",
"It should be changed to match whatever is popular on television"
],
correct:2,
explanation:"True Internationalism doesn't mean erasing our roots; it means proudly sharing our unique heritage while respecting others!"
}
];

// ===============================
// VARIABLES
// ===============================

let currentQuestion = 0;
let score = 0;
let timer = 15;
let interval;
let explorer = "";

// ===============================
// ELEMENTS
// ===============================

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const playerName = document.getElementById("playerName");

const question = document.getElementById("question");
const options = document.getElementById("options");
const explanation = document.getElementById("explanation");

const timerText = document.getElementById("timer");
const timerCircle = document.querySelector(".timer-progress");

const progressBar = document.getElementById("progressBar");

const scoreBox = document.getElementById("score");
const questionCount = document.getElementById("questionCount");

const finalScore = document.getElementById("finalScore");
const performanceText = document.getElementById("performanceText");
const playerGreeting = document.getElementById("playerGreeting");
const stats = document.getElementById("stats");

// ===============================
// START QUIZ
// ===============================

startBtn.onclick = () => {

explorer = playerName.value.trim();

if(explorer===""){
explorer="Explorer";
}

welcomeScreen.classList.remove("active");
quizScreen.classList.add("active");

loadQuestion();

};

// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion(){

clearInterval(interval);

timer=15;

updateTimer();

startTimer();

nextBtn.classList.add("hidden");

explanation.style.display="none";

let q=quizData[currentQuestion];

question.textContent=q.question;

questionCount.textContent=currentQuestion+1;

progressBar.style.width=((currentQuestion)/quizData.length)*100+"%";

options.innerHTML="";

q.options.forEach((item,index)=>{

const div=document.createElement("div");

div.className="option";

div.innerHTML=item;

div.onclick=()=>selectAnswer(index);

options.appendChild(div);

});

}
// =====================================
// PART 3A-2
// Timer + Answer Checking + Next Question
// Paste directly below Part 3A-1
// =====================================

function startTimer() {

    interval = setInterval(() => {

        timer--;

        updateTimer();

        if (timer <= 0) {

            clearInterval(interval);

            lockQuestion(-1);

        }

    }, 1000);

}

function updateTimer() {

    timerText.textContent = timer;

    const circumference = 188.4;
    const offset = circumference - (timer / 15) * circumference;

    timerCircle.style.strokeDashoffset = offset;

}

function selectAnswer(choice) {

    clearInterval(interval);

    lockQuestion(choice);

}

function lockQuestion(choice) {

    const q = quizData[currentQuestion];

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach((option, index) => {

        option.style.pointerEvents = "none";

        if (index === q.correct) {

            option.classList.add("correct");

        }

        if (choice === index && choice !== q.correct) {

            option.classList.add("wrong");

        }

    });

    if (choice === q.correct) {

        score += 20;

        scoreBox.textContent = score + " XP";

    }

    explanation.style.display = "block";
    explanation.innerHTML = "<strong>Explanation:</strong><br>" + q.explanation;

    nextBtn.classList.remove("hidden");

}

nextBtn.onclick = () => {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showResults();

    }

};