// Initialize Imports
import { resetPasswordStrengthIndicator } from "./validators.js";

// COPY PASSWORD FUNC
function copyPassword(passwordElement) {
  // access the clipboard object via the navigator object to copy the generated password
  navigator.clipboard.writeText(passwordElement.textContent);
  resetApp();
  console.log("password copied");
}

// UPDATE RECENT PASSWORD LIST FUNC
function updateRecentsList(password) {
  const recentPassList = document.querySelector(
    ".recent-password-container ul"
  );
  const recentPassContainer = document.querySelector(
    ".recent-password-container"
  );
  const listElement = document.createElement("li");
  listElement.classList.add("rect-paswd", "d-flex");

  listElement.innerHTML = 
  `<p>${password}</p><button class="copy-r-btn" type="button">copy</button>`;
  recentPassList.append(listElement);

  // saveToLocalStorage(password);
  const recentsPasswordsArry = retrieveFromLocalStorage();
  const passwordList = document.querySelectorAll(".rect-paswd");
  // event listener on each created list item to enable copy operation
  // on each item independently
  passwordList.forEach((item) => {
    const copyBtn = item.querySelector(".copy-r-btn");
    const copiedPasswordElement = copyBtn.previousElementSibling;
    copyBtn.addEventListener("click", () => {
      console.log(copiedPasswordElement.textContent);
      copyPassword(copiedPasswordElement);
      console.log("password copied from recents list");
    });
  });

  // limit the list of recent passwords to 5 items at all times,
  // by automatically removing the password list items when they exceed 5 items
  if (recentsPasswordsArry.length > 5) {
    [...passwordList][0].remove();
    recentsPasswordsArry.shift();
    localStorage.setItem("passwordList", JSON.stringify(recentsPasswordsArry));
  }

  if (passwordList.length > 0) {
    recentPassContainer.classList.add("show");
  }
}

// CLEAR RECENTS PASSWORD LIST FUNC
function clearRecentPasswordList() {
  const passwordList = document.querySelectorAll(".rect-paswd");
  const recentPassContainer = document.querySelector(
    ".recent-password-container"
  );
  passwordList.forEach((element) => {
    element.remove();
  });
  localStorage.removeItem("passwordList");
  recentPassContainer.classList.remove("show");
  resetApp();
}

// RESET APP FUNC
function resetApp() {
  const passwordOutput = document.querySelector(".password-output");
  const form = document.querySelector("form");
  const sliderOutput = document.querySelector(".slider-val");
  const pwLengthSlider = document.getElementById("pw-length");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const numbersCharOpt = form.elements.number;
  // reset the form inputs to an unchecked state
  lettersOpt.checked = false;
  specialCharOpt.checked = false;
  numbersCharOpt.checked = false;
  sliderOutput.textContent = 6;
  pwLengthSlider.value =  sliderOutput.textContent;
  passwordOutput.textContent = "";
  // reset the pasword strength indicator
  resetPasswordStrengthIndicator();
}

// ADD TO LOCAL STORAupdateRecentsListGE FUNC
function retrieveFromLocalStorage() {
  return localStorage.getItem("passwordList")
    ? JSON.parse(localStorage.getItem("passwordList"))
    : [];
}

// ADD TO LOCAL STORAGE
function saveToLocalStorage(password) {
  let recentsArry = retrieveFromLocalStorage();
  recentsArry.push(password);
  localStorage.setItem("passwordList", JSON.stringify(recentsArry));
}

// LOAD RECENT PASSWORDS FROM LOCAL STORAGE FUNC
function loadRecentsPassword() {
  let recentPasswords = retrieveFromLocalStorage();
  if (recentPasswords.length > 0) {
    recentPasswords.forEach((item) => {
      updateRecentsList(item);
    });
  }
}

// SHUFFLE FUNCTION
function shuffle(arry) {
  let currentIndex = arry.length;

  while (currentIndex != 0) {
    // in each iteration of the loop
    // create a random index value(variable) using the current index value(variable)
    // the subtract on from the currentIndex value. this will end the loop when its value is === 0
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // using destrusturing, swap the value of the password array using the currentIndex and RandomIndex values
    // starting from its highest index to its lowest index(0) on each iteration.
    // ensentially shuffle the values of the array in place.
    [arry[currentIndex], arry[randomIndex]] = [
      arry[randomIndex],
      arry[currentIndex],
    ];
  }
  return arry;
}

export {
  copyPassword,
  clearRecentPasswordList,
  updateRecentsList,
  saveToLocalStorage,
  loadRecentsPassword,
  shuffle
};
