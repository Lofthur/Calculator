var equationStr = '0';
var sum = 0;
var equationArr = [];

function init() {
    $('.equation').html(equationStr);
    $('.sum').html(sum);
}

$('.key').click(function() {
    if(equationStr === '0' && !check(this.innerHTML)) {
        equationStr = this.innerHTML;
    } else {
        if(check(this.innerHTML)) {
            equation += ' ' + this.innerHTML + ' ';

        } else {
                equation += this.innerHTML;
        }
    }

    $('.equation').html(equation);
});

function check(objValue) {
    if(objValue === '/' || objValue === '*' || objValue === '-' || objValue === '+') {
        return true;
    } else {
        return false;
    }
}

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


init();