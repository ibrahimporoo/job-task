const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// Selecting elements in the form
const formInputs = document.getElementById('formInputs');
const results = formInputs.querySelectorAll('.result');
const usernameResult = document.querySelector('.username-result');
const mailResult = document.querySelector('.mail-result');
const passResult = document.querySelector('.pass-result');
const passConfirmResult = document.querySelector('.pass-confirm-result');
// When form is submitted
formInputs.addEventListener('submit', fieldsChecker);
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
		if(data.message) {
			results.forEach(result => {
				result.innerHTML = '';
			})
			Object.keys(data.errors).forEach(key => {
				console.log(key);
				switch(key) {
					case "email":
						data.errors['email'].map(msg => {
							mailResult.innerHTML += `<p>${msg}</p>`;
						})
						break;
					case "username":
						data.errors['username'].map(msg => {
							usernameResult.innerHTML += `<p>${msg}</p>`;
						})
						break;
					case "password":
						data.errors['password'].map(msg => {
							passResult.innerHTML += `<p>${msg}</p>`;
						})
						break;
					case "password_confirmation":
						data.errors['password_confirmation'].map(msg => {
							passConfirmResult.innerHTML += `<p>${msg}</p>`;
						})
						break;
				}
				formInputs.querySelectorAll('.field').forEach(field => {
					field.classList.add('checked');
				})
			})
		} else {
			console.log("localStorage Adding");
			localStorage.setItem('usermail', mailVal);
			localStorage.setItem('username', uNameVal);
			setTimeout(() => {
				window.location.href = 'login.html';
			}, 5000);
		}
	})
}