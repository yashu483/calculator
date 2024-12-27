'use strict';

let firstOperand = [];
let secondOperand = [];
let operator = "";

//evaluting functions
function addition(firstNumber, secondNumber) {
    let sum = +(firstNumber.join('')) + +(secondNumber.join(''));
    return sum;
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
const allButtons = document.querySelectorAll('button');

// alert(numberButtons[0].classList.contains('one'));

//functions for buttons pressed
function operandButtonClicked(event) {
    let target = event.target;
    if (operator.length !== 0) {
        secondOperand.push(+(target.textContent));
        alert(secondOperand.join(''));
    }
    else {
        firstOperand.push(+(target.textContent));
        alert(firstOperand.join(''))
    }



}
function operatorButtonsClicked() { }

numberButtons.forEach((button) => {
    button.addEventListener('click', operandButtonClicked)
});
