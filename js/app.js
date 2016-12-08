var equation = '';
var equationArr = [];
var tempSum = 0;
var arithmIsLast = false;
var equalLast = false;
var comma = false;
var sum = 0;

// This is the event that happens when a number key is hit
// The equation string add the number pressed (as adding the number to the string).
// Then the string is shown in the calculator display
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

});

/*
    sett maks float decimals til 7
    sjekk opp mot lengden til equation stringen...
*/

// This is the event that happsens when one of the arithmetic keys are pressed.
// First it checks if the equation array has any values in it.
// If it does not have any value it checks to see if the equation string is empty,
// if it's empty it will be set to 0.
// If not it takes the equation string and parse and push it to the equation array.
$('.aritm-key').click(function() {
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
    arithmIsLast = true;
    comma = false;
});

//Må sjekke hovrdan jeg setter charater lengde på equation stringen.


$('.equal-key').click(function() {
    if(arithmIsLast) {
        sum = findTotal(equationArr[0], equationArr[1], equationArr[0]);
        $('.sum').html(checkSum(sum));
        equationArr.push(equationArr[0]);
        equationArr[0] = sum;
        arithmIsLast = false;
    } else {
        equationArr.push(parseFloat(equation));
        sum = findTotal(equationArr[0], equationArr[1], equationArr[2]);
        $('.sum').html(checkSum(sum));
        equationArr[0] = sum;
        if(equationArr.length > 3) {
            equationArr.pop();
        }
    }
        equalLast = true;
        comma = false;
});

$('#ac-key').click(function() {
    equation = '';
    equationArr = [];
    sum = 0;
    $('.sum').html(sum);
    equalLast = false;
    arithmIsLast = false;
    comma = false;
});

$('#ce-key').click(function() {
    if(!arithmIsLast) {
        equation = '';
        $('.sum').html(0);
        comma = false;
        console.log(equationArr);
    }
});

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

function checkSum(sum) {

    sum = lengthCheck(sum);

    if(sum > 99999999) {
        return 'Error';
    } else {
        return sum;
    }
}

// finne ut hvis total lengde er 13 få den ned til 8
// 13 - 8 = 5
// 21 - 8 = 13
// svaret blir da det som må trekkes fra enden til svaret

function lengthCheck(sum) {
    //var sumString = sum.toString().split('.');
    var sumString = sum.toString();
    //var beforeComma = sumString.split('.')[0];
    //var afterComma = sumString.split('.')[1];
    //var totalLength = beforeComma.length + afterComma.length;
    var maxLength = 9;
    var sliceLength = 0;
    var sliced;
    console.log('Sum: ' + sum);
    console.log('SumString: ' + sumString);
    console.log(sumString);
    console.log('SumString length ' + sumString.length);
    //console.log(beforeComma.length);
    //console.log(afterComma.length);
    //console.log(totalLength);


    if(sumString.length > maxLength) {
        return (sumString = sumString.slice(0, maxLength));
    } else {
        return sumString;
    }

    /*if(totalLength > maxLength) {
        sliceLength = totalLength - maxLength;
        afterComma = sumString.slice(beforeComma.length + 1, sliceLength);
    } else if(totalLength == maxLength) {
        console.log('hello');
    }*/

    //return (sumString = beforeComma.concat('.' + afterComma));

}

function init() {
    $('.sum').html(sum);
}

init();