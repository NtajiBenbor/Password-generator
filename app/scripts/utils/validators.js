
// PASSWORD STRENGTH INDICATOR FUNC
function passwordStrengthIndicator(val){
    const passwordStrengthBars = document.querySelectorAll(".form__password-strength-bars");
    const bars = [...passwordStrengthBars].reverse();
    // add the show class based on the number of bars items available
    // the number of bars available is based on the val parameter
    for (let i = 0; i <= val; i++) {
      bars[i].classList.add("show-strength-bars");
    }
}

// RESET PASSWORD INDICATOR STRENGTH FUNC
function resetPasswordStrengthIndicator() {
    const passwordStrengthBars = document.querySelectorAll(".form__password-strength-bars");
    passwordStrengthBars.forEach(element => {
        element.classList.remove("show-strength-bars");
    });
}

export {passwordStrengthIndicator, resetPasswordStrengthIndicator}