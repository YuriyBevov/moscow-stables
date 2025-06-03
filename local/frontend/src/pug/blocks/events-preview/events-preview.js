import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let resizeTimeout;

function initHorizontalScroll() {
	const section = document.querySelector(".events");
	const cardsContainer = document.getElementById(
		"events-preview-scroll-container",
	);

	if (!section || !cardsContainer) return;

	// Очищаем предыдущие ScrollTrigger'ы, связанные с этим блоком
	ScrollTrigger.getAll().forEach((trigger) => {
		if (trigger.trigger === section) trigger.kill();
	});

	// Общая ширина контейнера с карточками
	const totalWidth = cardsContainer.scrollWidth;

	// Начальное положение карточек — за правым краем экрана
	gsap.set(cardsContainer, {
		x: window.innerWidth,
	});

	// ScrollTrigger для фиксации секции
	ScrollTrigger.create({
		trigger: section,
		start: "top +=5%",
		end: () => `+=${window.innerWidth * 1.5}`, // длина пина
		scrub: true,
		pin: true,
		pinSpacing: true,
		invalidateOnRefresh: true,
		markers: false,
	});

	// Анимация горизонтального движения карточек
	gsap.to(cardsContainer, {
		x: () => -(totalWidth + window.innerWidth * 0.5),
		ease: "none",
		scrollTrigger: {
			trigger: section,
			start: "top +=50%",
			end: () => `+=${window.innerWidth * 2.5}`,
			scrub: true,
			invalidateOnRefresh: true,
			pinSpacing: false,
			markers: false,
		},
	});
}

function handleResize() {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		initHorizontalScroll();
	}, 250); // задержка для оптимизации
}

// Инициализация
initHorizontalScroll();

// Пересчёт при изменении размера экрана
window.addEventListener("resize", handleResize);
