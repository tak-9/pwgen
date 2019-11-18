
// Ask user to choose character type.
function promptForCharType() {
    var specialChars = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '\[', '\\', '\]', '^', '_', '`', '{', '|', '}', '~'];
    var numericChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var lowerChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var upperChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

function generatePassword() {
    var charsForPassword = promptForCharType();
    console.log(charsForPassword);
    var passwordLength = promptForPasswordLength();
    var password = '';
    for (var i = 0; i < passwordLength; i++) {
        var num = Math.floor(Math.random() * charsForPassword.length);
        console.log('num: ' + num);
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
    document.getElementById("password").innerHTML = password;
   
    // Change "copy to clipboard" button color and enable button.
    var button = document.getElementById("copy");
    button.removeAttribute('disabled');
    button.classList.remove('buttonGray');
    button.classList.add('buttonRed');
    
    return password;
}

function copyToClipboard() {
    var copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the password: " + copyText.value);
}