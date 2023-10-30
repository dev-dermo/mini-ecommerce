const controlsEl = document.querySelector('#controls');
const newArrivalsEl = document.querySelector('#new-arrivals');
const bestSellersEl = document.querySelector('#best-sellers');
const newArrivalsControlEl = document.querySelector('#new-arrivals-control');
const bestSellersControlEl = document.querySelector('#best-sellers-control');

controlsEl.addEventListener('click', event => {
	event.preventDefault();

	if (event.target.matches('h3')) {
		const clickedElText = event.target.textContent.trim();
		
		switch (clickedElText) {
			case 'New Arrivals':
				newArrivalsEl.classList.remove('visually-hidden');
				newArrivalsEl.classList.add('animate__animated', 'animate__slideInLeft');
				newArrivalsControlEl.classList.add('text-decoration-underline');
				bestSellersEl.classList.add('visually-hidden');
				bestSellersEl.classList.remove('animate__animated', 'animate__slideInRight');
				bestSellersControlEl.classList.remove('text-decoration-underline');
				break;
			case 'Best Sellers':
				bestSellersEl.classList.remove('visually-hidden');
				bestSellersEl.classList.add('animate__animated', 'animate__slideInRight');
				bestSellersControlEl.classList.add('text-decoration-underline');
				newArrivalsEl.classList.add('visually-hidden');
				newArrivalsEl.classList.remove('animate__animated', 'animate__slideInLeft');
				newArrivalsControlEl.classList.remove('text-decoration-underline');
				break;
		}
	}
});
