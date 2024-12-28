'use strict';

let firstOperand = [];
let secondOperand = [];
let operator = "";
let previousValue;

//evaluting functions
function addition(firstNumber, secondNumber) {
    let solution = +(firstNumber.join('')) + +(secondNumber.join(''));
    return solution;
};

function subtraction(firstNumber, secondNumber) {
    let solution = +(firstNumber.join('')) - +(secondNumber.join(''));
    return solution;

};

function multiply(firstNumber, secondNumber) {
    let solution = +(firstNumber.join('')) * +(secondNumber.join(''));
    return solution;
};

function division(firstNumber, secondNumber) {
    if (+(secondNumber.join('')) === 0) return "ERROR";

    let solution = +(firstNumber.join('')) / +(secondNumber.join(''));
    return solution;
};

function operate(firstNumber, secondNumber, operatorSelected) {

    switch (operatorSelected) {
        case '+': return addition(firstNumber, secondNumber);
            break;
        case '-': return subtraction(firstNumber, secondNumber);
            break;
        case '*': return multiply(firstNumber, secondNumber);
            break;
        case '/': return division(firstNumber, secondNumber);
    }
};

//nodelists
const numberButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const toggleStateAndDotButtons = document.querySelectorAll('.group-signs');
const acAndClear = document.querySelectorAll('.group-clear');
const firstValuePara = document.querySelector('.current-value');
const secondValuePara = document.querySelector('.previous-value')
const allButtons = document.querySelectorAll('button');

// alert(numberButtons[0].classList.contains('one'));

function toExponential(number) {
    let tempNum = `${number.toExponential(2)}`;
    if (tempNum.includes('e+')) {
        let splitNum = tempNum.split('e+');
        if (splitNum[0] == "Infinity") { return `INFINITY` }
        else { return `${splitNum[0]} * 10^${splitNum[1]}` }
    }
    else if (tempNum.includes('e-')) {
        let splitNum = tempNum.split('e-');
        if (splitNum[0] == "Infinity") { return `INFINITY` }
        else { return `${splitNum[0]} * 10^-${splitNum[1]}` }
    }

};

function exponentialSecondPara(number) {
    let tempNum = `${number.toExponential(8)}`;
    if (tempNum.includes('e+')) {
        let splitNum = tempNum.split('e+');
        if (splitNum[0] == "Infinity") { return `INFINITY` }
        else { return `${splitNum[0]} * 10^${splitNum[1]}` }
    }
    else if (tempNum.includes('e-')) {
        let splitNum = tempNum.split('e-');
        if (splitNum[0] == "Infinity") { return `INFINITY` }
        else { return `${splitNum[0]} * 10^-${splitNum[1]}` }
    }
}
function putInParentheses(num) {
    return `(${num})`;
};

function removeWhitespaceAndCaret(string) {
    let arr = string.split('');
    let arrFiltered = arr.filter((item) => {
        if (item !== ' ' && item != '(' && item != ')' &&
            item != '/' && item != '+' && item != '-') {
            return true;
        }
    });

    let separatedArr = arrFiltered.join('').split('*').filter((item) => {
        if (item == '') { return false }
        else return true;
    });

    let newArr = separatedArr.join('^').split('^').filter((item) => {
        if (item == '^') { return false }
        else return true;
    });

    return ([+(newArr[0]) * ((+(newArr[1])) ** +(newArr[2]))])

};
// alert(removeWhitespaceAndCaret('2222 * 10^6'))

function initializeCalculator() {
    firstValuePara.textContent = `START !`;
    secondValuePara.textContent = '';
    firstOperand.splice(0, firstOperand.length);
    secondOperand.splice(0, secondOperand.length);
    operator = '';
};

document.addEventListener('DOMContentLoaded', initializeCalculator);
//functions for buttons clicked
function operandButtonClicked(event) {
    let target = event.target;
    if (operator.length !== 0) {
        secondOperand.push(+(target.textContent));
        if (secondOperand.length >= 12) {
            let firstValue = +(secondOperand.join(''))

            return firstValuePara.textContent = toExponential(firstValue);
        }
        else {
            firstValuePara.textContent = secondOperand.join('');
        }
    }
    else {
        firstOperand.push(+(target.textContent));
        if (firstOperand.length >= 12) {
            let firstValue = +(firstOperand.join(''))

            return firstValuePara.textContent = toExponential(firstValue);
        }
        else {
            firstValuePara.textContent = firstOperand.join('');
        }
    }



}

function operatorButtonsClicked(event) {
    let target = event.target;

    if (secondOperand.length == 0) {
        if (operator.length == 0) {
            operator = target.textContent;
            if (firstOperand.length >= 12) {
                let tempNum = toExponential(+(firstOperand.join('')));
                secondValuePara.textContent = `${tempNum}  ${operator}`
                firstValuePara.textContent = `0`;
            }
            else {
                secondValuePara.textContent = `${firstOperand.join('')}  ${operator}`;
                firstValuePara.textContent = `0`;
            };
        }
        else {
            if (firstOperand.length >= 15) {
                operator = target.textContent;
                secondValuePara.textContent = `${exponentialSecondPara(+(firstOperand.join('')))} ${operator}`;
                firstValuePara.textContent = '0';
            }
            else {
                operator = target.textContent;
                secondValuePara.textContent = `${firstOperand.join('')}  ${operator}`;
                firstValuePara.textContent = '0';
            }
        }
    }
    else {
        let solutionNum = operate(firstOperand, secondOperand, operator);
        console.log(solutionNum);
        operator = target.textContent;
        if (solutionNum == Infinity || solutionNum == NaN) {
            secondValuePara.textContent = 'VERY LONG!!';
            firstValuePara.textContent = 'INFINITE'
        }
        else {
            let strForLength = `${solutionNum}`;
            if (strForLength.length >= 15) {
                secondValuePara.textContent = `${putInParentheses(exponentialSecondPara(solutionNum))} ${operator}`;
            }
            else {
                secondValuePara.textContent = `${solutionNum}  ${operator}`;
            };
            firstOperand.splice(0, firstOperand.length);
            let arr = firstOperand.concat(strForLength.split(''));
            console.log(arr)
            firstOperand = arr;
            console.log(firstOperand);
            secondOperand.splice(0, secondOperand.length);
            firstValuePara.textContent = '0';
        }
    }
}

// function toggleSignAndDot(event) {
//     let targetClassList = event.target.classList;
//     if (targetClassList.contains('toggle')) {
//         if (firstOperand[0] == '-') {
//             firstOperand.splice()
//         }
//     }
//     switch (true) {
//         case targetClassList.contains('toggle'):
//     }
// }

// button event listeners
numberButtons.forEach((button) => {
    button.addEventListener('click', operandButtonClicked)
});



operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonsClicked)
})
