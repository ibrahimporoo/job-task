// Selecting elements in the form
const formInputs = document.getElementById('formInputs');
const allFields = formInputs.querySelectorAll('.field');
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// When form is submitted
formInputs.addEventListener('submit', fieldsChecker);
const usernameResult = document.querySelector('.username-result');
const mailResult = document.querySelector('.mail-result');
const passResult = document.querySelector('.pass-result');
const passConfirmResult = document.querySelector('.pass-confirm-result');
function fieldsChecker(e) {
	e.preventDefault();
	/* Start Fetching */ 
	// Select values of fields
	const uNameVal = document.getElementById('username').value;
	const mailVal = document.getElementById('email').value;
	const passVal = document.getElementById('pass').value;
	const passConfirmationVal = document.getElementById('pass-confirmation').value;
	const data = { username: uNameVal, email: mailVal, password: passVal, password_confirmation: passConfirmationVal };
	fetch('https://goldblv.com/api/hiring/tasks/register', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {
		const errorsAlert = document.querySelector('.errors-alert');
		const msg = errorsAlert.querySelector('.message');
		const errorDesc = errorsAlert.querySelector('.description');
		const closeAlert = document.querySelector('.close-alert');
		closeAlert.addEventListener('click', () => {
			errorsAlert.classList.remove('show');
		})
		if(data.message) {
			console.log(data.id);
			errorDesc.innerHTML = '';
			msg.innerText = data.message;
			Object.keys(data.errors).map(key => {
				let list = document.createElement('li');
				let keyTitle = document.createElement('h5');
				keyTitle.className = 'err-title';
				keyTitle.innerText = key;
				list.appendChild(keyTitle)
				data.errors[key].map(msg => {
					let errorMsg = document.createElement('p');
					errorMsg.innerText = '- ' + msg;
					list.appendChild(errorMsg);
				});
				errorDesc.appendChild(list);
			})
			errorsAlert.classList.add('show');
			setTimeout(() => {
				errorsAlert.classList.remove('show');
			}, 5000);
		} else {
			console.log("localStorage Adding");
			localStorage.setItem('usermail', mailVal);
			localStorage.setItem('username', uNameVal);
			setTimeout(() => {
				window.location.href = 'start.html';
			}, 5000);
		}
	})
}




/*
	// Select values of fields
	const uNameVal = document.getElementById('username').value;
	const mailVal = document.getElementById('email').value;
	const passVal = document.getElementById('pass').value;
	const passConfirmationVal = document.getElementById('pass-confirmation').value;
	// Start Username code checker :-
	usernameResult.style.color = 'red';
	if(uNameVal.length >= 5 && uNameVal.length <= 15) {
		if(isNaN(Number(uNameVal[0])) || isNaN(Number(uNameVal[uNameVal.length - 1]))) {
			if(!specialChars.test(uNameVal)) {
				usernameResult.innerHTML = 'Your username is valid';
				usernameResult.style.color = 'steelblue';
			} else {
				usernameResult.innerHTML = 'Your username must not contain a special character';
			}
		} else {
			usernameResult.innerHTML = 'Your username must not contain number at the beginning or at the end';
		}
		console.log(uNameVal , ' => ', uNameVal.length, ' Valid')
	} else {
		if(uNameVal.length === 0) {
			usernameResult.innerHTML = 'You must took a username';
		} else if (uNameVal.length < 5) {
			usernameResult.innerHTML = 'username is too short';
		} else {
			usernameResult.innerHTML = 'username is too long';
		}
	}
	// End Username code checker :- //
	// Start Email code checker :-
	mailResult.style.color = 'red';
	if(mailVal.match(mailPattern)) {
		mailResult.innerText = 'Your mail is valid';
		mailResult.style.color = 'steelblue';
	} else {
		mailResult.innerText = 'Your mail is not valid';
	}
	// End Email code checker :- //
	// Start Password code checker :-
	passResult.style.color = 'red';
	if(passVal.length >= 8) {
		passResult.innerText = 'Your Password is valid';
		passResult.style.color = 'steelblue';
	} else {
		passResult.innerText = 'Your Password is not valid, it must be at least 8 characters';
	}
	// End Password code checker :- //
	// Start Password Confirmation code checker :-
	passConfirmResult.style.color = 'red';
	if(passConfirmationVal.length >= 8 && passConfirmationVal === passVal) {
		passConfirmResult.style.color = 'steelblue';
		passConfirmResult.innerText = 'Your password is valid. Poth are typical';
	} else {
		passConfirmResult.innerText = 'Poth passwords might not typical or have not 8 characters at least';
	}
	// End Password Confirmation code checker :- //
	// Apear results after checks
	allFields.forEach(field => {
		field.classList.add('checked');
	})
*/
