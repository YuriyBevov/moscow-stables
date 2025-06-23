import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger, SplitText);

function init() {
	const slider = document.querySelector(".horses-preview-slider");
	if (!slider) return;

	const initSlideState = (slide) => {
		gsap.set(slide.querySelectorAll(".horse-preview-card__content *"), {
			opacity: 0,
			y: 20,
		});
		gsap.set(slide.querySelector(".horse-preview-card img"), {
			opacity: 0,
			y: 20,
		});
	};

	const slides = Array.from(slider.querySelectorAll(".swiper-slide"));
	slides.slice(1).forEach(initSlideState);

	const swiper = new Swiper(slider, {
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 800,
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
		on: {
			slideChangeTransitionStart: function () {
				const prevSlide = this.slides[this.previousIndex];
				const nextSlide = this.slides[this.activeIndex];

				if (prevSlide) {
					gsap.to(
						[
							prevSlide.querySelector(".horse-preview-card img"),
							...prevSlide.querySelectorAll(".horse-preview-card__content *"),
						],
						{
							opacity: 0,
							y: 20,
							duration: 0.3,
							ease: "power2.in",
							stagger: { amount: 0.2 },
						},
					);
				}

				if (nextSlide) initSlideState(nextSlide);
			},
			slideChangeTransitionEnd: function () {
				const currentSlide = this.slides[this.activeIndex];
				const img = currentSlide.querySelector(".horse-preview-card img");
				const content = currentSlide.querySelectorAll(
					".horse-preview-card__content *",
				);

				if (img) {
					gsap.to(img, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
					gsap.to(
						content,
						{
							opacity: 1,
							y: 0,
							duration: 0.3,
							stagger: 0.02,
							ease: "power2.out",
						},
						"-=0.5",
					);
				}

				initTitleEffects();
			},
		},
	});

	const animateChars = (chars, color) => {
		gsap.to(chars, {
			color,
			duration: 0.3,
			stagger: { amount: 0.2, from: "center" },
			ease: "power2.out",
			overwrite: "auto",
		});
	};

	const initTitleEffects = () => {
		document
			.querySelectorAll(".horse-preview-card__content-title")
			.forEach((title) => {
				if (title._isInitialized) return;

				const split = new SplitText(title, {
					type: "chars,words",
					charsClass: "gsap-split-char",
					wordsClass: "gsap-split-word",
				});

				const originalColor = window.getComputedStyle(title).color;

				title.addEventListener("mouseenter", () =>
					animateChars(split.chars, "var(--white-color)"),
				);
				title.addEventListener("mouseleave", () =>
					animateChars(split.chars, originalColor),
				);

				title._isInitialized = true;
			});
	};

	// Инициализация анимации для заголовка первого слайда
	const firstSlideTitle = slides[0]?.querySelector(
		".horse-preview-card__content-title",
	);
	if (firstSlideTitle && !firstSlideTitle._isInitialized) {
		const split = new SplitText(firstSlideTitle, {
			type: "chars,words",
			charsClass: "gsap-split-char",
			wordsClass: "gsap-split-word",
		});

		const originalColor = window.getComputedStyle(firstSlideTitle).color;

		firstSlideTitle.addEventListener("mouseenter", () =>
			animateChars(split.chars, "var(--white-color)"),
		);
		firstSlideTitle.addEventListener("mouseleave", () =>
			animateChars(split.chars, originalColor),
		);

		firstSlideTitle._isInitialized = true;
	}
}

const initializeAfterFontsLoad = () => {
	if (document.fonts?.ready) {
		document.fonts.ready.then(init);
	} else {
		window.addEventListener("load", () => setTimeout(init, 100));
	}
};

document.addEventListener("DOMContentLoaded", initializeAfterFontsLoad);
