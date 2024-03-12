const display=document.querySelector(".display");
let indicator=document.querySelector(".strength-circle");
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
setIndicator("#ccc");

let passwordlength=10;
let inputSlider=document.querySelector(".slider");
let lengthDisplay=document.querySelector(".pass-len");
function handleSlider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerText=passwordlength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=( (passwordlength-min)*100/(max-min)) +"100%"
}
handleSlider();


inputSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})


// Calculate Strength
let uppercase=document.querySelector('#uppercase');
let lowercase=document.querySelector('#lowercase');
let numbers=document.querySelector('#numbers');
let symbols=document.querySelector('#symbols');
let checkCount=0;
function calStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercase.checked) hasUpper=true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNum = true;
    if (symbols.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordlength>=8){
        setIndicator('#0f0');
    }
    else if((hasLower || hasUpper)&&(hasNum||hasSym)&&passwordlength>=6 ){
        setIndicator('#ff0')
    }
    else{
        setIndicator('#f00');
    }
}


// copied
let copied=document.querySelector(".copied");
async function copyContent(){
    try{
        await navigator.clipboard.writeText(display.value);
        copied.innerText="Copied";
    }
    catch(e){
        copied.innerText="Failed";
    }
    // to make copied msg visible
    copied.classList.add("active");

    setTimeout( ()=>{
        copied.classList.remove("active");
    },2000);
}
let copybtn=document.querySelector('.copy-btn');
copybtn.addEventListener('click',()=>{
    if(display.value)
    copyContent();
})


function getRndInteger(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperrCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
const symbolsArr = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateSymbol(){
    const rndnum=getRndInteger(0,symbolsArr.length);
    return symbolsArr.charAt(rndnum);
}




function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

let allCheckBox=document.querySelectorAll("input[type=checkbox");

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordlength < checkCount ) {
        passwordlength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

let generatePassword=document.querySelector('.generate-password');
generatePassword.addEventListener('click',()=>{

    if(checkCount==0)
    return;

    if(passwordlength<checkCount){
         passwordlength=checkCount;
         handleSlider();
    }

    // find new password
    password="";

    // put all char get from checkboxes

    // if(uppercaseCheck.checked){
    //     password+=generateUpperrCase();
    // }
    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funArr=[];
    if(uppercase.checked)
    funArr.push(generateUpperrCase);

    if(lowercase.checked)
    funArr.push(generateLowerCase);

    if(numbers.checked)
    funArr.push(generateRandomNumber);

    if(symbols.checked)
    funArr.push(generateSymbol);

    //compulsory addition
    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }
    // remaining addition
    for(let i=0;i<passwordlength-funArr.length;i++){
        let rndIndex=getRndInteger(0,funArr.length);
        password+=funArr[rndIndex]();
    }

    password=shufflePassword(Array.from(password));
    display.value=password;
    calStrength();
});

