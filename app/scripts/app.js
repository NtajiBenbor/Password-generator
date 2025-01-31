// Initialize imports from namespace
import * as Utils from "./utils/index.js";

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    initApp();
    Utils.helpers.loadRecentsPassword();
  }
});

// TODO:ADD A FEED BACK MESSAGE TO USER WHEN PASSWORD HAS BEEN COPIED
// TODO: ADD AN ERROR MESSAGE TO USER WHEN NO OPTION HAS BEEN SELECTED
// TODO ADD NOTIFICATIONS
// TODO: ADD AIMATION WHEN PASSWORDS HAVE BEEN CLEARED
// TODO: ADD ANIMATION WHEN NEW PASSWORD IS ADDED TO RECENTS
// TODO: ADD ANIMATION WHEN AN OLDER PASWOED HAS BEEN AGED OUT BY RECENT PASSWORD

// INIT APP FUNCTION
function initApp() {
  const form = document.querySelector("form");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const NumbersCharOpt = form.elements.number;
  const copyPasswordBtn = document.querySelector(".copy-btn");
  const passwordOutput = document.querySelector(".password-output");
  const clearRecentsListBtn = document.querySelector(".clear-btn");
  const sliderOutput = document.querySelector(".slider-val");
  const pwLengthSlider = document.getElementById("pw-length");
  let pLength;

  // sets the output of the slider to the sliders initial value 
  sliderOutput.textContent = pwLengthSlider.value;

  //Event listener that controls from submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      !NumbersCharOpt.checked &&
      !lettersOpt.checked &&
      !specialCharOpt.checked
    ) {
      console.log("please select a character option");
    } else {
      pLength = parseInt(pwLengthSlider.value);
      const passwordData = {
        password: Utils.random.generatePassword(pLength),
        date: Utils.helpers.genDate()
      };

      Utils.helpers.saveToLocalStorage(passwordData);
      Utils.helpers.updateRecentsList(passwordData);
    }

  });

  // Event listener for slider
  pwLengthSlider.addEventListener("input", () => {
    sliderOutput.textContent = pwLengthSlider.value;
  });

  //Event listener that controls the copy button functionality
  copyPasswordBtn.addEventListener("click", () => {
    Utils.helpers.copyPassword(passwordOutput);
  });

  // Event listener that clears the recents password list
  clearRecentsListBtn.addEventListener("click", () => {
    Utils.helpers.clearRecentPasswordList();
  });
}
