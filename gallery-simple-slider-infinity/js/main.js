// DOM SELECTORS
const gallery = document.querySelector(".gallery");
const goLeft = gallery.querySelector(".gallery__left");
const goRight = gallery.querySelector(".gallery__right");
const galleryUl = gallery.querySelector(".gallery__ul");

goLeft.addEventListener("click", animateLeft);
goRight.addEventListener("click", animateRight);

// FUNCTIONS
function animateLeft() {
	galleryUl.style.transition = "transform .5s ease-in-out";
	galleryUl.style.transform = `translateX(-${100}%)`;
	galleryUl.addEventListener("transitionend", () => handleAnimationLeftEnd(), { once: true });
}

function handleAnimationLeftEnd() {
	shiftFirstToLast();
	resetStyles(galleryUl);
}
function resetStyles(domElement) {
	domElement.style = "";
}
function animateRight() {
	shiftLastToFirst(); // Move last <li> to front immediately

	galleryUl.style.transition = "none"; // Disable transition for instant position change
	galleryUl.style.transform = "translateX(-100%)"; // Move to -100% instantly

	// Allow the browser to render the change before animating
	setTimeout(() => {
		galleryUl.style.transition = "transform .5s ease-in-out"; // Re-enable animation
		galleryUl.style.transform = "translateX(0%)"; // Animate back to 0
	}, 10);
	galleryUl.addEventListener("transitionend", () => handleAnimationRightEnd(), { once: true });
}

function handleAnimationRightEnd() {
	resetStyles(galleryUl);
}

// Shift elements : Direction RIGHT
function shiftLastToFirst() {
	const li = galleryUl.querySelectorAll("li");
	const lastLi = li[li.length - 1];
	galleryUl.prepend(lastLi);
}
// Shift elements : Direction LEFT
function shiftFirstToLast() {
	const li = galleryUl.querySelectorAll("li");
	const firstLi = li[0];
	galleryUl.appendChild(firstLi);
}
