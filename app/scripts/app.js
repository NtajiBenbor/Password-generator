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
  const pwLengthInpOpt_1 = document.getElementById("pw-length-1");
  const pwLengthInpOpt_2 = document.getElementById("pw-length-2");
  const pwLengthInpOpt_3 = document.getElementById("pw-length-3");
  let pLength;

  //Event listener that controls from submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // On form submission, generate a password based on the selected length and character options.
    // If no character options are selected, show an alert.
    switch (true) {
      case pwLengthInpOpt_1.checked:
        if (
          !NumbersCharOpt.checked &&
          !lettersOpt.checked &&
          !specialCharOpt.checked
        ) {
          console.log("please select a character option");
        } else {
          pLength = parseInt(pwLengthInpOpt_1.value);
          let password = Utils.random.generatePassword(pLength);
          Utils.helpers.saveToLocalStorage(password);
          Utils.helpers.updateRecentsList(password);
        }
        break;
      case pwLengthInpOpt_2.checked:
        if (
          !NumbersCharOpt.checked &&
          !lettersOpt.checked &&
          !specialCharOpt.checked
        ) {
          console.log("please select a character option");
        } else {
          pLength = parseInt(pwLengthInpOpt_2.value);
          let password = Utils.random.generatePassword(pLength);
          Utils.helpers.saveToLocalStorage(password);
          Utils.helpers.updateRecentsList(password);
        }
        break;
      case pwLengthInpOpt_3.checked:
        if (
          !NumbersCharOpt.checked &&
          !lettersOpt.checked &&
          !specialCharOpt.checked
        ) {
          console.log("please select a character option");
        } else {
          pLength = parseInt(pwLengthInpOpt_3.value);
          let password = Utils.random.generatePassword(pLength);
          Utils.helpers.saveToLocalStorage(password);
          Utils.helpers.updateRecentsList(password);
        }
        break;
    }
  });

  //Event listener that controls the copy button functionality
  copyPasswordBtn.addEventListener("click", () => {
    Utils.helpers.copyPassword(passwordOutput);
  });

  // Event listner that clears the recents password list
  clearRecentsListBtn.addEventListener("click", () => {
    Utils.helpers.clearRecentPasswordList();
  });
}
