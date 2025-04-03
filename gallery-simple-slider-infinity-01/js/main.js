// DOM SELECTORS
const gallery = document.querySelector(".gallery");
const goLeft = gallery.querySelector(".gallery__left");
const goRight = gallery.querySelector(".gallery__right");
const galleryUl = gallery.querySelector(".gallery__ul");

goLeft.addEventListener("click", animateLeft);
goRight.addEventListener("click", animateRight);

// FUNCTIONS
function animateLeft() {
	if (!galleryUl.classList.contains("animate_left")) {
		galleryUl.classList.add("animate_left");
		galleryUl.addEventListener("transitionend", () => handleAnimationLeftEnd(), { once: true });
	}
}

function handleAnimationLeftEnd() {
	shiftFirstToLast();
	galleryUl.classList.remove("animate_left");
}

function animateRight() {
	// Sikre at vi ikke kan trykke på knappen tilhøjre før animationen er færdig
	if (!galleryUl.classList.contains("animate_right")) {
		galleryUl.classList.add("move_right");

		shiftLastToFirst(); // Move last <li> to front immediately

		// Allow the browser to render the change before animating
		setTimeout(() => {
			galleryUl.classList.add("animate_right");
		}, 10);
		galleryUl.addEventListener("transitionend", () => handleAnimationRightEnd(), { once: true });
	}
}

function handleAnimationRightEnd() {
	galleryUl.classList.remove("move_right");
	galleryUl.classList.remove("animate_right");
	galleryUl.style.transform = "";
}

// Shift elements : Direction RIGHT
// Tager det bagerste <li> og sætter forand det forreste <li>
function shiftLastToFirst() {
	const li = galleryUl.querySelectorAll("li");
	const lastLi = li[li.length - 1];
	galleryUl.prepend(lastLi);
}
// Shift elements : Direction LEFT
// Tager det forreste <li> og sætter bag det sidste <li>
function shiftFirstToLast() {
	const li = galleryUl.querySelectorAll("li");
	const firstLi = li[0];
	galleryUl.appendChild(firstLi);
}
