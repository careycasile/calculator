const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')

// Array of buttons
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const signsArr = ["+", "-", "/", "*"];

// Variable declaration
let lastButton = "";
let equation = "";
let decimalFlag = false;
let clearFlag = true;
let screen = document.querySelector('.calculator__display');

function buttonPressed(button) {

	// If number is Pressed
	if (numbersArr.indexOf(button) !== -1) {

		// clearFlag checks if the display needs to be reset or not
		if (clearFlag === true) {
			screen.innerHTML = button;
			clearFlag = false;
		} else {
			screen.innerHTML += button;
		}

		equation += button;
		lastButton = button;
	}

	// If sign is Pressed
	if (signsArr.indexOf(button) !== -1) {

		// If the last button that was pressed was a sign,
		// this if statement exits out of the function 
		// without doing anything. No double sign pushes.
		// Or if the first digit is pressed as a sign.
		if (lastButton.length === 0) {
			return;
		}

		if (signsArr.indexOf(lastButton) > -1) {
			equation = equation.split("");
			equation.pop();
			equation = equation.join("");
		}

		clearFlag = true;
		decimalFlag = false;
		equation += button;
		lastButton = button;
	}

	// If a decimal is Pressed
	if (button === ".") {

		// If the decimal was already used in the current 
		// number, the function returns without doing 
		// anything
		if (decimalFlag === true) {
			return;
		}

		if (clearFlag === true) {
			screen.innerHTML = button;
			clearFlag = false;
		} else {
			screen.innerHTML += button;
		}

		decimalFlag = true;
		equation += button;
		lastButton = button;
	}

	// If equals is Pressed
	if (button === "=") {
		// If the last button that was pressed was a sign,
		// this if statement exits out of the function 
		// without doing anything. No ending with a sign.
		if (signsArr.indexOf(lastButton) > -1) {
			return;
		}

		// The running equation gets evaluated and the
		// display is updated.
		console.log(equation);
		screen.innerHTML = eval(equation);
		equation = eval(equation);
	}

	// Clear button resets everything
	if (button === "AC") {
		lastButton = "";
		equation = "";
		screen.innerHTML = "0";
		decimalFlag = false;
		clearFlag = true;
	}

}

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {

		let pressed = e.toElement.innerHTML;

		if (pressed === "x") {
			pressed = "*";
		} else if (pressed === "÷") {
			pressed = "/";
		}

		buttonPressed(pressed);

	}
})