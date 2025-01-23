// Initialize Imports
import * as v from "./validators.js";
import * as h from "./helpers.js";
// {resetPasswordStrengthIndicator, passwordStrengthIndicator}
// GENERATE PASSWORD FUNC
function generatePassword(passwordLength) {
  const passwordOutput = document.querySelector(".password-output");
  const copyPaswordBtn = document.querySelector(".copy-btn");
  const form = document.querySelector("form");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const NumbersCharOpt = form.elements.number;
  // let sharedVal ;
  if (lettersOpt.checked && NumbersCharOpt.checked && specialCharOpt.checked) {
    //  handles cases when all the options have been selected
    // brake the password into equal parts based on user selection
    v.resetPasswordStrengthIndicator();
    // passwordlength >= 6 ? (sharedVal = passwordlength / 3)
    //   : (sharedVal = passwordlength / 2);
    // generate the user selected values
    // let letter = generateLetters();
    // let num = generateNumbers();
    // let spChars = generateSpecialChars();
    const passwordData = {
      alphabets : generateLetters(),
      numbers : generateNumbers(),
      spChars : generateSpecialChars(),
      length: passwordLength
    }
    //   update the UI with the generated password
    passwordOutput.textContent = CleanPassword(passwordData).join("");
    v.passwordStrengthIndicator(2);
  } else if (lettersOpt.checked && NumbersCharOpt.checked) {
    //  handles cases when only the letter and number options have been selected
    // brake the password into equal parts based on user selection
    resetPasswordStrengthIndicator();
    sharedVal = passwordlength / 2;
    // generate the user selected values
    let letter = generateLetters(sharedVal);
    let num = generateNumbers(sharedVal);
    //   update the UI with the generated password
    passwordOutput.textContent = ShufflePasswordChars(letter, num).join("");
    passwordStrengthIndicator(1);
  } else if (specialCharOpt.checked && lettersOpt.checked) {
    //  handles cases when only the sepcial character and letter options have been selected
    // brake the password into equal parts based on user selection
    resetPasswordStrengthIndicator();
    sharedVal = passwordlength / 2;
    // generate the user selected values
    let letter = generateLetters(sharedVal);
    let spChars = generateSpecialChars(sharedVal);
    //   update the UI with the generated password
    passwordOutput.textContent = ShufflePasswordChars(letter, spChars).join("");
    passwordStrengthIndicator(1);
  } else if (specialCharOpt.checked && NumbersCharOpt.checked) {
    //  handles cases when only the sepcial character and number options have been selected
    // brake the password into equal parts based on user selection
    // reset the pasword strength indicator
    resetPasswordStrengthIndicator();
    sharedVal = passwordlength / 2;
    // generate the user selected values
    let num = generateNumbers(sharedVal);
    let spChars = generateSpecialChars(sharedVal);
    //   update the UI with the generated password
    passwordOutput.textContent = ShufflePasswordChars(spChars, num).join("");
    passwordStrengthIndicator(1);
  } else if (lettersOpt.checked || NumbersCharOpt.checked || specialCharOpt.checked) {
    //  handles cases either sepcial character, number or letter options have been selected
    // reset the pasword strength indicator
    resetPasswordStrengthIndicator();
    switch (true) {
      case specialCharOpt.checked:
        let spChars = generateSpecialChars(passwordlength);
        //   update the UI with the generated password
        passwordOutput.textContent = ShufflePasswordChars(spChars).join("");
        break;
      case NumbersCharOpt.checked:
        let num = generateNumbers(passwordlength);
        //   update the UI with the generated password
        passwordOutput.textContent = ShufflePasswordChars(num).join("");
        break;
      case lettersOpt.checked:
        let letter = generateLetters(passwordlength);
        //   update the UI with the generated password
        passwordOutput.textContent = ShufflePasswordChars(letter).join("");
        break;
    }
    passwordStrengthIndicator(0);
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
  let numsArr = [0,1,2,3,4,5,6,7,8,9];
  numsArr = h.shuffle(numsArr);
  return numsArr;
}

// GENERATE SPECIAL CHARACTERS FUNC
function generateSpecialChars() {
	let specialCharArr = ["$", "%", "&", "@", "?","!"];
  specialCharArr = h.shuffle(specialCharArr);
	return specialCharArr;
}

// SHUFFLE PASSWORD CHAR FUNC
function CleanPassword(passwordData) {
  const { alphabets, numbers, spChars, length } = passwordData;

  let passwordArry = [...alphabets, ...numbers, ...spChars];
  // filter out falsey values from the new password array
  passwordArry = passwordArry.filter((item) => {
    if (item != undefined) {
      return item;
    }
  });
  console.log(passwordArry);
  passwordArry = h.shuffle(passwordArry);

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
  let regex = /$%&@?!/g;
  if (!regex.test(password)) {
    password = password.split("");
    password.splice(-3, 3);
    password.push("@", "$", "%");
    password = h.shuffle(password);
    return password;
  } else {
    password = password.split("");
    return password;
  }
}




export {generatePassword}
