quiz_data = [
    {
        id: 0,
        question: "Welches dieser vier Länder hat die wenigsten Einwohner?",
        a: "Schweiz",
        b: "Österreich",
        c: "Schweden",
        d: "Finnland",
        correct: "d"
    },
    {
        id: 1,
        question: "Welcher Berg ist der höchste, der ganz in der Schweiz liegt?",
        a: "Matterhorn",
        b: "Dom",
        c: "Dufourspitze",
        d: "Weisshorn",
        correct: "b"
    },
    {
        id: 2,
        question: "Wieviele Kantone hat die Schweiz?",
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        correct: "a"
    },
    {
        id: 3,
        question: "Wieviele Nachbarstaaten hat die Schweiz?",
        a: 3,
        b: 4,
        c: 5,
        d: 6,
        correct: "c"
    }
]

// get elements
const question_el = document.querySelector(".question_el");
const answer_a_el = document.getElementById("a_label");
const answer_b_el = document.getElementById("b_label");
const answer_c_el = document.getElementById("c_label");
const answer_d_el = document.getElementById("d_label");
const wrapper_el = document.querySelector(".wrapper");
const submit_btn = document.getElementById("btn_submit");

const radio_btns = document.querySelectorAll(".btn_radio");

let currentId = 0;
let score = 0;

let incorrectAnswers = [];

function loadQuiz(id) {
    const quiz = quiz_data[id];
    question_el.innerText = quiz.question;
    answer_a_el.innerText = quiz.a;
    answer_b_el.innerText = quiz.b;
    answer_c_el.innerText = quiz.c;
    answer_d_el.innerText = quiz.d;
};

loadQuiz(0);

function submitQuiz() {

    if (submit_btn.innerText == "Neuer Versuch") {
        location.reload();
    }

    let currentQuiz = quiz_data[currentId];
    let answer = undefined;
    radio_btns.forEach(btn => {
        if(btn.checked) {
            answer = btn.value;
        }
    })

    if (answer === currentQuiz.correct) {
        score ++;
    }
    else {
        incorrectAnswers.push(currentQuiz);
    }

    if (answer) {
        currentId++;
    }
    
    if (currentId < quiz_data.length) {
        deselectRadio();
        loadQuiz(currentId);
    }
    else {
        if (incorrectAnswers.length == 0) {
            wrapper_el.innerHTML = `<h2>Congratulations, all answers were correct!</h2>`;
        }
        else {
            let incorrectText = "";
            incorrectAnswers.forEach(quiz => {
                incorrectText += "<li>" + quiz.question + "</li>";
            })
            wrapper_el.innerHTML = `<h2>Du hast ${score} / ${quiz_data.length} Fragen richtig beantwortet.</h2>
            <p>Die Antworten zu folgenden Fragen waren nicht korrekt:</p>${incorrectText}`
        }
        
        submit_btn.innerText = "Neuer Versuch";
    }
    
}

function deselectRadio() {
    radio_btns.forEach(btn => {
        btn.checked = false;
    })
}