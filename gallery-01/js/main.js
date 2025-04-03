// DOM SELECTORS
const gallery = document.querySelector(".gallery");
const goLeft = gallery.querySelector(".gallery__left");
const goRight = gallery.querySelector(".gallery__right");
const ul = gallery.querySelector(".gallery__ul");
const li = ul.querySelectorAll("li");

// CREATE DOTS
let dotsArray = createDots(gallery);

function createDots(gallery) {
	let dotWrapper = document.querySelectorAll(".dotWrapper");
	let li = gallery.querySelectorAll("li");
	let dotsArray = [];
	for (i = 0; i < li.length; i++) {
		let span = document.createElement("span");
		let div = document.createElement("div");
		i == 0 ? (div.className = "dot active") : (div.className = "dot");
		span.className = "inner-dot";
		div.appendChild(span);
		dotWrapper[0].appendChild(div);
		dotsArray.push(div);
	}
	return dotsArray;
}

// EVENTS
goLeft.addEventListener("click", animateLeft);
goRight.addEventListener("click", animateRight);

let currentIndex = 0;
let totalIndex = li.length;

// FUNCTIONS

function animateLeft() {
	ul.style.transition = "transform .5s ease-in-out";
	ul.style.transform = `translateX(-${100}%)`;
	ul.addEventListener("transitionend", () => handleAnimationLeft(), { once: true });
	currentIndex = countCurrentSlide(currentIndex, "left", totalIndex);
	updateActiveElementClass(dotsArray, currentIndex + 1);
}

function handleAnimationLeft() {
	shiftFirstToLast();
	ul.style.transition = "";
	ul.style.transform = "";
}

function animateRight() {
	shiftLastToFirst(); // Move last <li> to front immediately

	ul.style.transition = "none"; // Disable transition for instant position change
	ul.style.transform = "translateX(-100%)"; // Move to -100% instantly

	// Allow the browser to render the change before animating
	setTimeout(() => {
		ul.style.transition = "transform .5s ease-in-out"; // Re-enable animation
		ul.style.transform = "translateX(0%)"; // Animate back to 0
	}, 10);
	currentIndex = countCurrentSlide(currentIndex, "right", totalIndex);
	updateActiveElementClass(dotsArray, currentIndex + 1);
}

function countCurrentSlide(currentIndex, direction, maxNumber) {
	let myNumber = currentIndex; // Start fra den givne værdi

	if (direction === "left") {
		if (myNumber == maxNumber - 1) {
			myNumber = 0;
		} else {
			myNumber++;
		}
	} else if (direction === "right") {
		if (myNumber == 0) {
			myNumber = totalIndex - 1;
		} else {
			myNumber = myNumber - 1;
		}
	}
	return myNumber;
}

dotsArray.forEach((dot, index) => {
	dot.addEventListener("click", () => handleDotsClick(index));
});

function handleDotsClick(index) {
	let difference = currentIndex - index;
	let steps = 0;
	let direction = 0;

	// tallet er et minus tal
	if (difference < 0) {
		direction = "left";
		steps = Math.abs(difference);
	}
	// tallet er et plus tal
	else if (difference > 0) {
		direction = "right";
		steps = Math.abs(difference);
	}
	let move = 100 * steps;

	// left
	if (direction === "left") {
		// udfør først animationen
		ul.style.transition = "transform .5s ease-in-out";
		ul.style.transform = `translateX(-${move}%)`;
		// Når animationen er færdig, bytters der om på li elementerne
		ul.addEventListener("transitionend", () => handleDotClickAnimationLeftEnd(steps), { once: true });
	} else if (direction === "right") {
		// Byt om på li DOM elementerne
		for (i = 1; i <= steps; i++) {
			shiftLastToFirst();
		}
		ul.style.transform = `translateX(-${move}%)`;
		setTimeout(() => {
			ul.style.transition = "transform .5s ease-in-out";
			ul.style.transform = `translateX(0%)`;
			ul.addEventListener("transitionend", () => handleDotClickAnimationRightEnd(steps), { once: true });
		}, 30);
	}

	updateActiveElementClass(dotsArray, index + 1);
	currentIndex = index;
}

// Handle click dots
function handleDotClickAnimationLeftEnd(steps) {
	for (i = 1; i <= steps; i++) {
		shiftFirstToLast();
	}
	ul.style = "";
	//ul.removeEventListener("transitionend", handleDotClickAnimationLeftEnd);
}

function handleDotClickAnimationRightEnd(steps) {
	ul.style = "";
}

// Shift elements : Direction RIGHT
function shiftLastToFirst() {
	const li = ul.querySelectorAll("li");
	const lastLi = li[li.length - 1];
	ul.prepend(lastLi);
}

// Shift elements : Direction LEFT
function shiftFirstToLast() {
	let thisUl = document.querySelector(".gallery__ul");
	const li = thisUl.querySelectorAll("li");
	const firstLi = li[0];
	ul.appendChild(firstLi);
}

updateActiveElementClass(dotsArray, currentIndex + 1);

function updateActiveElementClass(dotsArray, currentIndex) {
	dotsArray.forEach(function (dot, index) {
		if (currentIndex - 1 == index) {
			dot.classList.add("active");
		} else {
			dot.classList.remove("active");
		}
	});
}
