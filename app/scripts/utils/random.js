// Initialize Imports
import * as v from "./validators.js";
import * as h from "./helpers.js";

// GENERATE PASSWORD FUNC
function generatePassword(passwordLength) {
  const passwordOutput = document.querySelector(".form__password-output");
  const copyPaswordBtn = document.querySelector(".copy-btn");
  const form = document.querySelector("form");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const numbersCharOpt = form.elements.number;

  if (lettersOpt.checked && numbersCharOpt.checked && specialCharOpt.checked) {
    //  handles cases when all the options have been selected
    v.resetPasswordStrengthIndicator();
    const passwordData = {
      alphabets: generateLetters(),
      numbers: generateNumbers(),
      spChars: generateSpecialChars(),
      length: passwordLength,
    };
    //  update the UI with the generated password
    passwordOutput.textContent = cleanPassword(passwordData);
    // Display password strength indicator
    v.passwordStrengthIndicator(2);
  } else if (lettersOpt.checked && numbersCharOpt.checked) {
    //  handles cases when only the letter and number options have been selected
    v.resetPasswordStrengthIndicator();
    const passwordData = {
      alphabets: generateLetters(),
      numbers: generateNumbers(),
      length: passwordLength,
    };
    //  update the UI with the generated password
    passwordOutput.textContent = cleanPassword(passwordData);
    v.passwordStrengthIndicator(1);
  } else if (specialCharOpt.checked && lettersOpt.checked) {
    //  handles cases when only the sepcial character and letter options have been selected
    v.resetPasswordStrengthIndicator();
    const passwordData = {
      alphabets: generateLetters(),
      spChars: generateSpecialChars(),
      length: passwordLength,
    };
    //  update the UI with the generated password
    passwordOutput.textContent = cleanPassword(passwordData);
    v.passwordStrengthIndicator(1);
  } else if (specialCharOpt.checked && numbersCharOpt.checked) {
    //  handles cases when only the sepcial character and number options have been selected
    v.resetPasswordStrengthIndicator();
    const passwordData = {
      numbers: generateNumbers(),
      spChars: generateSpecialChars(),
      length: passwordLength,
    };
    //   update the UI with the generated password
    passwordOutput.textContent = cleanPassword(passwordData);
    v.passwordStrengthIndicator(1);
  } else if (
    lettersOpt.checked ||
    numbersCharOpt.checked ||
    specialCharOpt.checked
  ) {
    //  handles cases either sepcial character, number or letter options have been selected
    v.resetPasswordStrengthIndicator();
    passwordOutput.textContent = createSingleCharType(passwordLength);
    v.passwordStrengthIndicator(0);
  }

  copyPaswordBtn.classList.add("show");
  return passwordOutput.textContent;
}


// GENERATE LETTER FUNC
function generateLetters() {
  let alphabetArry = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  alphabetArry = h.shuffle(alphabetArry);
  // Map over the alphabetArry to create mixture of uppercase and lowercase letters
  alphabetArry = alphabetArry.map((val) => {
    if (alphabetArry.indexOf(val) % 2 === 0) {
      return val.toUpperCase();
    }
    return val;
  });
  //return the modified/randomised array from the func
  return alphabetArry;
}

// GENERATE NUMBERS FUNC
function generateNumbers() {
  let numsArr = ["0",1,2,3,4,5,6,7,8,9];
  numsArr = h.shuffle(numsArr);
  return numsArr;
}

// GENERATE SPECIAL CHARACTERS FUNC
function generateSpecialChars() {
	let specialCharArr = ["$", "%", "&", "@", "?","!", "*", "^", "_"];
  specialCharArr = h.shuffle(specialCharArr);
	return specialCharArr;
}

// CLEAN PASSWORD FUNC
function cleanPassword({
  alphabets = [],
  numbers = [],
  spChars = [],
  length,
} = passwordData) {
  let passwordArry = [...alphabets, ...numbers, ...spChars];

  // filter out falsey values from the new password array
  passwordArry = passwordArry.map((item) => {
    if (item != undefined) {
      return item;
    }
  });

  passwordArry = h.shuffle(passwordArry);
  console.log(passwordArry);

  let password = [];
  // create a new array from the passwordArry by randomly accessing
  // its elements via its indexes
  for (let i = 0; i < length; i++) {
    let randNo = Math.floor(Math.random() * passwordArry.length);
    password.push(passwordArry[randNo]);
  }
  password = password.join("");
  //check if the generated password contains special character
  // if it does'nt, then include the special characters
  let regex = /$%&@?!*^_/g;
  if (regex.test(password)) {
    const chars = ["$", "%", "&", "@", "?", "!", "*", "^", "_"];
    password = password.split("");
    password.splice(-3, 3);
    for(let i=0; i<3; i++){
      let randNum = Math.floor(Math.random()* 8);
      password.push(chars[randNum]);
    }
    console.log("remixed",password)
    password = h.shuffle(password);
    return (password = password.join(""));
  } else {
    password = password.split("");
    console.log("striaght",password);
    return (password = password.join(""));
  }
}

// CREATE SINGLE CHAR TYPE FUNCTION
function createSingleCharType(passwordLength) {
  const form = document.querySelector("form");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const numbersCharOpt = form.elements.number;

  if (specialCharOpt.checked) {
    const passwordData = {
      spChars: generateSpecialChars(),
      length: passwordLength,
    };
    //   update the UI with the generated password
    return cleanPassword(passwordData);
  } else if (numbersCharOpt.checked) {
    const passwordData = {
      numbers: generateNumbers(),
      length: passwordLength,
    };
    //   update the UI with the generated password
    return cleanPassword(passwordData);
  } else if (lettersOpt.checked) {
    const passwordData = {
      alphabets: generateLetters(),
      length: passwordLength,
    };
    //   update the UI with the generated password
    return cleanPassword(passwordData)
    // console.log(deg)
    // passwordOutput.textContent = cleanPassword(passwordData);
  }
}



export {generatePassword}
