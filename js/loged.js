const userMail = document.querySelector('.link');
if(localStorage.getItem('username')) {
	userMail.innerText = localStorage.getItem('username');
} else {
	userMail.innerText = 'Unknown';
}