var specialChars = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '\[', '\\', '\]', '^', '_', '`', '{', '|', '}', '~'];
var numericChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var specialCheckbox =  document.getElementById("special"); 
var numericCheckbox = document.getElementById("numeric");
var lowerCheckbox = document.getElementById("lower");
var upperCheckbox = document.getElementById("upper");
var passwordLengthTextInput = document.getElementById("passwordlength");
var passwordTextArea = document.getElementById("password");
var generateButton = document.getElementById("generate");
var generate2Button = document.getElementById("generate2")
var copyButton = document.getElementById("copy");

// Ask user to choose character type.
function promptForCharType() {
    var charsValidationOK = false;
    while (!charsValidationOK) {
        var charType = prompt('Enter character type (Special, Numeric, Lower or Upper) for password. \n(Enter combination of s, n, l or u).');

        // Create a new array for characters for password. 
        var charsForPassword = [];
        // Initialize it with empty array. Otherwise, Javascript inplicitely cast it to String.  
        if (charType.includes('s')) {
            charsForPassword = charsForPassword.concat(specialChars);
            charsValidationOK = true;
        }
        if (charType.includes('n')) {
            charsForPassword = charsForPassword.concat(numericChars);
            charsValidationOK = true;
        }
        if (charType.includes('l')) {
            charsForPassword = charsForPassword.concat(lowerChars);
            charsValidationOK = true;
        }
        if (charType.includes('u')) {
            charsForPassword = charsForPassword.concat(upperChars);
            charsValidationOK = true;
        }
        // If user's input does not include s, n, l or u, then display prompt again.
    }
    return charsForPassword;
}

// Ask user to enter length of password. 
function promptForPasswordLength() {
    var charsValidationOK = false;
    while (!charsValidationOK) {
        var passwordLengthStr = prompt('Enter password length 8 to 128.');
        passwordLengthInt = parseInt(passwordLengthStr);
        if ((passwordLengthInt >= 8) && (passwordLengthInt <= 128)) {
            charsValidationOK = true;
        }
    }
    return passwordLengthInt;
}

// This is for index.html
// Check null here. It's because addEventListener causes error, if generateButton is null.
// If this is called from index.html, there is generateButton. If this is called from checkbox.html, there isn't generateButton.
// It becomes null when there is no such element.  
if (generateButton != null){
    var generatePasswordByPrompt = function(){
        var charsForPassword = promptForCharType();
        //console.log(charsForPassword);
        var passwordLength = promptForPasswordLength();
        generatePassword(charsForPassword, passwordLength);
    }
    generateButton.addEventListener("click", generatePasswordByPrompt);
} 

// This is for checkbox.html
if (generate2Button != null) { 
    var generatePasswordByForm = function(){
        // Do not proceed if error found in validation. 
        if (!validateForm()){
            return;
        }
        // Get Password type from html form.
        var charsForPassword = getCharTypeFromForm();
        // Get Password length from html form.
        generatePassword(charsForPassword, passwordLengthTextInput.value);
    }
    generate2Button.addEventListener("click", generatePasswordByForm);
}

function validateForm() {
    var validateOK = true; 
    var isSpecialChecked =  specialCheckbox.checked; 
    var isNumericChecked = numericCheckbox.checked;
    var isLowerChecked = lowerCheckbox.checked;
    var isUpperChecked = upperCheckbox.checked;
    // Error when all checkboxes are not checked
    if ((!isSpecialChecked) && (!isNumericChecked) && (!isLowerChecked) && (!isUpperChecked)){
        validateOK = false;
        alert("Check at least one option.");
    }
    // Error if password lengh is not 8 to 128.
    var passwordLengthInt = parseInt(passwordLengthTextInput.value);
    //console.log(passwordLengthInt);
    if ((passwordLengthInt<8) || (passwordLengthInt>128) || (isNaN(parseInt(passwordLengthTextInput.value)))) {
        validateOK = false;
        alert("Password Length is incorrect.");
    }
    //console.log(validateOK);
    return validateOK;
}

function getCharTypeFromForm() {
    var isSpecialChecked =  specialCheckbox.checked; 
    var isNumericChecked = numericCheckbox.checked;
    var isLowerChecked = lowerCheckbox.checked;
    var isUpperChecked = upperCheckbox.checked;

    // Create a new array for characters for password. 
    var charsForPassword = [];
    // Initialize it with empty array. Otherwise, Javascript inplicitely cast it to String.  
    if (isSpecialChecked) {
        charsForPassword = charsForPassword.concat(specialChars);
    }
    if (isNumericChecked) {
        charsForPassword = charsForPassword.concat(numericChars);
    }
    if (isLowerChecked) {
        charsForPassword = charsForPassword.concat(lowerChars);
    }
    if (isUpperChecked) {
        charsForPassword = charsForPassword.concat(upperChars);
    }
    return charsForPassword;       
}

function generatePassword(charsForPassword, passwordLength) {
    var password = '';
    for (var i = 0; i < passwordLength; i++) {
        var num = Math.floor(Math.random() * charsForPassword.length);
        //console.log('num: ' + num);
        var passwordChar = charsForPassword[num];
        // Problem occurs if both of them are number type. password + passwordChar
        // So, if passwordChar is 'number' type, convert it to 'string' type.
        if (typeof passwordChar === 'number') {
            passwordChar = passwordChar.toString();
        }
        password = password + passwordChar;
    }
    console.log('password: ' + password); 
    // Display generated password in the textarea.
    passwordTextArea.innerHTML = password;
   
    // Change "copy to clipboard" button color and enable button.
    copyButton.removeAttribute('disabled');
    copyButton.classList.remove('buttonGray');
    copyButton.classList.add('buttonRed');   
}

var copyToClipboard = function(){
    passwordTextArea.select();
    passwordTextArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the password: " + passwordTextArea.value);
}
copyButton.addEventListener("click",copyToClipboard);
