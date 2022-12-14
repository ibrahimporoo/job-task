const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', turnRegisterPage);

function turnRegisterPage() {
	console.log("Will Go");
	setTimeout(() => {
		window.location.href = 'register.html';
	}, 200)
}
