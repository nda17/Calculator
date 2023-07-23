let displayResult = document.querySelector('.calc__display-result');
let displayExpression = document.querySelector('.calc__display-expression');
const btnBlock = document.querySelector('.calc__btn-block');
let a = '';
let b = '';
let operationSign = '';
let flag = false;
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['/', 'x', '-', '+'];

//Функция расчета операции:
function result() {
	if (b === '') {
		b = a;
	}
	switch (operationSign) {
		case '+':
			a = +a + +b;
			break;
		case '-':
			a = a - b;
			break;
		case 'x':
			a = a * b;
			break;
		case '/':
			if (b === '0') {
				displayResult.textContent = 'Error';
				a = '';
				b = '';
				operationSign = '';
				return;
			}
			a = a / b;
			break;
	}
	flag = true;
	displayResult.textContent = a;
}

//Функция рассчета процентов:
function percent() {
	if (operationSign === 'x') {
		a = (a / 100) * b;
		return (displayResult.textContent = a);
	}

	if (a !== '' && operationSign === '') {
		a = a / 100;
		return (displayResult.textContent = a);
	}
}

//Функция изменения математического знака на противоположный +/- :
function reverse() {
	if (a > 0) {
		a = -Math.abs(a);
		displayResult.textContent = a;
		displayExpression.textContent = a;
	} else {
		a = Math.abs(a);
		displayResult.textContent = a;
		displayExpression.textContent = a;
	}
	return;
}

//Функция удаления всех вычислений:
function clearAll() {
	a = '';
	b = '';
	operationSign = '';
	flag = false;
	flagFalse();
	displayResult.textContent = '0';
	displayExpression.textContent = '';
}

//Функция активации отображения ошибки на дисплее и изменение стилей CSS:
function flagTrue() {
	document.querySelector('.calc__display').style.alignItems = 'center';
	document.querySelector('.calc__display-result').style.fontSize = '15px';
	document.querySelector('.calc__display-result').style.position = 'absolute';
	btnBlock.removeEventListener('click', targetButton);
	btnBlock.addEventListener('click', targetButtonFlagTrue);
}

//Функция деактивации отображения ошибки на дисплее и установка стандартных стилей CSS:
function flagFalse() {
	document.querySelector('.calc__display').style.alignItems = 'flex-end';
	document.querySelector('.calc__display-result').style.fontSize = '2.4rem';
	document.querySelector('.calc__display-result').style.position = 'static';
	btnBlock.removeEventListener('click', targetButtonFlagTrue);
	btnBlock.addEventListener('click', targetButton);
}

//Функция уменьшения шрифта и округления знаков после запятой если на экране >= 15 цифр :
function characterLimitToFixed() {
	if (displayResult.textContent.length >= 15) {
		a.toFixed(9);
		displayResult.textContent = a;
		displayExpression.textContent = '';
		flagTrue();
	}
}

//Функция уменьшения шрифта на дисплее при 11 введенных знаках и вывод ошибки при вводе 15 знаков :
function limitValue() {
	if (displayResult.textContent.length == 11) {
		document.querySelector('.calc__display-result').style.fontSize = '30px';
	} else if (displayResult.textContent.length == 15) {
		displayResult.textContent = 'Невозможно ввести более 15 цифр';
		displayExpression.textContent = '';
		flagTrue();
		setTimeout(() => clearAll(), 2000);
		return;
	}
}

//Функция удаления ошибки с дисплея и возвращение к стандартному состоянию при нажатии кнопки AC:
function targetButtonFlagTrue(event) {
	if (event.target.classList.contains('btn-ac')) {
		clearAll();
		return;
	}
}

function targetButton(event) {
	const target = event.target.closest('button');

	if (target === null) {
		return;
	}

	//Переменная с нажатой кнопкой :
	let value = event.target.textContent;

	//Если нажата кнопка AC - очистка полей :
	if (event.target.textContent === 'ac') {
		clearAll();
		return;
	}

	//Очистка дисплея от стандартных значений :
	displayResult.textContent = '';

	// Функционал дополнительного нижнего дисплея:
	if (value !== '+/-' && value !== '=') {
		displayExpression.textContent += value;
	}

	//Отображение сообщения от ошибке на дисплее в случае некорректного ввода :
	if (
		(a === '' && value === '=') ||
		(a === '' && value === '%') ||
		(a === '' && value === '/') ||
		(a === '' && value === 'x') ||
		(a === '' && value === '+') ||
		(a === '' && value === '-')
	) {
		displayResult.textContent = 'Error';
		displayExpression.textContent = '';
		return;
	}

	//Действия при нажати кнопок 0-9 или . :
	if (digit.includes(value)) {
		console.log(a, b);
		if (b === '' && operationSign === '') {
			a += value;
			displayResult.textContent = a;
		} else if (a !== '' && b !== '' && flag) {
			b = value;
			flag = false;
			displayResult.textContent = b;
		} else {
			b += value;
			displayResult.textContent = b;
		}

		limitValue();
		return;
	}

	//Действия при нажатии кнопок  /, x, -, + :
	if (action.includes(value)) {
		operationSign = value;
		displayResult.textContent = operationSign;
		return;
	}

	//Действия при нажатии кнопки = :
	if (value === '=') {
		result();
		characterLimitToFixed();
	}

	//Действия при нажатии кнопки % :
	if (value === '%') {
		percent();
		characterLimitToFixed();
		displayExpression.textContent = '';
	}

	// //Действия при нажатии кнопки +/- :
	if (value === '+/-') {
		reverse();
	}
}

btnBlock.addEventListener('click', targetButton);
