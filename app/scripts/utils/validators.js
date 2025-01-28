
// PASSWORD STRENGTH INDICATOR FUNC
function passwordStrengthIndicator(val){
    const passwordStrengthBars = document.querySelectorAll(".strength-bars");
    const passwordStrengthTxt = document.querySelector(".strength-txt");
    const bars = [...passwordStrengthBars];
    // add the show class based on the number of bars items available
    // the number of bars available is based on the val parameter
    for (let i = 0; i <= val; i++) {
      bars[i].classList.add("show-strength-bars");
    }
    // dynamically change the text of the password strength component based on the complexity 
    // of the password complexity is determined by the value of the func "val" parameter.
    switch (true) {
      case val == 0:
        passwordStrengthTxt.textContent = "weak";
        break;
      case val == 1:
        passwordStrengthTxt.textContent = "okay";
        break;
      case val == 2:
        passwordStrengthTxt.textContent = "strong";
        break;
    }
}

// RESET PASSWORD INDICATOR STRENGTH FUNC
function resetPasswordStrengthIndicator() {
    const passwordStrengthBars = document.querySelectorAll(".strength-bars");
    const passwordStrengthTxt = document.querySelector(".strength-txt");
    passwordStrengthBars.forEach(element => {
        element.classList.remove("show-strength-bars");
        passwordStrengthTxt.textContent = "";
    });
}

export {passwordStrengthIndicator, resetPasswordStrengthIndicator}