import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function init() {
	// Элементы
	const grid = document.querySelector(".services-preview__grid");
	const cards = gsap.utils.toArray(".services-preview-card");

	cards.forEach((card, i) => {
		const image = card.querySelector(".services-preview-card__image");
		const content = card.querySelector(".services-preview-card__content");
		const title = content.querySelector(
			".services-preview-card__content-title",
		);
		const text = content.querySelector(".services-preview-card__content-text");

		// Начальное состояние
		gsap.set([image, content], {
			opacity: 0,
			yPercent: 10,
		});

		// Анимация изображения
		gsap.to(image, {
			yPercent: 0,
			opacity: 1,
			duration: 1.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: card,
				start: "center center",
				end: "+=20%",
				scrub: true,
				pin: true,
				markers: false,
			},
		});

		// Анимация контента
		gsap.to(content, {
			yPercent: 0,
			opacity: 1,
			duration: 1.2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: content,
				start: "top +=45%",
				end: "+=100%",
				scrub: true,
				markers: false,
				onEnter: () => {
					console.log("animate text");
					animateText(title, text);
				},
			},
		});
	});

	// Функция анимации текста через SplitText
	function animateText(titleElement, textElement) {
		console.log(titleElement, textElement);
		if (!titleElement || !textElement) return;

		// Разбиваем текст
		const splitTitle = new SplitText(titleElement, {
			type: "lines",
		});

		const splitText = new SplitText(textElement, {
			type: "chars, words",
			charsClass: "gsap-split-char",
			wordsClass: "gsap-split-word",
		});

		gsap.fromTo(
			[...splitTitle.lines],
			{
				yPercent: 120,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: 2,
				stagger: 0.1,
				ease: "power3.out",
			},
		);

		// Анимация заголовка и текста
		gsap.fromTo(
			[...splitText.chars],
			{
				yPercent: 120,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: 0.02,
				stagger: 0.01,
				ease: "power3.out",
			},
		);
	}
}

const initializeAfterFontsLoad = () => {
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(init);
	} else {
		window.addEventListener("load", () => {
			setTimeout(init, 100);
		});
	}
};

document.addEventListener("DOMContentLoaded", initializeAfterFontsLoad);
