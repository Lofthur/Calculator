var equation = '';
var equationArr = [];
var tempSum = 0;
var equalTempSum = 0;
var tempAritm;
var arithmIsLast = false;
var equalLast = false;
var comma = false;
var sum = 0;

// When a number key is pressed this function will run.
// First check if the length of the equation string is longer than eight characters long.
// Then add this key's HTML to the equation string.
// The string is shown in the calculator display.
$('.key').click(function() {
    if(equation.length <= 8) {
        if(this.innerHTML === '.' && comma === false) {
            equation += '.';
            comma = true;
        } else if(this.innerHTML !== '.'){
            equation += this.innerHTML;
        }
        arithmIsLast = false;
        $('.sum').html(equation);
    }

    // her må det også settes ett flagg som gjør at det må sjekkes opp
    if(equalLast) {
        // denne virker, men jeg må bare få fletta den inn i equal key.
        sum = findTotal(equalTempSum, tempAritm, parseFloat(this.innerHTML));
        console.log(sum);
    }

});

// This is event is run when one of the arithmetic keys are pressed.
// First it checks if the equation array has any values in it.
// If it does not have any value it checks to see if the equation string is empty,
// if it's empty it will be set to 0.
// If not it takes the equation string and parse and push it to the equation array.
$('.aritm-key').click(function() {
    if(!arithmIsLast) {
        if(equationArr.length === 0) {
        if(equation === '') {
            equation = '0';
        }
        equationArr.push(parseFloat(equation));
        equationArr.push(this.innerHTML);
        equation = '';
    } else if(equalLast) {
        equation = '';
        tempSum = equationArr[0];
        equationArr = [];
        equationArr.push(tempSum);
        equationArr.push(this.innerHTML);
        equalLast = false;
    } else {
        equationArr.push(parseFloat(equation));
        tempSum = findTotal(equationArr[0], equationArr[1], equationArr[2]);
        $('.sum').html(checkSum(tempSum));
        equationArr = [];
        equation = '';
        equationArr.push(tempSum);
        equationArr.push(this.innerHTML);
        }
    }
    
    arithmIsLast = true;
    comma = false;
});

// This event is run when the equals key is pressed.
// The find total value gets called and the return value is set to the sum variable.
// The sum is again checked in the checkSum function, and the return value of this is 
// shown in the display.
$('.equal-key').click(function() {
    if(arithmIsLast) {
        sum = findTotal(equationArr[0], equationArr[1], equationArr[0]);
        $('.sum').html(checkSum(sum));
        equalTempSum = equationArr[0];
        tempAritm = equationArr[1];
        equationArr.push(equationArr[0]);
        equationArr[0] = sum;
        arithmIsLast = false;
    } else {
        equationArr.push(parseFloat(equation));
        sum = findTotal(equationArr[0], equationArr[1], equationArr[2]);
        equalTempSum = equationArr[2];
        tempAritm = equationArr[1];
        $('.sum').html(checkSum(sum));
        equationArr[0] = sum;
        if(equationArr.length > 3) {
            equationArr.pop();
        }
    }
        equalLast = true;
        comma = false;
});


// When the ac-key is pressed many of the variables gets reset.
$('#ac-key').click(function() {
    equation = '';
    equationArr = [];
    sum = 0;
    $('.sum').html(sum);
    equalLast = false;
    arithmIsLast = false;
    comma = false;
});

// The ce-key empties the value of the equation string.
$('#ce-key').click(function() {
    if(!arithmIsLast) {
        equation = '';
        $('.sum').html(0);
        comma = false;
    }
});

// The findTotal function checks what the art in a switch, and does corresponding
// calculations according to that.
function findTotal(a, art, b) {
    var sum;
    switch (art) {
        case '+':
            sum = a + b;
            break;

        case '-':
            sum = a - b;
            break;

        case '*':
            sum = a * b;
            break;

        case '/':
            sum = a / b;
            break;
    }

    return sum;
}

// The checkSum function checks the sum parameter in with the lengthCheck funtion.
// It also checks to see if the sum is in the valid value range.
function checkSum(sum) {

    sum = lengthCheck(sum);

    if(sum > 99999999 || sum < -99999999) {
        return 'Error';
    } else {
        return sum;
    }
}

// The lengthCheck checks the lengt of the sum string,
// and cuts away numbers after comma if the string is outside the 
// boundary range set.
function lengthCheck(sum) {
    var sumString = sum.toString();
    var maxLength = 10;
    var sliceLength = 0;
    var sliced;

    if(sumString.length > maxLength) {
        return (sumString = sumString.slice(0, maxLength));
    } else {
        return sumString;
    }
}

// This function just initializes the display.
function init() {
    $('.sum').html(sum);
}

init();