
document.addEventListener("readystatechange",(event)=>{
    if(document.readyState === "complete"){
        initApp();
    }
})

function initApp(){
    const form = document.querySelector("form");
    const passwordFeedback = document.querySelector(".password-output");
    const pwLengthBtn = document.querySelector("input[name='pw-length']");
    const lowercaseOpt = form.elements.lowercase;
    const upperCaseOpt = form.elements.uppercase;
    const specialCharOpt = form.elements.specialchar;
    const NumbersCharOpt = form.elements.number;
 
   form.addEventListener("submit",(e)=>{
    e.preventDefault();

     let pwLength = parseInt(pwLengthBtn.value)

    if(pwLengthBtn.checked && pwLength === 6){
        console.log("numberChar:", pwLengthBtn.value);
    }
    else if (pwLengthBtn.checked && pwLength === 8){

    }
    else if (pwLengthBtn.checked && pwLength === 12){

    }
    

    function generatePassword(passwordlength){

        const shardVal = pwLength / 3;

        if(upperCaseOpt.checked){

        }
    }




   })
}


// letter logic
let charCode = 97;
const letterAtty =[];
let lett=[];

while(charCode <= 122){
    letterAtty.push(String.fromCharCode(charCode))
    charCode++;
}

console.log(letterAtty);

for(let i=0; i<4; i++){
    let randNo = Math.floor(Math.random()*letterAtty.length-1)+1;

    lett.push(letterAtty[randNo]);


}


if(upperCaseOpt.checked && lowercaseOpt.checked){
    lett = lett.map(val =>{
        
        if(lett.indexOf(val) % 2 === 0 ){
           return  val.toUpperCase();
        }
        return val;
    })
    
    console.log(lett);
}else{

}


// number logic
const numsArr = [];
for(let i=0; i<4; i++){
    let randNo = Math.floor(Math.random()* 8)+1;

    numsArr.push(randNo);

}

console.log(numsArr);


// special Char logic
const specialCharArr =  ["$","%","&","@","?"];
let randSpecChars = []; 
for(let i=0; i<4; i++){
    let randNo = Math.floor(Math.random()*specialCharArr.length);

    randSpecChars.push(specialCharArr[randNo]);

}

console.log(randSpecChars);
// randomize and the create array

function randomizeArray(arr1,arr2,arr3){
    const passwordArry = arr1.concat(arr3,arr2);
    let currentIndex = passwordArry.length;

    while(currentIndex != 0){
        let randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex--;

        [passwordArry[currentIndex],passwordArry[randomIndex]] = 
        [passwordArry[randomIndex],passwordArry[currentIndex]];


    }



    console.log(passwordArry);
}


randomizeArray(randSpecChars,lett,numsArr);