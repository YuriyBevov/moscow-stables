import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
	initGalleryColumns();
	positionEvenColumns();
	initAnimations();
});

function initGalleryColumns() {
	const gallery = document.querySelector(".gallery-preview");
	if (!gallery) return;

	const galleryHeight = gallery.offsetHeight;
	const targetHeight = galleryHeight * 3;

	document
		.querySelectorAll(".gallery-preview__grid-column")
		.forEach((column) => {
			const currentHeight = calculateColumnHeight(column);
			if (currentHeight < targetHeight) {
				extendColumnHeight(column, targetHeight);
			}
		});
}

function calculateColumnHeight(column) {
	const items = column.querySelectorAll("img");
	const gap = parseInt(getComputedStyle(column).gap) || 0;

	let totalHeight = items[0]?.offsetHeight || 0;
	for (let i = 1; i < items.length; i++) {
		totalHeight += gap + items[i].offsetHeight;
	}

	return totalHeight;
}

function extendColumnHeight(column, targetHeight) {
	const originalItems = Array.from(column.children).filter(
		(el) => el.tagName === "IMG" && !el.dataset.isClone,
	);

	if (originalItems.length === 0) return;

	const gap = parseInt(getComputedStyle(column).gap) || 0;
	let currentHeight = calculateColumnHeight(column);
	let clonesCreated = 0;

	originalItems.forEach((img) => (img.dataset.original = "true"));

	while (currentHeight < targetHeight && clonesCreated < 1000) {
		const originalImg = originalItems[clonesCreated % originalItems.length];
		const clone = originalImg.cloneNode(true);

		clone.dataset.isClone = "true";
		column.appendChild(clone);

		currentHeight += originalImg.offsetHeight + gap;
		clonesCreated++;
	}

	if (clonesCreated >= 30) {
		console.warn("Column extension limit reached");
	}
}

function positionEvenColumns() {
	const gallery = document.querySelector(".gallery-preview");
	if (!gallery) return;

	const galleryRect = gallery.getBoundingClientRect();
	const galleryBottom = galleryRect.bottom - galleryRect.top;
	const evenColumns = document.querySelectorAll(
		".gallery-preview__grid-column--even",
	);

	evenColumns.forEach((column) => {
		const items = column.querySelectorAll("img");
		if (items.length === 0) return;

		const columnRect = column.getBoundingClientRect();
		const lastItem = items[items.length - 1];
		const itemRect = lastItem.getBoundingClientRect();
		const gap = parseInt(getComputedStyle(column).gap) || 0;

		// Точный расчет положения
		const itemBottomRelative = itemRect.bottom - columnRect.top;
		const offset = galleryBottom - itemBottomRelative - gap;

		// Применяем позиционирование
		gsap.set(column, { y: offset });
	});
}

function initAnimations() {
	const columns = document.querySelectorAll(".gallery-preview__grid-column");

	columns.forEach((column, index) => {
		let animationEndPoint = "-=50%";

		if (index % 2 !== 0) {
			animationEndPoint = "+=50%";
		}

		gsap.to(column, {
			y: animationEndPoint,
			duration: 20,
			ease: "none",
			repeat: -1,
			yoyo: true,
		});
	});
}
