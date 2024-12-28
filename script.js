'use strict';

let firstOperand = [];
let secondOperand = [];
let operator = "";
let previousValue;
let tempSecondParaValue = '';

let activeOperand = true; // to check which operand is currently storing the numbers inputed by user,
//  so dot and state (+/-) can be changed to the correct operand if clicked.
// true for firstOperand , false for secondOperand

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

//helper functions
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

function exponentialForSecondPara(number) {
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

function toggleActiveOperandState() {
    return !activeOperand ? activeOperand = true : activeOperand = false;
}

//this fn is also used for clear all (AC) button
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
    if (secondValuePara.textContent == `ERROR! CAN'T DIVIDE BY ZERO`) {
        secondValuePara.textContent = tempSecondParaValue;
    }
    if (operator.length !== 0) {
        if (secondOperand.length == 1 && secondOperand[0] == '0') {
            secondOperand.splice(0, 1, +(target.textContent));
            activeOperand = false;
        }
        else {
            activeOperand = false;
            secondOperand.push(+(target.textContent));
        }
        if (secondOperand.length >= 12) {
            let firstValue = +(secondOperand.join(''))

            return firstValuePara.textContent = toExponential(firstValue);
        }
        else {
            firstValuePara.textContent = secondOperand.join('');
        }
    }
    else {
        if (firstOperand.length == 1 && firstOperand[0] == 0) {
            firstOperand.splice(0, 1, +(target.textContent));
            activeOperand = true;
        }
        else {
            firstOperand.push(+(target.textContent));
            activeOperand = true;
        }
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
                secondValuePara.textContent = `${exponentialForSecondPara(+(firstOperand.join('')))} ${operator}`;
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
                if (strForLength.includes('e-') || strForLength.includes('e+')) {
                    secondValuePara.textContent = ``;
                    firstValuePara.textContent = `VERY  BIG!!🧮`;
                    firstOperand.splice(0, firstOperand.length);
                    secondOperand.splice(0, secondOperand.length);
                    activeOperand = true;
                    operator = '';
                } else {
                    secondValuePara.textContent = `${putInParentheses(exponentialForSecondPara(solutionNum))} ${operator}`;
                    firstOperand.splice(0, firstOperand.length);
                    let arr = firstOperand.concat(strForLength.split(''));
                    firstOperand = arr;
                    secondOperand.splice(0, secondOperand.length, 0);
                    activeOperand = false;
                    firstValuePara.textContent = '0';
                }
            }
            else {
                if (strForLength.includes('e-') || strForLength.includes('e+')) {
                    secondValuePara.textContent = ``;
                    firstValuePara.textContent = `VERY   BIG!!🧮`;
                    firstOperand.splice(0, firstOperand.length);
                    secondOperand.splice(0, secondOperand.length);
                    activeOperand = true;
                    operator = '';
                } else {
                    if (solutionNum == `ERROR`) {
                        tempSecondParaValue = secondValuePara.textContent;
                        secondValuePara.textContent = `ERROR! CAN'T DIVIDE BY ZERO`;

                    } else {
                        secondValuePara.textContent = `${solutionNum}  ${operator}`;
                        firstOperand.splice(0, firstOperand.length);
                        let arr = firstOperand.concat(strForLength.split(''));
                        firstOperand = arr;
                        console.log(firstOperand);
                        secondOperand.splice(0, secondOperand.length, 0);
                        activeOperand = false;
                        firstValuePara.textContent = '0';
                    }
                }
            };

        }
    }
}

function clearButtonClicked() {
    if (activeOperand == true) {
        firstOperand.pop();
        if ((firstOperand.join('')).length >= 12) {
            firstValuePara.textContent = `${toExponential(+(firstOperand.join('')))}`
        }
        else {
            firstValuePara.textContent = `${firstOperand.join('')}`;
        }
    }
    else if (activeOperand == false) {
        secondOperand.pop();
        if ((secondOperand.join('')).length >= 12) {
            firstValuePara.textContent = `${toExponential(+(secondOperand.join('')))}`
        }
        else {
            firstValuePara.textContent = `${secondOperand.join('')}`;
        }
    }

};

function dotButtonClicked() {
    if (activeOperand == true && !(firstOperand.join('')).includes('.')) {
        firstOperand.push('.');
        if ((firstOperand.join('')).length >= 12) {
            firstValuePara.textContent = `${toExponential(+(firstOperand.join('')))}`
        }
        else {
            firstValuePara.textContent = `${firstOperand.join('')}`;
        }

    } else if (activeOperand == false && !(secondOperand.join('')).includes('.')) {
        secondOperand.push('.');
        if ((secondOperand.join('')).length >= 12) {
            firstValuePara.textContent = `${toExponential(+(secondOperand.join('')))}`
        }
        else {
            firstValuePara.textContent = `${secondOperand.join('')}`;
        }
    }
};

function toggleStateButtonClicked() {
    if (activeOperand == true) {
        if (firstOperand[0] == '-') {
            firstOperand.shift();
            if ((firstOperand.join('')).length >= 12) {
                firstValuePara.textContent = `${toExponential(+(firstOperand.join('')))}`
            }
            else {
                firstValuePara.textContent = `${firstOperand.join('')}`;
            }
        }
        else if (firstOperand[0] !== '-') {
            firstOperand.unshift('-');
            if ((firstOperand.join('')).length >= 12) {
                firstValuePara.textContent = `${toExponential(+(firstOperand.join('')))}`
            }
            else {
                firstValuePara.textContent = `${firstOperand.join('')}`;
            }
        }
    }
    else if (activeOperand == false) {
        if (secondOperand[0] == '-') {
            secondOperand.shift();
            if ((secondOperand.join('')).length >= 12) {
                firstValuePara.textContent = `${toExponential(+(secondOperand.join('')))}`
            }
            else {
                firstValuePara.textContent = `${secondOperand.join('')}`;
            }
        }
        else if (secondOperand[0] !== '-') {
            secondOperand.unshift('-');
            if ((secondOperand.join('')).length >= 12) {
                firstValuePara.textContent = `${toExponential(+(secondOperand.join('')))}`
            }
            else {
                firstValuePara.textContent = `${secondOperand.join('')}`;
            }
        }
    }
}

// button event listeners
numberButtons.forEach((button) => {
    button.addEventListener('click', operandButtonClicked)
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', operatorButtonsClicked)
});


acAndClear.forEach(element => {
    if (element.textContent == 'A C') {
        element.addEventListener('click', initializeCalculator);
    }
    else {
        element.addEventListener('click', clearButtonClicked);
    }
});;

toggleStateAndDotButtons.forEach(button => {
    if (button.textContent == '.') {
        button.addEventListener('click', dotButtonClicked);
    }
    else {
        button.addEventListener('click', toggleStateButtonClicked)
    }
})
