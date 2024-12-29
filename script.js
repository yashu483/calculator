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
const equalButton = document.querySelector('.equal');
const firstValuePara = document.querySelector('.current-value');
const secondValuePara = document.querySelector('.previous-value')
const allButtons = document.querySelectorAll('button');

const audio = new Audio('resources/sounds/beep.mp3');
audio.playbackRate = 2.0;
audio.volume = 1.0;

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

//this fn is also used for clear all (AC) button
function initializeCalculator() {
    equalButton.isActive = false;
    firstValuePara.textContent = `HELLO  WORLD!`;
    secondValuePara.textContent = '';
    firstOperand.splice(0, firstOperand.length);
    secondOperand.splice(0, secondOperand.length);
    operator = '';
};

document.addEventListener('DOMContentLoaded', initializeCalculator);

//functions for buttons clicked
function operandButtonClicked(event) {
    audio.play();
    let target = event.target;
    if (secondValuePara.textContent == `ERROR! CAN'T DIVIDE BY ZERO`) {
        secondValuePara.textContent = tempSecondParaValue;
    };
    if (equalButton.isActive) {
        return;
    }
    else if (operator.length !== 0) {
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
            firstValuePara.textContent = toExponential(firstValue);
            if (firstOperand.length >= 16) {
                secondValuePara.textContent = `${putInParentheses(exponentialForSecondPara(+(firstOperand.join(''))))} ${operator}`;
            } else {
                secondValuePara.textContent = `${firstOperand.join('')} ${operator}`
            }
        }
        else {
            firstValuePara.textContent = secondOperand.join('');
            if (firstOperand.length >= 16) {
                secondValuePara.textContent = `${putInParentheses(exponentialForSecondPara(+(firstOperand.join(''))))} ${operator}`;
            } else {
                secondValuePara.textContent = `${firstOperand.join('')} ${operator}`
            }
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
    audio.play();
    let target = event.target;
    equalButton.isActive = false;

    if (secondOperand.length == 0) {
        if (operator.length == 0) {
            operator = target.textContent;
            if (firstOperand.length >= 12) {
                let tempNum = toExponential(+(firstOperand.join('')));
                secondValuePara.textContent = `${tempNum}  ${operator}`
                firstValuePara.textContent = `~`;
            }
            else {
                if (firstOperand.length != 0) {
                    secondValuePara.textContent = `${firstOperand.join('')} ${operator}`;
                    firstValuePara.textContent = `~`;
                }
            };
        }
        else {
            if (firstOperand.length >= 15) {
                operator = target.textContent;
                secondValuePara.textContent = `${exponentialForSecondPara(+(firstOperand.join('')))} ${operator}`;
                firstValuePara.textContent = '~';
            }
            else {
                if (firstOperand.length != 0) {
                    operator = target.textContent;
                    secondValuePara.textContent = `${firstOperand.join('')} ${operator}`;
                    firstValuePara.textContent = '~';
                };
            }
        }
    }
    else {
        let solutionNum = operate(firstOperand, secondOperand, operator);
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
                    secondOperand.splice(0, secondOperand.length);
                    activeOperand = false;
                    firstValuePara.textContent = '~';
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
                        secondOperand.splice(0, secondOperand.length);
                        activeOperand = false;
                        firstValuePara.textContent = '~';
                    }
                }
            };

        }
    }
}

function clearButtonClicked() {
    audio.play();
    equalButton.isActive = false;
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
    audio.play();
    if (activeOperand == true && !(firstOperand.join('')).includes('.')) {
        if ((firstOperand.join('')).length >= 12) {
            firstOperand.push('.');
            firstValuePara.textContent = `${toExponential(+(firstOperand.join('')))}`
        }
        else {
            if (firstOperand.length == 0) {
                firstOperand.unshift('0');
            };
            firstOperand.push('.');
            firstValuePara.textContent = `${firstOperand.join('')}`;
        }

    } else if (activeOperand == false && !(secondOperand.join('')).includes('.')) {
        if ((secondOperand.join('')).length >= 12) {
            secondOperand.push('.');
            firstValuePara.textContent = `${toExponential(+(secondOperand.join('')))}`
        }
        else {
            if (secondOperand.length == 0) {
                secondOperand.unshift('0');
            }
            secondOperand.push('.');
            firstValuePara.textContent = `${secondOperand.join('')}`;
        }
    }
};

function toggleStateButtonClicked() {
    audio.play();
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
};

