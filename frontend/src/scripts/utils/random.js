// Initialize Imports
import {resetPasswordStrengthIndicator, passwordStrengthIndicator} from "./validators.js";

// GENERATE LETTER FUNC
function generateLetters(sharedVal) {
  // letter logic
  let charCode = 97;
  const letterArry = [];
  let randLetterArry = [];

  // generate the 26(A-Z) alphabets using charCode property.
  while (charCode <= 122) {
    letterArry.push(String.fromCharCode(charCode));
    charCode++;
  }
  // create a new array by randomly selecting letters from the letterArry
 //   the loop iteration count is determined by the functions argument
  for (let i = 0; i < sharedVal; i++) {
    let randNo = Math.floor(Math.random() * letterArry.length-1) + 1;
    randLetterArry.push(letterArry[randNo]);
  }
  // Map over the randLetterArry to create mixture of uppercase and lowercase letters
  randLetterArry = randLetterArry.map((val) => {
    if (randLetterArry.indexOf(val) % 2 === 0) {
      return val.toUpperCase();
    }
    return val;
  });
  //return the modified/randomised array from the func
  return randLetterArry;
}

// GENERATE NUMBERS FUNC
function generateNumbers(sharedVal) {
  // number logic
  const numsArr = [];
// generate random numbers between 0 and 9;
// the loop iteration is determined by the value of the function argument 
  for (let i = 0; i < sharedVal; i++) {
    let randNo = Math.floor(Math.random() * 8) + 1;
    numsArr.push(randNo);
  }
  return numsArr;
}

// GENERATE SPECIAL CHARACTERS FUNC
function generateSpecialChars(sharedVal) {
	// special Char
	const specialCharArr = ["$", "%", "&", "@", "?","!"];
	let randSpecChars = [];
	 //   the loop iteration count is determined by the functions argument
	for (let i = 0; i < sharedVal; i++) {
	  let randNo = Math.floor(Math.random() * specialCharArr.length);
	  randSpecChars.push(specialCharArr[randNo]);
	}
	return randSpecChars;
}

// SHUFFLE PASSWORD CHAR FUNC
function ShufflePasswordChars(arr1, arr2, arr3) {
// concatenate the specialcharArry, numbersArry & letterArray to form a new array
  let passwordArry = arr1.concat(arr3, arr2);
// filter out falsey values from the new password array 
  passwordArry = passwordArry.filter(item =>{
	if(item != undefined){
		return item
	}
  })
  console.log(passwordArry);
  let currentIndex = passwordArry.length;
// using a while loop and the length of the newly created password array
  while (currentIndex != 0) {
	// in each iteration of the loop
	// create a random index value(variable) using the current index value(variable)
	// the subtract on from the currentIndex value. this will end the loop when its value is === 0
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
	// using destrusturing, swap the value of the password array using the currentIndex and RandomIndex values
	// starting from its highest index to its lowest index(0) on each iteration.
	// ensentially shuffle the values of the array in place.
    [passwordArry[currentIndex], passwordArry[randomIndex]] = 
	[passwordArry[randomIndex],passwordArry[currentIndex]];
  }
  return passwordArry;
}

// GENERATE PASSWORD FUNC
function generatePassword(passwordlength) {
  const passwordOutput = document.querySelector(".password-output");
  const copyPaswordBtn = document.querySelector(".copy-btn");
  const form = document.querySelector("form");
  const lettersOpt = form.elements.letters;
  const specialCharOpt = form.elements.specialchar;
  const NumbersCharOpt = form.elements.number;
  let sharedVal ;
  if (lettersOpt.checked && NumbersCharOpt.checked && specialCharOpt.checked) {
    //  handles cases when all the options have been selected
    // brake the password into equal parts based on user selection
    resetPasswordStrengthIndicator();
    passwordlength >= 6
      ? (sharedVal = passwordlength / 3)
      : (sharedVal = passwordlength / 2);
    // generate the user selected values
    let letter = generateLetters(sharedVal);
    let num = generateNumbers(sharedVal);
    let spChars = generateSpecialChars(sharedVal);
    //   update the UI with the generated password
    passwordOutput.textContent = ShufflePasswordChars(
      letter,
      num,
      spChars
    ).join("");
    passwordStrengthIndicator(2);
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
  } else if (
    lettersOpt.checked ||
    NumbersCharOpt.checked ||
    specialCharOpt.checked
  ) {
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

export {generatePassword}
