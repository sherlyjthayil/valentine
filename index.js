import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://js-projects-cfaa3-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "Response")


const responseElement = document.getElementById("response");
const responseText = document.getElementById("responseText");
const sherImg = document.getElementById("sherlyImage");
const errMsg = document.getElementById("submitErrorMsg");
const btnSubmit = document.getElementById("btn-Submit");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
btnSubmit.addEventListener("click", function() {
    const selectedOption = document.querySelector('input[name="valentine"]:checked');
    if (selectedOption) {
        if (selectedOption.value === "yes") {
            errMsg.textContent = "";
            responseText.textContent = "Wow! Excellent decision, You have unlocked Valentine Mode ❤️.";
            sherImg.src = "./images/sher2.jpg";
             step2.style.display = "block"; // reveal Step 2
            responseElement.style.display = "block";
        } else {
            errMsg.textContent = "";
            responseText.textContent = "🚨 Wrong answer! Please select YES 😏";
            step2.style.display = "none";
             step3.style.display = "none";
             sherImg.src = "./images/sher.jpg";
            responseElement.style.display = "block";
        }
    } else {
        errMsg.textContent = "Please select an option.";
        step2.style.display = "none";
    }
});
const btnNext = document.getElementById("btn-Next");
btnNext.addEventListener("click", function() {
const choice = document.querySelector('input[name="celebrate"]:checked');
if (!choice) return;

const question = document.getElementById("question");

if (choice.value === "eat") {
question.innerHTML = "What do you want to eat at home? 🍕";
} else {
question.innerHTML = "Where do you want to dine out? 🍽";
}

document.getElementById("step3").style.display = "block";
});
const btnSubmitAnswer = document.getElementById("btn-SubmitAnswer");
btnSubmitAnswer.addEventListener("click", function() {
const text = document.getElementById("answer").value;

push(referenceInDB, text)
.then(() => {
document.getElementById("finalMsg").innerHTML = "Submission received ❤️ Can't wait!";
})
.catch((error) => {
console.error("Error recording your preference: ", error);
});
});  