function equalButtonClicked() {
    audio.play();
    let solutionNum = operate(firstOperand, secondOperand, operator);
    if (secondOperand.length != 0) {
        equalButton.isActive = true;
    } else equalButton.isActive = false;
    if (secondOperand.length == 0) {
        if (firstOperand.length >= 12) {
            firstValuePara.textContent = `${toExponential(+(firstOperand.join('')))}`
            secondValuePara.textContent = '';
            activeOperand = true;
        } else {
            firstValuePara.textContent = `${firstOperand.join('')}`;
            secondValuePara.textContent = '';
            activeOperand = true;
        }
    }
    else if (solutionNum == Infinity || solutionNum == NaN) {
        secondValuePara.textContent = 'VERY LONG!!';
        firstValuePara.textContent = 'INFINITE'
        operator = '';
    }
    else {
        let strForLength = `${solutionNum}`;
        if (strForLength.length >= 12) {
            if (strForLength.includes('e-') || strForLength.includes('e+')) {
                secondValuePara.textContent = ``;
                firstValuePara.textContent = `VERY  BIG!!🧮`;
                firstOperand.splice(0, firstOperand.length);
                secondOperand.splice(0, secondOperand.length);
                activeOperand = true;
                operator = '';
            } else {
                firstValuePara.textContent = `=   ${toExponential(solutionNum)}`;
                firstOperand.splice(0, firstOperand.length);
                let arr = firstOperand.concat(strForLength.split(''));
                firstOperand = arr;
                secondOperand.splice(0, secondOperand.length);
                activeOperand = true;
                operator = '';
                secondValuePara.textContent = '';
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
                    equalButton.isActive = false;
                } else {
                    firstValuePara.textContent = `${solutionNum}`;
                    firstOperand.splice(0, firstOperand.length);
                    let arr = firstOperand.concat(strForLength.split(''));
                    firstOperand = arr;
                    operator = '';
                    secondOperand.splice(0, secondOperand.length);
                    activeOperand = true;
                    secondValuePara.textContent = '';
                }
            }
        };

    }
};

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
});

equalButton.addEventListener('click', equalButtonClicked);


//keyboard support
function operandKeyPressed(event) {
    audio.play();
    let target = event.key;
    let numString = `1234567890`;
    let operatorString = `/*-+`;
    if (numString.includes(target)) {
        if (secondValuePara.textContent == `ERROR! CAN'T DIVIDE BY ZERO`) {
            secondValuePara.textContent = tempSecondParaValue;
        };
        if (equalButton.isActive) {
            return;
        }
        else if (operator.length !== 0) {
            if (secondOperand.length == 1 && secondOperand[0] == '0') {
                secondOperand.splice(0, 1, +(target));
                activeOperand = false;
            }
            else {
                activeOperand = false;
                secondOperand.push(+(target));
            }
            if (secondOperand.length >= 12) {
                let firstValue = +(secondOperand.join(''))
                firstValuePara.textContent = toExponential(firstValue);
                if (firstOperand.length >= 16) {
                    secondValuePara.textContent = `${putInParentheses(exponentialForSecondPara(+(firstOperand.join(''))))} ${operator}`;
                } else {
                    secondValuePara.textContent = `${firstOperand.join('')} ${operator}`
                }
            }
            else {
                firstValuePara.textContent = secondOperand.join('');
                if (firstOperand.length >= 16) {
                    secondValuePara.textContent = `${putInParentheses(exponentialForSecondPara(+(firstOperand.join(''))))} ${operator}`;
                } else {
                    secondValuePara.textContent = `${firstOperand.join('')} ${operator}`
                }
            }
        }
        else {
            if (firstOperand.length == 1 && firstOperand[0] == 0) {
                firstOperand.splice(0, 1, +(target));
                activeOperand = true;
            }
            else {
                firstOperand.push(+(target));
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

};

function operatorKeyPressed(event) {
    audio.play();
    let target = event.key;
    let operatorString = `/*-+`;
    if (operatorString.includes(target)) {
        equalButton.isActive = false;

        if (secondOperand.length == 0) {
            if (operator.length == 0) {
                operator = target;
                if (firstOperand.length >= 12) {
                    let tempNum = toExponential(+(firstOperand.join('')));
                    secondValuePara.textContent = `${tempNum}  ${operator}`
                    firstValuePara.textContent = `~`;
                }
                else {
                    if (firstOperand.length != 0) {
                        secondValuePara.textContent = `${firstOperand.join('')} ${operator}`;
                        firstValuePara.textContent = `~`;
                    }
                };
            }
            else {
                if (firstOperand.length >= 15) {
                    operator = target;
                    secondValuePara.textContent = `${exponentialForSecondPara(+(firstOperand.join('')))} ${operator}`;
                    firstValuePara.textContent = '~';
                }
                else {
                    if (firstOperand.length != 0) {
                        operator = target;
                        secondValuePara.textContent = `${firstOperand.join('')} ${operator}`;
                        firstValuePara.textContent = '~';
                    };
                }
            }
        }
        else {
            let solutionNum = operate(firstOperand, secondOperand, operator);
            operator = target;
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
                        secondOperand.splice(0, secondOperand.length);
                        activeOperand = false;
                        firstValuePara.textContent = '~';
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
                            secondOperand.splice(0, secondOperand.length);
                            activeOperand = false;
                            firstValuePara.textContent = '~';
                        }
                    }
                };

            }
        }
    }
};

document.addEventListener("keypress", operandKeyPressed);
document.addEventListener("keypress", operatorKeyPressed);
document.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        equalButtonClicked();
    }
    else if (event.key == `.`) {
        dotButtonClicked();
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'Backspace') {
        clearButtonClicked();
    }
})
