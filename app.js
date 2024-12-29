
// import * as utils from "./utils.js"
import {generatePassword, copyPassword} from "./utils.js"

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    initApp();
  }
});

// TODO:ADD A FEED BACK MESSAGE TO USER WHEN PASSWORD HAS BEEN COPIED
// TODO: ADD AN ERROR MESSAGE TO USER WHEN NO OPTION HAS BEEN SELECTED


// INIT APP FUNCTION
function initApp() {
  const form = document.querySelector("form");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const NumbersCharOpt = form.elements.number;
  const copyPasswordBtn = document.querySelector(".copy-btn");
  const pwLengthInpOpt_1  = document.getElementById("pw-length-1");
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
        generatePassword(pLength);
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
        generatePassword(pLength);
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
        generatePassword(pLength);
      }
      break;
  }
  });

  //Event listener that controls the copy button functionality
  copyPasswordBtn.addEventListener("click",copyPassword);


}





